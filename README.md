# The High Prairie

A media-forward personal publishing site built with [Astro](https://astro.build). The project emphasizes editorial, visual storytelling over generic SEO-driven design.

## About

The High Prairie is organized around five main sections:

- **Home**: Long-form editorial landing with hero, section overviews, and splash previews for Art, Words, Make, and About
- **Art**: Visual work, photography, and photo-centric artistic posts
- **Words**: Essays, blog posts, reflections, and text-first pieces
- **Make**: Handmade or 3D-printed smoking accessories, crafts, build logs, and process documentation
- **About**: Project information and contact details

Each section has its own content collection with dedicated layouts and styling.

## Project Structure

```
src/
├── content/
│   ├── art/                 # Art collection entries
│   ├── words/               # Words collection entries
│   ├── make/                # Make collection entries
│   └── config.ts            # Collection schemas
├── components/
│   └── Navigation.astro     # Main navigation
├── layouts/
│   └── BaseLayout.astro     # Shared page wrapper (head + nav + main shell)
├── pages/
│   ├── index.astro          # Home page
│   ├── art/                 # Art hub + post routes
│   ├── words/               # Words hub + post routes
│   ├── make/                # Make hub + post routes
│   └── about.astro          # About page
└── styles/
    └── global.css           # Global styling foundation
```

## Key Documentation

**For AI Agents & Contributors**: Read these first
- [AGENTS.md](AGENTS.md) — Multi-agent coordination rules (required for all agents)
- [CLAUDE.md](CLAUDE.md) — Claude-specific guidance and expectations
- [.github/copilot-instructions.md](.github/copilot-instructions.md) — GitHub Copilot instructions

**Architecture & Decisions**
- [docs/architecture.md](docs/architecture.md) — Folder structure, content model, extension rules
- [docs/decisions/0001-site-architecture.md](docs/decisions/0001-site-architecture.md) — Why Astro, why this structure

**Standards & Guidelines**
- [docs/standards/coding-standards.md](docs/standards/coding-standards.md) — Code style, patterns, naming
- [docs/standards/testing-standards.md](docs/standards/testing-standards.md) — Testing approach and requirements
- [docs/standards/documentation-standards.md](docs/standards/documentation-standards.md) — Documentation style and when to document
- [docs/standards/error-reporting-standards.md](docs/standards/error-reporting-standards.md) — Debugging, evidence-first investigation

**Task Tracking**
- [docs/task-journal/README.md](docs/task-journal/README.md) — Task entry template and logging guidelines

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

### Build

```bash
npm run build
```

Generated static files will be in `dist/`.

### Preview Build

```bash
npm run preview
```

## Governance Enforcement Scripts

This repository includes lightweight Node checks to enforce architecture and documentation rules:

- `npm run check:structure` - validates approved folders and naming conventions
- `npm run check:docs` - validates required docs and task journal compliance
- `npm run check:content` - validates content collections and frontmatter
- `npm run verify` - runs all governance checks

Additional script mappings:

- `npm run lint` -> `check:structure`
- `npm run test` -> `check:docs` + `check:content`
- `npm run build` -> Astro static build

Recommended local workflow:

```bash
npm install
npm run verify
npm run dev
```

## Multi-Agent Governance

This repository is maintained by multiple AI coding agents (Claude, GitHub Copilot, Codex). To maintain coherence, every agent must:

1. **Read the startup checklist** in their agent-specific instructions
2. **Read the architecture and standards** before making changes
3. **Document all meaningful changes**
4. **Log work in the task journal**
5. **Submit clear PRs** with evidence-based explanations

**This is not optional.** Skipping these steps creates technical debt, duplicate abstractions, and architecture drift.

See [AGENTS.md](AGENTS.md) for the full governance rules.

## Adding New Content

### Art (Visual Work)
1. Add your post to `src/content/art/`
2. Include frontmatter: `title`, `date`, `description`, `image`
3. Use the Art layout

### Words (Essays & Posts)
1. Add your post to `src/content/words/`
2. Include frontmatter: `title`, `date`, `description`, excerpt`
3. Use the Words layout

### Make (Projects & Crafts)
1. Add your post to `src/content/make/`
2. Include frontmatter: `title`, `date`, `description`, `image` (optional)
3. Use the Make layout

See [docs/architecture.md](docs/architecture.md) for content model details.

## Contributing

Before working on this project:

1. **Read [AGENTS.md](AGENTS.md)** — All contributors must follow these rules
2. **Choose your agent instructions**:
   - Claude: [CLAUDE.md](CLAUDE.md)
   - Copilot: [.github/copilot-instructions.md](.github/copilot-instructions.md)
   - Codex: Follow [AGENTS.md](AGENTS.md)
3. **Read [docs/architecture.md](docs/architecture.md)** to understand structure
4. **Read relevant standards** before coding
5. **Create a task journal entry** after significant work

**Do not** create new sections, files, or patterns without reading the documentation first.

## License

[Specify your license here]

## Questions?

See the [docs/](docs/) folder for detailed guidance. If something is unclear, file an issue or ask before making changes.
