# Task Journal

The task journal logs significant work on The High Prairie. Each entry documents what was done, why, and how it was verified.

## Purpose

The task journal serves as:
- **Evidence trail**: Future agents can see what changed and why
- **Decision record**: Document choices made during implementation
- **Learning reference**: Solutions to problems can be found and reused
- **Progress tracking**: Clear record of what work has been completed

## When to Create an Entry

Create a task journal entry after completing:

- New features or sections
- Bug fixes (especially with interesting root causes)
- Significant refactoring
- Major documentation updates
- Architecture or pattern decisions
- Performance improvements
- Tool or dependency changes

**Do NOT create entries for**:
- Tiny typo fixes
- Simple dependency updates
- Single-line comment additions
- Minor formatting changes

## Entry Template

Use this template for each task journal entry:

```markdown
# [DATE]: [Brief Title]

## Summary
[1-2 sentences describing what you did and why]

## Changes
- [What files changed]
- [What features were added/modified]
- [What was removed, if anything]

## Verification
- [Build test: did `npm run build` succeed?]
- [Manual testing: what did you verify?]
- [Performance: any metrics before/after?]
- [Browser testing: which browsers tested?]

## Technical Details
[Optional: explain the implementation approach if complex]
- [Why you chose this approach]
- [Trade-offs considered]
- [Gotchas or unexpected issues]

## Decisions Made
[Any architectural or design choices]
- [Decision 1]: [Why this way and not another?]
- [Decision 2]: [Trade-offs]

## Questions/Uncertainties
[If anything remains unresolved]
- [Question 1]: [Description of what's unclear]
- [Next steps]: [What should be done next]

## Related Files
- [src/components/Example.astro](../../src/components/Example.astro)
- [src/content/art/example.md](../../src/content/art/example.md)
```

## Entry Filename

Name entries like this:

```
YYYY-MM-DD_short-title.md

Examples:
2026-03-08_add-image-optimization.md
2026-02-28_fix-nav-mobile-layout.md
2026-02-25_implement-rss-feeds.md
```

Use the date you completed the work, not when you started.

## Example Entries

### Example 1: New Feature

```markdown
# 2026-03-08: Add image optimization to Art section

## Summary
Implemented Astro's Image component for all Art collection pages to improve
performance and load times. Images now auto-optimize to WebP format with
responsive sizing.

## Changes
- Updated ArticleCard component to use <Image> instead of <img>
- Updated Art page layouts to use Image component
- Added image.astro util component for consistent handling
- Removed direct img tag usage from all Art-related templates

## Verification
- Build test: `npm run build` succeeds (no errors/warnings)
- Manual testing: All Art posts load images correctly
- Performance: Initial load time improved from 2.3s to 1.1s (4G throttling)
- Browser testing: Chrome, Firefox, Safari all work correctly
- Mobile: Images display properly on iPhone/iPad

## Technical Details
Astro's Image component automatically:
- Converts images to WebP/AVIF formats
- Generates responsive image sizes
- Adds lazy loading
- Prevents layout shift with proper dimensions

We chose Astro's built-in Image over a standalone sharp plugin because:
- Less configuration (no extra setup needed)
- Better Astro integration (automatic)
- Simpler maintenance (fewer dependencies)

## Decisions Made
- Image component usage: Required for all images in Art collection
- Reason: Ensures consistency and automatic optimization
- Lazy loading: Enabled by default (good for performance)

## Related Files
- [src/components/art/ArticleCard.astro](../../src/components/art/ArticleCard.astro)
- [src/pages/art/[slug].astro](../../src/pages/art/[slug].astro)
- [docs/architecture.md](../architecture.md) - updated with Image usage guidance
```

### Example 2: Bug Fix

```markdown
# 2026-03-05: Fix navigation highlight on current page

## Summary
Navigation links were not highlighting the current page. Fixed by comparing
the current route with link href during rendering.

## Changes
- Updated Navigation.astro component to detect active route
- Added .active CSS class with highlight styling
- No changes to URL structure or routing

## Verification
- Build test: `npm run build` passes
- Manual testing: Navigate to Art, Words, Make pages - current link highlighted
- Browser: Chrome and Firefox both work correctly

## Technical Details
Issue: Astro pages are pre-rendered, so we can't use traditional active link
detection (like in client-side apps).

Solution: Use Astro.url.pathname to get the current page path and compare
with each navigation link href.

```astro
const currentPath = new URL(Astro.url).pathname;
const isActive = currentPath === href;
```

## Decisions Made
- No JavaScript: Used server-side logic (preferred for static sites)
- Why: Keeps site fast, no runtime overhead

## Related Files
- [src/components/Navigation.astro](../../src/components/Navigation.astro)
```

### Example 3: Documentation

