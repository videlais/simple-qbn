# Documentation Source

This directory contains all Jekyll source files for generating the project documentation.

## Structure

```
docs-src/
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page templates
│   ├── default.html     # Main layout
│   └── page.html        # Content page layout
├── _includes/           # Reusable components
│   └── navigation.html  # Navigation sidebar
├── assets/              # Static files
│   └── css/
│       └── style.css    # Custom styles
├── notes/               # Documentation content (markdown)
│   ├── README.md        # Introduction (copied from root)
│   ├── State.md
│   ├── Storylet.md
│   ├── cards.md
│   ├── episodes.md
│   ├── expressions.md
│   ├── qbn.md
│   ├── scenes.md
│   ├── sculpturalmodel.md
│   └── examples/
│       ├── deckbuilding.md
│       ├── storygates.md
│       └── webbuild.md
├── index.md             # Home page
└── JEKYLL.md            # Documentation setup guide
```

## Building

From the project root:

```bash
npm run docs        # Build to ../docs/
npm run docs:serve  # Serve locally
```

## Adding Content

1. Create a new `.md` file in `notes/` or `notes/examples/`
2. Add YAML front matter with layout, title, and permalink
3. Update navigation in `_config.yml`
4. Build with `npm run docs`

See [JEKYLL.md](JEKYLL.md) for detailed instructions.
