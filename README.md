# @stackline/http-server

> A simple zero-configuration command-line http server.

[![npm version](https://img.shields.io/npm/v/@stackline/http-server.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/http-server)
[![license](https://img.shields.io/npm/l/@stackline/http-server.svg?style=flat-square)](https://github.com/alexandroit/stackline-http-server)
[![GitHub repository](https://img.shields.io/badge/GitHub-alexandroit%2Fstackline-http-server-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-http-server)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/http-server/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/http-server/)** | **[npm](https://www.npmjs.com/package/@stackline/http-server)** | **[Issues](https://github.com/alexandroit/stackline-http-server/issues)** | **[Repository](https://github.com/alexandroit/stackline-http-server)**

**Current package version:** `1.0.1`

---

## Why this package?

`@stackline/http-server` is the Stackline-maintained distribution of `http-server@14.1.1`. It is an independent continuation of [http-server](https://github.com/http-party/http-server); original authors and licenses remain credited below.

## Compatibility

| Item | Value |
| :--- | :--- |
| Package | `@stackline/http-server@1.0.1` |
| API target | `http-server@14.1.1` |
| Supported Node.js | `>=12` |
| License | `MIT` |
| Main entry | `./lib/http-server` |
| CLI | `http-server` |
| Runtime dependencies | `he, mime, chalk, union, corser, opener, minimist, url-join, basic-auth, http-proxy, portfinder, secure-compare, html-encoding-sniffer` |

## Installation

```bash
npm install @stackline/http-server
```

Preserve existing imports and plugin resolution with an npm alias:

```bash
npm install http-server@npm:@stackline/http-server
```

## Usage and API reference

### http-server: a simple static HTTP server

`http-server` is a simple, zero-configuration command-line static HTTP server.  It is powerful enough for production usage, but it's simple and hackable enough to be used for testing, local development and learning.


## Installation:

#### Running on-demand:

Using `npx` you can run the script without installing it first:

    npx http-server [path] [options]

#### Globally via `npm`

    npm install --global @stackline/http-server

This will install `http-server` globally so that it may be run from the command line anywhere.

#### Globally via Homebrew

    brew install http-server
     
#### As a dependency in your `npm` package:

    npm install @stackline/http-server

## Usage:

     http-server [path] [options]

`[path]` defaults to `./public` if the folder exists, and `./` otherwise.

*Now you can visit http://localhost:8080 to view your server*

**Note:** Caching is on by default. Add `-c-1` as an option to disable caching.

## Available Options:

| Command         | 	Description         | Defaults  |
| -------------  |-------------|-------------|
|`-p` or `--port` |Port to use. Use `-p 0` to look for an open port, starting at 8080. It will also read from `process.env.PORT`. |8080 |
|`-a`   |Address to use |0.0.0.0|
|`-d`     |Show directory listings |`true` |
|`-i`   | Display autoIndex | `true` |
|`-g` or `--gzip` |When enabled it will serve `./public/some-file.js.gz` in place of `./public/some-file.js` when a gzipped version of the file exists and the request accepts gzip encoding. If brotli is also enabled, it will try to serve brotli first.|`false`|
|`-b` or `--brotli`|When enabled it will serve `./public/some-file.js.br` in place of `./public/some-file.js` when a brotli compressed version of the file exists and the request accepts `br` encoding. If gzip is also enabled, it will try to serve brotli first. |`false`|
|`-e` or `--ext`  |Default file extension if none supplied |`html` | 
|`-s` or `--silent` |Suppress log messages from output  | |
|`--cors` |Enable CORS via the `Access-Control-Allow-Origin` header  | |
|`-o [path]` |Open browser window after starting the server. Optionally provide a URL path to open. e.g.: -o /other/dir/ | |
|`-c` |Set cache time (in seconds) for cache-control max-age header, e.g. `-c10` for 10 seconds. To disable caching, use `-c-1`.|`3600` |
|`-U` or `--utc` |Use UTC time format in log messages.| |
|`--log-ip` |Enable logging of the client's IP address |`false` |
|`-P` or `--proxy` |Proxies all requests which can't be resolved locally to the given url. e.g.: -P http://someurl.com | |
|`--proxy-options` |Pass proxy [options](https://github.com/http-party/node-http-proxy#options) using nested dotted objects. e.g.: --proxy-options.secure false |
|`--username` |Username for basic authentication | |
|`--password` |Password for basic authentication | |
|`-S`, `--tls` or `--ssl` |Enable secure request serving with TLS/SSL (HTTPS)|`false`|
|`-C` or `--cert` |Path to ssl cert file |`cert.pem` | 
|`-K` or `--key` |Path to ssl key file |`key.pem` |
|`-r` or `--robots` | Automatically provide a /robots.txt (The content of which defaults to `User-agent: *\nDisallow: /`)  | `false` |
|`--no-dotfiles` |Do not show dotfiles| |
|`--mimetypes` |Path to a .types file for custom mimetype definition| |
|`-h` or `--help` |Print this list and exit. |   |
|`-v` or `--version`|Print the version and exit. | |

## Magic Files

- `index.html` will be served as the default file to any directory requests.
- `404.html` will be served if a file is not found. This can be used for Single-Page App (SPA) hosting to serve the entry page.

## Catch-all redirect

To implement a catch-all redirect, use the index page itself as the proxy with:

```
http-server --proxy http://localhost:8080?
```

Note the `?` at the end of the proxy URL. Thanks to [@houston3](https://github.com/houston3) for this clever hack!

## TLS/SSL

First, you need to make sure that [openssl](https://github.com/openssl/openssl) is installed correctly, and you have `key.pem` and `cert.pem` files. You can generate them using this command:

``` sh
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

You will be prompted with a few questions after entering the command. Use `127.0.0.1` as value for `Common name` if you want to be able to install the certificate in your OS's root certificate store or browser so that it is trusted.

This generates a cert-key pair and it will be valid for 3650 days (about 10 years).

Then you need to run the server with `-S` for enabling SSL and `-C` for your certificate file.

``` sh
http-server -S -C cert.pem
```

If you wish to use a passphrase with your private key you can include one in the openssl command via the -passout parameter (using password of foobar)


e.g.
`openssl req -newkey rsa:2048 -passout pass:foobar -keyout key.pem -x509 -days 365 -out cert.pem`

For security reasons, the passphrase will only be read from the `NODE_HTTP_SERVER_SSL_PASSPHRASE` environment variable.


This is what should be output if successful:

``` sh
Starting up http-server, serving ./ through https

http-server settings:
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  https://127.0.0.1:8080
  https://192.168.1.101:8080
  https://192.168.1.104:8080
Hit CTRL-C to stop the server
```

### Development

Checkout this repository locally, then:

```sh
$ npm i
$ npm start
```

*Now you can visit http://localhost:8080 to view your server*

You should see the turtle image in the screenshot above hosted at that URL. See
the `./public` folder for demo content.

## Credits and original authors

- Original project: [http-server](https://github.com/http-party/http-server).
- Charlie Robbins.
- Marak Squires.
- Charlie McConnell.
- Joshua Holbrook.
- Maciej Małecki.
- Matthew Bergman.
- brad dunbar.
- Dominic Tarr.
- Travis Person.
- Jinkwon Lee.
- BigBlueHat.
- Daniel Dalton.
- Jade Michael Thornton.
- Copyright (c) 2011-2022 Charlie Robbins, Marak Squires, Jade Michael Thornton and the Contributors.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## License

`MIT`. See the license and notice files in the [repository](https://github.com/alexandroit/stackline-http-server).

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