```markdown
# 2026-02-28: Create governance documentation

## Summary
Created comprehensive documentation for multi-agent coordination: AGENTS.md,
CLAUDE.md, Copilot instructions, architecture docs, and standards.

## Changes
- Created [AGENTS.md](../../AGENTS.md) - core coordination rules
- Created [CLAUDE.md](../../CLAUDE.md) - Claude-specific guidance
- Created [.github/copilot-instructions.md](../../.github/copilot-instructions.md)
- Created [docs/architecture.md](../architecture.md) - structure and patterns
- Created [docs/decisions/0001-site-architecture.md](../decisions/0001-site-architecture.md)
- Created [docs/standards/](../standards/) - coding, testing, docs, errors

## Verification
- All documentation is internally consistent
- Links between docs work correctly
- Examples in docs are accurate

## Technical Details
Goal: Establish a governance framework that allows multiple AI agents (Claude,
Copilot, Codex) to work on the same codebase without:
- Architecture drift
- Duplicate abstractions
- Vague or undocumented changes
- Conflicting patterns

Solution: Create detailed, enforceable guidelines that:
- Require reading documentation before coding
- Define approved patterns and structure
- Mandate documentation updates with code changes
- Establish debugging and testing standards

## Decisions Made
- Static governance in files (not CI enforcement yet)
- Reason: Simpler to start, can add CI validation later
- Task journal required for all meaningful work
- Reason: Evidence trail for future agents

## Questions/Uncertainties
- Should we add pre-commit hooks to enforce guidelines?
- Should we create automation to validate architecture?
- Next step: Implement CI/enforcement scripts

## Related Files
- [AGENTS.md](../../AGENTS.md)
- [CLAUDE.md](../../CLAUDE.md)
- [docs/](../)
```

## Guidelines for Good Entries

### Do:
- ✅ Be specific: "Fixed image loading on Safari" not "Fixed bugs"
- ✅ Explain why: "We chose Astro's Image because..." not just "We used Image"
- ✅ Include verification: "Build passes, manual testing shows..."
- ✅ Link to files: Use relative paths for easy navigation
- ✅ Record decisions: Future agents need to understand choices
- ✅ Note uncertainties: "This might need review for..." or "Open question:"

### Avoid:
- ❌ Vague titles: "Update code", "Work on stuff"
- ❌ Incomplete summaries: Don't describe what changed without explaining why
- ❌ No verification: "I made the changes" without showing it works
- ❌ Over-documentation: Three paragraphs of background for a typo fix
- ❌ Future work todos: Use this space for what you DID, not what remains

## Using the Task Journal

### For Future Agents

When working on similar features or debugging similar issues:

1. **Search the task journal** for related entries
2. **Read the decision section** to understand why choices were made
3. **Check the verification section** to see how similar work was tested
4. **Look at related files** to see the implementation

Example: Need to add pagination to Words collection?
- Search for "Words collection" or "pagination"
- Find related entries for similar content work
- Read how similar features were structured and tested

### Linking Across Documentation

From other docs, link to task journal entries:

```markdown
See [task journal: 2026-03-08 image optimization](../task-journal/2026-03-08_image-optimization.md)
for how we implemented lazy-loading images.
```

From task journal entries, link to architecture docs:

```markdown
See [docs/architecture.md](../architecture.md) for the content collection
schema and folder structure this change maintains.
```

## Organizing Task Journal Entries

Keep entries organized by date (most recent first). Optionally create index:

```markdown
# 2026-03 (March)
- [08: Add image optimization](2026-03-08_add-image-optimization.md)
- [05: Fix navigation highlight](2026-03-05_fix-nav-highlight.md)

# 2026-02 (February)
- [28: Create governance documentation](2026-02-28_governance-docs.md)
```

## Tips for Writing Good Entries

1. **Write as you go**: Don't wait until the end to document everything. Take notes during development.

2. **Include code snippets**: If the implementation is interesting, show the code:
   ```astro
   <Image src={post.image} alt={post.title} />
   ```

3. **Be honest about trade-offs**:
   - "We chose X over Y because of Z"
   - "This approach has limitation L, but was fastest to implement"

4. **Record learnings**:
   - "Discovered that Astro caches...")
   - "Astro's Image component doesn't support SVG - we convert to PNG instead"

5. **Future-proof for automation**: Format consistently so scripts can parse entries later
   - Use `## Summary`, `## Changes`, `## Verification` consistently
   - Use bullet points for lists
   - Link to files with relative paths

## Examples of Complete Entries

See example entries above for reference. Each shows:
- Clear title and date
- Concise summary
- What changed and why
- How it was verified
- Decisions made
- Any uncertainties or follow-ups

---

**Remember**: The task journal is for future agents. Write clearly, include evidence, and explain your choices.
