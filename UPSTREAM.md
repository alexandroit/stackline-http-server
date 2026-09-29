# Upstream review

Independent maintenance of http-server14.1.1. Source https://github.com/http-party/http-server/tree/af0ac3e4b9bd5fff55337aee32bf37f6116c7b4f

Original published files and SHA-256 hashes are recorded in `.stackline/upstream.json`. The parser/server API, CLI name, license, original authors and Node >=12 declaration are retained. Development/release tests use Node24.

Issue evidence collected: 2026-09-29T00:24:08.203209+00:00. The latest100 open and30 closed entries were collected, then pull requests filtered. The following table records all71 open issue entries returned; it is not a claim that every issue was reproduced or fixed.

| Issue | Finding |
| --- | --- |
| [#965](https://github.com/http-party/http-server/issues/965) Configurable `changeOrigin` in websocket listener? | Recorded open report; not reproduced or claimed fixed in this release. |
| [#977](https://github.com/http-party/http-server/issues/977) update `html-encoding-sniffer` to v5+ | Recorded open report; not reproduced or claimed fixed in this release. |
| [#973](https://github.com/http-party/http-server/issues/973) Transitive deprecated dependencies | Transitive maintenance/deprecation concerns are recorded separately; the current task does not authorize recursive forks. |
| [#976](https://github.com/http-party/http-server/issues/976) New chet | Recorded open report; not reproduced or claimed fixed in this release. |
| [#975](https://github.com/http-party/http-server/issues/975) Dreams local boy | Recorded open report; not reproduced or claimed fixed in this release. |
| [#483](https://github.com/http-party/http-server/issues/483) Remove flatiron/union dependency | Removing union is an architectural migration; current middleware/API behavior is retained. |
| [#972](https://github.com/http-party/http-server/issues/972) Reporting a new security vulnerability in http-server stable version | The report intentionally contains no vulnerability details. It cannot be reproduced from the public report; no fix or security completeness is claimed. |
| [#636](https://github.com/http-party/http-server/issues/636) Proxy causing infinite loop | Reproduced a self-proxy cycle under a64MB heap limit; fixed loop detection and retained responsiveness regression. |
| [#947](https://github.com/http-party/http-server/issues/947) Create Release Branches for `14.1.2`, `14.2.0`, and `15.0.0` | Recorded open report; not reproduced or claimed fixed in this release. |
| [#928](https://github.com/http-party/http-server/issues/928) Adding flags is very WET right now | Recorded open report; not reproduced or claimed fixed in this release. |
| [#969](https://github.com/http-party/http-server/issues/969) [BUG] Attempted to assign to readonly property. | Report uses Bun1.3.11 and an inherited union implementation. Bun support is not claimed; the declared Node runtime suite is retained. |
| [#799](https://github.com/http-party/http-server/issues/799)  [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated | Recorded open report; not reproduced or claimed fixed in this release. |
| [#809](https://github.com/http-party/http-server/issues/809) Customize access-control-allow-origin headers in order to set specific origin domains | Recorded open report; not reproduced or claimed fixed in this release. |
| [#814](https://github.com/http-party/http-server/issues/814) Fallback proxy doesn't work on Node v17+ | Report shows localhost resolving to IPv6 while the target listens on IPv4. Configure an explicit matching address such as127.0.0.1; global DNS behavior is not changed. |
| [#873](https://github.com/http-party/http-server/issues/873) Add bandwidth limit parameter | Recorded open report; not reproduced or claimed fixed in this release. |
| [#525](https://github.com/http-party/http-server/issues/525) ERR_INVALID_REDIRECT when running http-server | Recorded open report; not reproduced or claimed fixed in this release. |
| [#537](https://github.com/http-party/http-server/issues/537) DeprecationWarning for OutgoingMessage.prototype._headers | Recorded open report; not reproduced or claimed fixed in this release. |
| [#771](https://github.com/http-party/http-server/issues/771) only partially follows range spec | Multipart byte ranges remain an existing limitation; this release does not claim multipart support. |
| [#360](https://github.com/http-party/http-server/issues/360) Add `.headers` support | Recorded open report; not reproduced or claimed fixed in this release. |
| [#526](https://github.com/http-party/http-server/issues/526) [FEATURE REQUEST] Add option to sort by date | Recorded open report; not reproduced or claimed fixed in this release. |
| [#668](https://github.com/http-party/http-server/issues/668) Invalid SSL certificate | Recorded open report; not reproduced or claimed fixed in this release. |
| [#644](https://github.com/http-party/http-server/issues/644) Setting CSP | Recorded open report; not reproduced or claimed fixed in this release. |
| [#859](https://github.com/http-party/http-server/issues/859) How to let the json file (*.json) return response header: 'application/json', instead of 'application/json; charset=UTF-8' | Recorded open report; not reproduced or claimed fixed in this release. |
| [#849](https://github.com/http-party/http-server/issues/849) 404 error on the page with param | Recorded open report; not reproduced or claimed fixed in this release. |
| [#854](https://github.com/http-party/http-server/issues/854) Do not open a new browser window if one is already open | Recorded open report; not reproduced or claimed fixed in this release. |
| [#851](https://github.com/http-party/http-server/issues/851) Proxy target request header not present | Recorded open report; not reproduced or claimed fixed in this release. |
| [#629](https://github.com/http-party/http-server/issues/629) Serve file with default ext is same name dir cannot be shown | Recorded open report; not reproduced or claimed fixed in this release. |
| [#729](https://github.com/http-party/http-server/issues/729) Mirror domain in Access-Control-Allow-Origin header | Recorded open report; not reproduced or claimed fixed in this release. |
| [#756](https://github.com/http-party/http-server/issues/756) Error: Cannot set headers after they are sent to client, occurs when trying to serve index.html, only occurs in v14.0.0 | Recorded open report; not reproduced or claimed fixed in this release. |
| [#825](https://github.com/http-party/http-server/issues/825) robots.txt flag is not working | Reproduced literal true response; fixed boolean-string handling with HTTP regression. |
| [#678](https://github.com/http-party/http-server/issues/678) As a user I would like the ability to specify the default landing page / 404 page / magic pages | Recorded open report; not reproduced or claimed fixed in this release. |
| [#761](https://github.com/http-party/http-server/issues/761) Node 17 broke the catch all | Same IPv4/IPv6 localhost mismatch as814; no global DNS override introduced. |
| [#821](https://github.com/http-party/http-server/issues/821) Receives SIGTERM during "DDoS" | Recorded open report; not reproduced or claimed fixed in this release. |
| [#820](https://github.com/http-party/http-server/issues/820) Bypass etc/hosts for virtual domains | Recorded open report; not reproduced or claimed fixed in this release. |
| [#777](https://github.com/http-party/http-server/issues/777) Add support for DuckDNS | Recorded open report; not reproduced or claimed fixed in this release. |
| [#757](https://github.com/http-party/http-server/issues/757) Proxy ? based powerful attack on http-server caught in wild. Can force out of memory | The same bounded reproduction exhausted the isolated heap before the fix. Cyclic forwarding now terminates with508, with at most16 forwarding hops. |
| [#812](https://github.com/http-party/http-server/issues/812) localhost:4664 not sending data | Recorded open report; not reproduced or claimed fixed in this release. |
| [#336](https://github.com/http-party/http-server/issues/336) http2 | Recorded open report; not reproduced or claimed fixed in this release. |
| [#807](https://github.com/http-party/http-server/issues/807) How to serve build with homepage property set? | Recorded open report; not reproduced or claimed fixed in this release. |
| [#634](https://github.com/http-party/http-server/issues/634) Server Crashing with "Cannot set headers after they are sent to the client" | Recorded open report; not reproduced or claimed fixed in this release. |
| [#805](https://github.com/http-party/http-server/issues/805) Cannot set headers after they are sent to the client | Recorded open report; not reproduced or claimed fixed in this release. |
| [#802](https://github.com/http-party/http-server/issues/802) http-server doesn't exit and hold on listening port | Recorded open report; not reproduced or claimed fixed in this release. |
| [#798](https://github.com/http-party/http-server/issues/798) Allow downloading directory as archive | Recorded open report; not reproduced or claimed fixed in this release. |
| [#718](https://github.com/http-party/http-server/issues/718) reported 2 issues during file rendering | Recorded open report; not reproduced or claimed fixed in this release. |
| [#768](https://github.com/http-party/http-server/issues/768) Should Read PORT property from process.env.PORT | Recorded open report; not reproduced or claimed fixed in this release. |
| [#641](https://github.com/http-party/http-server/issues/641) Support HTTP/2? | Recorded open report; not reproduced or claimed fixed in this release. |
| [#670](https://github.com/http-party/http-server/issues/670) When using https display https://common_name:8080/ as one of the valid hostnames | Recorded open report; not reproduced or claimed fixed in this release. |
| [#665](https://github.com/http-party/http-server/issues/665) The server has no method of dealing with global exceptions. | Recorded open report; not reproduced or claimed fixed in this release. |
| [#762](https://github.com/http-party/http-server/issues/762) Option to use devcert for local development SSL | Recorded open report; not reproduced or claimed fixed in this release. |
| [#766](https://github.com/http-party/http-server/issues/766) Support beautiful file/folder icon | Recorded open report; not reproduced or claimed fixed in this release. |
| [#724](https://github.com/http-party/http-server/issues/724) http-server dockerized | Recorded open report; not reproduced or claimed fixed in this release. |
| [#770](https://github.com/http-party/http-server/issues/770) Allow reading a javascript file for configuration defaults | Recorded open report; not reproduced or claimed fixed in this release. |
| [#723](https://github.com/http-party/http-server/issues/723) Intermittent test failures | Recorded open report; not reproduced or claimed fixed in this release. |
| [#652](https://github.com/http-party/http-server/issues/652) Request proxying of custom HTTP headers | Recorded open report; not reproduced or claimed fixed in this release. |
| [#684](https://github.com/http-party/http-server/issues/684) Is there a way to set the Access-Control-Allow-Methods header? | Recorded open report; not reproduced or claimed fixed in this release. |
| [#380](https://github.com/http-party/http-server/issues/380) Feature: Do not cache local, but cache remote files (option) | Recorded open report; not reproduced or claimed fixed in this release. |
| [#545](https://github.com/http-party/http-server/issues/545) Add support for 'Access-Control-Expose-Headers' using --cors | Recorded open report; not reproduced or claimed fixed in this release. |
| [#506](https://github.com/http-party/http-server/issues/506) Some directories are not shown | Recorded open report; not reproduced or claimed fixed in this release. |
| [#509](https://github.com/http-party/http-server/issues/509) Server side caching | Recorded open report; not reproduced or claimed fixed in this release. |
| [#630](https://github.com/http-party/http-server/issues/630) [Feature] Lack of excluding files / pointing target folder to serve. | Recorded open report; not reproduced or claimed fixed in this release. |
| [#273](https://github.com/http-party/http-server/issues/273) SLL mode does not serve HTTP request | Recorded open report; not reproduced or claimed fixed in this release. |
| [#280](https://github.com/http-party/http-server/issues/280) Is it possible to proxy some url to other server not all url. | Recorded open report; not reproduced or claimed fixed in this release. |
| [#539](https://github.com/http-party/http-server/issues/539) Trailing slash when serving directory index.html | Recorded open report; not reproduced or claimed fixed in this release. |
| [#623](https://github.com/http-party/http-server/issues/623) html documents served are downloaded | Recorded open report; not reproduced or claimed fixed in this release. |
| [#632](https://github.com/http-party/http-server/issues/632) Unable to close port 7010 | Recorded open report; not reproduced or claimed fixed in this release. |
| [#138](https://github.com/http-party/http-server/issues/138) Memory leak on large files with streaming middleware union  | Recorded open report; not reproduced or claimed fixed in this release. |
| [#467](https://github.com/http-party/http-server/issues/467) More logging options | Recorded open report; not reproduced or claimed fixed in this release. |
| [#263](https://github.com/http-party/http-server/issues/263) HTTP 400 response with body "URI Error: URI malformed" when requesting an URL with a ISO-8859-1 encoding | Recorded open report; not reproduced or claimed fixed in this release. |
| [#487](https://github.com/http-party/http-server/issues/487) Add option to disable unsafe TLS v1 protocol | Recorded open report; not reproduced or claimed fixed in this release. |
| [#155](https://github.com/http-party/http-server/issues/155) Support for CA bundles? | Recorded open report; not reproduced or claimed fixed in this release. |
| [#396](https://github.com/http-party/http-server/issues/396) Support HTTP PUT requests via a flag | Recorded open report; not reproduced or claimed fixed in this release. |

## Validation

All31 original test files run with maintained Tap and a compatible maintained Request client. Removed Tap method aliases are updated and the HTTP test client disables connection pooling to avoid reusing closed fixture servers. The source and extracted final package run the original suite and focused HTTP regressions. Runtime and full workspace audits must report zero findings.

Release completion requires the exact CI tarball, successful CodeQL with zero open alerts, npm provenance/identity, direct and alias consumers, and identical immutable release assets.
