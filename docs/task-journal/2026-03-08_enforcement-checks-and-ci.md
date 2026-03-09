# 2026-03-08: Add governance enforcement checks and CI validation

## Summary
Implemented lightweight repository enforcement using one Node script and a CI workflow so structural drift, missing documentation, task journal gaps, and content frontmatter issues fail automatically.

## Changes
- Added `package.json` scripts for lint/test/build/check/verify workflows
- Added `scripts/repo-checks.mjs` as a shared enforcement script with subcommands
- Added `.github/workflows/ci.yml` to run install, verify, and build in CI
- Updated `README.md` with script documentation
- Updated `docs/standards/documentation-standards.md` with enforcement expectations

## Verification
- Ran `npm install --package-lock-only` to generate lockfile for `npm ci`
- Ran `npm run check:structure`
- Ran `npm run check:docs`
- Ran `npm run check:content`
- Ran `npm run verify`
- Ran `npm run build`

## Technical Details
- Chose a single script (`scripts/repo-checks.mjs`) to avoid duplicate helpers and keep checks easy to maintain.
- Implemented frontmatter parsing without new dependencies to keep tooling minimal.
- Implemented task journal enforcement by checking git-changed files for a dated entry when changes occur outside `docs/task-journal/`.

## Decisions Made
- Single-script design over multiple scripts to reduce abstraction drift
- No external lint/test dependencies because governance checks are file-system and markdown/frontmatter focused
- `build` script mapped to verification checks in this governance-focused baseline

## Questions/Uncertainties
- This workspace snapshot does not include an Astro app structure yet (`src/` absent), so content checks currently pass with a no-content note when `src/content` is not present.

## Related Files
- [package.json](../../package.json)
- [scripts/repo-checks.mjs](../../scripts/repo-checks.mjs)
- [.github/workflows/ci.yml](../../.github/workflows/ci.yml)
- [README.md](../../README.md)
- [docs/standards/documentation-standards.md](../standards/documentation-standards.md)
