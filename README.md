# SimpleQBN (0.5.0 - beta)

*Because nothing about quality-based narratives is actually simple.*

SimpleQBN is a quality-based narrative (QBN) generic library. While it draws heavily from metaphors and expression operators defined in [TinyQBN](https://github.com/JoshuaGrams/tiny-qbn), it is not tied to a particular story format or even usage with Twine 2.

## History and Documentation

HonKit is used to create [a history and documentation of this project](https://videlais.github.io/simple-qbn/).

## Scripts

`npm test` runs the [Jest-based](https://jestjs.io/en/) test files. (Internally, [Babel](https://babeljs.io/) is used to transform the source for testing.)

`npm run lint` lints the files in `src` using [ESLint](https://eslint.org/) rules.

`npm run docs` generates `docs` HTML content based on Markdown files stored in `notes` using [HonKit](https://github.com/honkit/honkit).

`npm run docs-serve` creates a local HTTP server serving the files in `notes` from a created `_book` directory by HonKit.
