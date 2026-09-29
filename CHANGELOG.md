# Changelog

## 1.0.0

- Start Stackline maintenance of the documented upstream API.
- Preserve and verify published runtime files and TypeScript declarations.
- Run upstream functional suites against both source and the final package.
- Publish the reviewed CI artifact through GitHub Actions with provenance and immutable release evidence.
- Fix issue 825: recognize the string true produced by the CLI robots flag.
- Fix issues 636/757: reject cyclic proxy forwarding with HTTP 508 before requests grow without bound. Existing proxy headers are preserved.
- Modernize the upstream test harness and HTTP client; preserve all upstream functional cases.

- Keep directory redirects on the same origin, enforce directory listing containment with a path separator boundary, reject malformed path escapes, and parse CORS header lists in linear time.
