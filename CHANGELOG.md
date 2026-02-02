# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.2] - 2026-1-01

## Changed

- Updating dependencies.

## [1.5.1] - 2025-12-01

### Changed

- Re-aligning NPM version with GitHub version.

## [1.4.2] - 2025-12-01

### Changed

- Migrated documentation from Honkit to Jekyll.
- Reorganized documentation structure into `docs-src/` directory.
- Removed deprecated Sass dependencies from Jekyll build.

## [1.4.1] - 2025-04-06

### Changed

- Updated ESLint configuration to support modern Node.js and package updates.
- Enabled continued dependabot updates after years of inactivity.

### Fixed

- Various dependency updates for security and compatibility.

## [1.4.0] - 2021-05-15

### Changed

- Migrated from TinyQBN (Grams) format to MongoDB Query Language (MQL) via Mingo.
- Updated all examples to use new MQL expression syntax.

### Added

- Two new entries to storylet history documentation.

## [1.2.6] - 2021-01-30

### Added

- Package export paths (e.g., `simple-qbn/Deck`).
- Use of `Object.freeze()` for combined objects.

## [1.2.0] - 2020-12-23

### Changed

- Revised State management and handling between classes.
- Completed documentation with history and usage examples.

## [1.0.0] - 2020-12-05

### Added

- Initial release
- State-based architecture with manual state passing
- Core classes: `State`, `Card`, `Deck`, `Expression`, `QualitySet`
- Browser and Node.js support
- Webpack bundling for browser usage
- Comprehensive documentation
