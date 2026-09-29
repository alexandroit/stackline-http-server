# Directory and redirect CodeQL review

Reviewed against commit d0cb8dd9c9fc81b61a144e684da9daa5cb0ab1a5 and the subsequent regression suite.

The CORS regular-expression backtracking issue is fixed by splitting on literal commas and trimming each field. The original protocol-relative directory redirect is fixed by constructing a single-rooted location and escaping backslashes.

Remaining alerts 2, 3 and 4 (path-injection) cross the explicit containment guard in lib/core/show-dir/index.js. The path is decoded and normalized before requiring equality with the configured root or its separator-delimited prefix. Root-prefix siblings and malformed escapes are tested. Child names passed to sort-files come from fs.readdir, not a user-supplied list. These flows are false positives for lexical directory traversal after the guard.

This preserves upstream behavior that follows filesystem symlinks placed by the operator. The configured root and its symlinks are trusted configuration; the server is not a realpath sandbox or a defense against concurrent filesystem modifications by another local actor.

Alert 6 (unvalidated redirect) crosses a location constructor that prepends one slash, removes all leading slash/backslash characters, and percent-encodes other backslashes. Real HTTP regressions cover protocol-relative paths, escapes, control characters and hostile query values; every emitted redirect remains on the current origin. This remaining finding is a false positive for an external redirect after the fix.

All runtime remains analyzed. No CodeQL query or path is disabled. Full upstream tests, extracted-package tests, targeted security regressions and zero-advisory source/runtime audits are required before publication. A second read-only review independently checked the containment and redirect construction.
