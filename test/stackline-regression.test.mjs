import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdtemp, rm, mkdir} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
const require = createRequire(import.meta.url);
const {createServer} = require('../lib/http-server');

async function withServer(options, check) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'stackline-http-'));
  const server = createServer({root, ...options});
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    await check(server.server.address().port, options, root);
  } finally {
    await new Promise(resolve => server.server.close(resolve));
    await rm(root, {recursive: true, force: true});
  }
}

test('issue 825: string true from CLI enables the default robots policy', async () => {
  await withServer({robots: 'true'}, async port => {
    const response = await fetch('http://127.0.0.1:' + port + '/robots.txt');
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /^text\/plain/);
    assert.equal(await response.text(), 'User-agent: *\nDisallow: /');
  });
});

test('custom robots content remains supported', async () => {
  await withServer({robots: 'User-agent: *\\nAllow: /'}, async port => {
    assert.equal(await (await fetch('http://127.0.0.1:' + port + '/robots.txt')).text(), 'User-agent: *\nAllow: /');
  });
});

test('issues 636/757: a proxy cycle terminates and the server remains responsive', async () => {
  // The shared options object is resolved by the proxy on each request, allowing
  // the ephemeral listening port to be set without a fixed-port race.
  const root = await mkdtemp(path.join(os.tmpdir(), 'stackline-proxy-'));
  const options = {root, robots: true, proxy: 'http://127.0.0.1:1/'};
  const server = createServer(options);
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const port = server.server.address().port;
    options.proxy = 'http://127.0.0.1:' + port + '/missing?';
    const response = await fetch('http://127.0.0.1:' + port + '/missing', {signal: AbortSignal.timeout(2000)});
    assert.equal(response.status, 508);
    assert.match(await response.text(), /proxy loop/i);
    assert.equal((await fetch('http://127.0.0.1:' + port + '/robots.txt')).status, 200);
  } finally {
    server.server.closeAllConnections();
    await new Promise(resolve => server.server.close(resolve));
    await rm(root, {recursive: true, force: true});
  }
});


function rawRequest(port, requestPath) {
  return new Promise((resolve, reject) => {
    require('node:http').get({host: '127.0.0.1', port, path: requestPath}, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', data => { body += data; });
      response.on('end', () => resolve({status: response.statusCode, headers: response.headers, body}));
    }).on('error', reject);
  });
}

test('directory redirects stay on this origin for a protocol-relative request path', async () => {
  await withServer({}, async (port, options, root) => {
    await mkdir(path.join(root, 'attacker.example'));
    const response = await rawRequest(port, '//attacker.example');
    assert.equal(response.status, 302);
    assert.equal(response.headers.location, '/attacker.example/');
    assert.equal(new URL(response.headers.location, 'http://127.0.0.1:' + port).origin, 'http://127.0.0.1:' + port);
  });
});

test('standalone directory listing rejects a root-prefix sibling and malformed escapes', () => {
  const showDir = require('../lib/core/show-dir');
  for (const [requestPath, expected] of [['/public2/', 403], ['/%zz', 400]]) {
    let ended = false;
    const response = {statusCode: 0, writable: true, setHeader() {}, end() { ended = true; }};
    showDir({root: path.join(os.tmpdir(), 'public'), baseDir: 'base', handleError: true})({url: requestPath}, response);
    assert.equal(response.statusCode, expected);
    assert.equal(ended, true);
  }
});

test('CORS header lists accept surrounding whitespace and large whitespace runs', async () => {
  await withServer({cors: true, corsHeaders: ' '.repeat(100000) + 'X-Token  ,  X-Other '}, async port => {
    const response = await fetch('http://127.0.0.1:' + port + '/', {headers: {Origin: 'https://example.test'}});
    assert.match(response.headers.get('access-control-allow-headers'), /X-Token, X-Other/);
  });
});


test('adversarial redirect paths never choose another origin', async () => {
  await withServer({}, async (port, options, root) => {
    await mkdir(path.join(root, 'attacker.example'));
    const origin = 'http://127.0.0.1:' + port;
    const paths = ['//attacker.example', '///attacker.example', '/\\attacker.example', '/%2fattacker.example', '/%5cattacker.example', '//attacker.example?next=https://evil.example', '//attacker.example?next=//evil.example', '/%09/attacker.example', '/%0d%0aLocation:%20https://evil.example', '//attacker.example#@evil.example', '//attacker.example?x=%0d%0aLocation:evil', '/%252f%252fattacker.example'];
    let redirects = 0;
    for (const requestPath of paths) {
      const response = await rawRequest(port, requestPath);
      if (response.headers.location) {
        redirects++;
        assert.equal(new URL(response.headers.location, origin).origin, origin, requestPath);
      }
    }
    assert(redirects >= 4, 'The test must exercise real directory redirects');
  });
});
