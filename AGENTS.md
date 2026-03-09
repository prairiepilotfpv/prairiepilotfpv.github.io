# AGENTS.md

## Project
The High Prairie

A governed Astro website for a media-forward personal publishing site.

Primary navigation:
- Home
- Art
- Words
- Make
- About

Primary publishing modes:
- Art = visual work, photography, image-led posts
- Words = essays, blog posts, reflections, text-led work
- Make = handmade or 3D printed smoking accessories, crafts, build logs, process pages

---

## Core repository goals

This repository must remain:

- small
- coherent
- predictable
- easy for humans and coding agents to reason about
- resistant to architecture drift
- resistant to duplicate abstractions
- well documented
- easy to debug

Agents must prefer consistency and clarity over cleverness.

---

## Mandatory startup checklist

Before making any code change, you must:

1. Read this file: `AGENTS.md`
2. Read `README.md`
3. Read `docs/architecture.md`
4. Read relevant files in `docs/standards/`
5. Read `docs/decisions/0001-site-architecture.md`
6. Inspect the existing file structure before proposing new files
7. Reuse existing patterns whenever possible
8. State a brief plan before coding
9. Identify which existing files will be changed
10. Justify any new file before creating it

If you have not done all of the above, do not begin implementation.

---

## Architecture rules

Approved top-level site sections:
- Home
- Art
- Words
- Make
- About

Approved content collections:
- `art`
- `words`
- `make`

Approved development philosophy:
- Astro-based
- content-collection-driven
- editorial and media-aware
- minimal dependencies
- static-first
- avoid generic card-grid “SEO blog” design

---

## File creation rules

Do not create new files unless one of these is true:

1. The file is explicitly required by documented architecture
2. The file clearly improves structure without duplicating an existing pattern
3. The file is necessary to implement a real feature cleanly

Before creating a new file:
- search for an existing file that could be extended
- prefer editing over adding
- justify the new file in your plan

Do not create:
- duplicate helpers
- parallel layout systems
- alternate content pipelines
- “just in case” utility files
- placeholder abstractions with no current use

---

## Reuse-first rule

Before creating any:
- component
- helper
- layout
- utility
- content schema
- script

You must first inspect the codebase and ask:

- Does something like this already exist?
- Can I extend an existing file instead?
- Can I keep this change smaller?

Prefer extending an existing structure over inventing a new one.

---

## Change workflow

For every meaningful change, do all of the following:

1. Read instructions and architecture docs
2. Plan the change briefly
3. Implement the smallest coherent change set
4. Run relevant checks
5. Update documentation
6. Add a task journal entry
7. Summarize what changed and why

A change is incomplete if code is modified but docs and task journal are not updated.

---

## Documentation rule

Every meaningful change must update at least one of:

- `README.md`
- a file in `docs/standards/`
- `docs/architecture.md`
- a decision record in `docs/decisions/`
- a task entry in `docs/task-journal/`

At minimum, every meaningful change must create or update a task journal entry.

If no doc update is needed, explicitly state why.

---

## Task journal rule

Each meaningful task must have an entry in `docs/task-journal/`.

Use the documented template.

Task journals exist so future agents understand:
- what changed
- why it changed
- which files were touched
- what was tested
- what remains unresolved

---

## Testing rule

Every implementation change must do one of the following:

- add tests
- update tests
- provide a justified no-test note

Do not silently skip testing.

Testing expectations are defined in:
- `docs/standards/testing-standards.md`

---

## Debugging rule

Debugging must be evidence-first.

Do not guess and patch blindly.

Required process:
1. reproduce the issue
2. state the exact failing command
3. quote the exact error output
4. identify the most likely root cause
5. propose the smallest fix
6. validate after fixing
7. document the outcome

Do not:
- bypass failing checks
- rewrite unrelated code while debugging
- create new abstractions to hide the issue

---

## Dependency rule

Do not add a dependency unless:
- it is clearly needed
- the benefit outweighs the maintenance cost
- the reason is documented

When adding a dependency:
- explain why built-in or existing solutions are insufficient
- document it in README or standards docs
- keep dependency count low

---

## Design rule

This site must not drift into a generic:
- SEO blog
- startup content site
- heavy card-grid feed
- template-driven “AI slop” design

The design direction should remain:
- editorial
- media-aware
- restrained
- image-conscious
- visually intentional

Implementation should support this aesthetic even at scaffold stage.

---

## When uncertain

If uncertain:
- say what is uncertain
- inspect more of the existing repo
- choose the smallest reasonable change
- avoid architecture invention

Never hide uncertainty behind extra code.

---

## Output expectations for coding tasks

Before coding:
- state the plan
- name affected files
- justify any new file

After coding:
- summarize what changed
- report checks run
- report failures exactly if any remain
- list docs updated
- list task journal entry added