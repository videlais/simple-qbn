# Contributing to SimpleQBN

Thank you for your interest in contributing to SimpleQBN! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Use the issue template** if available
3. **Provide details**:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (Node.js version, OS, etc.)
   - Code samples if applicable

### Suggesting Enhancements

1. **Check existing issues** for similar suggestions
2. **Clearly describe** the enhancement and its use case
3. **Explain why** this would be useful to most users
4. **Provide examples** of how it would work

### Pull Requests

1. **Fork the repository** and create a branch from `main`
2. **Follow the coding style** established in the project
3. **Add tests** for new functionality
4. **Update documentation** as needed
5. **Ensure all tests pass**: `npm test`
6. **Lint your code**: `npm run lint`
7. **Write clear commit messages**

## Development Setup

### Prerequisites

- Node.js 18+ recommended
- npm 9+ or compatible package manager
- Ruby 2.7+ (for documentation)
- Bundler (for Jekyll)

### Installation

```bash
git clone https://github.com/videlais/simple-qbn.git
cd simple-qbn
npm install
bundle install
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:node       # Node.js tests only
npm run test:browser    # Browser tests only

# Run tests in watch mode
npm test -- --watch
```

### Building

```bash
# Compile TypeScript
npm run compile

# Build bundles
npm run build:all

# Build documentation
npm run docs
```

### Project Structure

```
simple-qbn/
├── src/              # Source TypeScript files
│   ├── *.ts          # Original architecture classes
│   └── reactive/     # Reactive architecture classes
├── test/             # Test files
│   └── reactive/     # Reactive tests
├── docs-src/         # Documentation source (Jekyll)
├── docs/             # Generated documentation
├── build/            # Compiled bundles
└── dist/             # TypeScript compilation output
```

## Coding Standards

### TypeScript Style

- Use TypeScript for all source code
- Follow existing code style and patterns
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Maintain type safety (avoid `any` when possible)

### Testing

- Write tests for all new features
- Maintain or improve code coverage (target: >99%)
- Use descriptive test names
- Test both original and reactive architectures when applicable

### Commit Messages

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(reactive): add subscription filtering

Add ability to filter subscriptions based on state keys.
This allows more granular control over reactive updates.

Closes #123
```

## Architecture Guidelines

### Original vs Reactive

SimpleQBN has two incompatible architectures:

1. **Original** (`State`, `Card`, `Deck`, etc.)
   - Manual state passing
   - Explicit availability checking
   - Smaller bundle size

2. **Reactive** (`ReactiveState`, `ReactiveCard`, `ReactiveDeck`, etc.)
   - Automatic state updates
   - Event-driven subscriptions
   - Larger bundle size

**Important**: Changes to one architecture often require equivalent changes to the other.

### Adding New Features

1. Determine if the feature applies to one or both architectures
2. Implement in original architecture if applicable
3. Implement equivalent in reactive architecture
4. Add tests for both implementations
5. Update documentation in `docs-src/notes/`

## Documentation

### Code Documentation

- Add JSDoc comments to all public methods and classes
- Include `@param`, `@returns`, `@throws` annotations
- Provide examples in documentation

### User Documentation

Documentation is in `docs-src/notes/` using Markdown with Jekyll.

To add/update documentation:

1. Edit files in `docs-src/notes/`
2. Add YAML front matter
3. Update navigation in `docs-src/_config.yml`
4. Build with `npm run docs`
5. Preview with `npm run docs:serve`

## Release Process

(For maintainers)

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Run full test suite: `npm run all`
4. Commit changes
5. Create git tag: `git tag -a vX.Y.Z -m "Version X.Y.Z"`
6. Push: `git push && git push --tags`
7. Publish to npm: `npm publish`
8. Create GitHub release

## Questions?

Feel free to open an issue for questions or clarifications.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
