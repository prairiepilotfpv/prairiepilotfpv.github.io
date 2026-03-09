# Copilot Instructions

This repository is tightly governed. Follow these rules for all code suggestions.

## Read before coding
Always read:
- `AGENTS.md`
- `README.md`
- `docs/architecture.md`
- relevant files in `docs/standards/`

## Core rules
- Reuse existing files and patterns first
- Prefer editing existing code over creating new files
- New files must be justified
- Do not create parallel abstractions
- Do not add unnecessary dependencies
- Keep changes small and coherent

## Repository structure
Main site sections:
- Home
- Art
- Words
- Make
- About

Content collections:
- `art`
- `words`
- `make`

## Required behavior
For meaningful changes:
- update documentation
- add or update tests, or provide a justified no-test note
- add a task journal entry in `docs/task-journal/`

## Debugging
When fixing errors:
- reproduce first
- inspect exact error output
- identify root cause
- make the smallest possible fix
- avoid speculative rewrites

## Design direction
Avoid generic:
- SEO blog patterns
- startup-style card-grid feeds
- unnecessary abstractions

Prefer:
- editorial layouts
- media-aware presentation
- restrained, intentional structure