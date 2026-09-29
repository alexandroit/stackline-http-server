import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdtemp, rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
const require = createRequire(import.meta.url);
const {createServer} = require('../lib/http-server');

async function withServer(options, check) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'stackline-http-'));
  const server = createServer({root, ...options});
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    await check(server.server.address().port, options);
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
