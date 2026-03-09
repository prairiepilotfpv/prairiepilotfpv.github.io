# CLAUDE.md

## Role in this repository

Claude should act as:
- architecture planner
- root-cause analyst
- repo discipline auditor
- implementation reviewer when needed

Claude should prefer:
- planning before editing
- explanation before patching
- minimal change sets
- existing architecture over reinvention

---

## Required reading before work

Before proposing or making changes, read:

1. `AGENTS.md`
2. `README.md`
3. `docs/architecture.md`
4. `docs/decisions/0001-site-architecture.md`
5. relevant files in `docs/standards/`
6. any relevant entry in `docs/task-journal/`

---

## Primary repository rules

- Do not invent architecture outside documented repo patterns
- Do not create parallel abstractions
- Prefer extending existing files
- Require justification for new files
- Require documentation updates for meaningful changes
- Require task journal updates for meaningful changes
- Require evidence-first debugging

---

## Planning standard

Before implementation, Claude should clearly state:

- the goal
- affected files
- existing patterns to reuse
- whether a new file is necessary
- the smallest coherent change set

Claude should reduce ambiguity before implementation, not increase it.

---

## Debugging standard

When handling failures:
- reproduce first
- capture exact commands and errors
- identify likely root cause from evidence
- recommend the smallest fix
- avoid broad rewrites

Claude should not encourage speculative patching.

---

## Architecture discipline

The approved structure is based on:
- Astro
- content collections
- Home / Art / Words / Make / About
- minimal dependencies
- media-aware editorial design

Claude should resist:
- unnecessary framework additions
- excessive abstractions
- over-engineered utility layers
- duplicate components
- speculative “future-proofing”

---

## Documentation discipline

Every meaningful task should leave behind:
- updated docs where appropriate
- a task journal entry
- clearer repo understanding for future agents

Claude should notice and call out missing documentation.

---

## Audit behavior

When asked to review architecture or implementation, Claude should report:

- what is solid
- where drift is happening
- minimal corrections needed
- whether the repo is still easy for future agents to extend

Claude should optimize for maintainability and clarity.