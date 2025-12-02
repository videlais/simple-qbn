# Jekyll Documentation Setup

This project uses Jekyll to generate documentation from markdown files.

## Directory Structure

- `docs-src/` - Jekyll source files (markdown, layouts, includes, config, assets)
  - `notes/` - Documentation markdown files
  - `notes/examples/` - Example documentation
  - `_layouts/` - Jekyll layout templates
  - `_includes/` - Reusable Jekyll components
  - `assets/` - CSS and other static assets
  - `_config.yml` - Jekyll configuration
- `docs/` - Generated HTML output (published to GitHub Pages)

## Prerequisites

- Ruby 2.7 or higher
- Bundler

## Installation

1. Install Ruby dependencies:
   ```bash
   bundle install
   ```

## Building Documentation

To build the documentation:
```bash
npm run docs
```

This will:
1. Copy `README.md` to `docs-src/notes/README.md`
2. Build the Jekyll site from `docs-src/`
3. Output HTML to the `docs/` directory

## Serving Documentation Locally

To preview the documentation locally:
```bash
npm run docs:serve
```

Then visit http://localhost:4000/simple-qbn/

## Adding New Pages

1. Create a markdown file in `docs-src/notes/` or `docs-src/notes/examples/`
2. Add YAML front matter at the top:
   ```yaml
   ---
   layout: page
   title: Your Page Title
   permalink: /your-url
   ---
   ```
3. Add the page to the navigation in `docs-src/_config.yml` under the `navigation` section
4. Build the documentation with `npm run docs`

## Customization

- **Styling**: Edit `docs-src/assets/css/style.css`
- **Layouts**: Modify templates in `docs-src/_layouts/`
- **Navigation**: Edit the `navigation` section in `docs-src/_config.yml`

## Migration from Honkit

This project was migrated from Honkit to Jekyll. All content and links have been preserved with the same URL structure.
