# SimpleQBN (1.4.0)

*Because nothing about quality-based narratives is actually simple.*

SimpleQBN is a quality-based narrative (QBN) generic JavaScript library for use in browsers or Node.js-based projects.

## Expression Language

Starting with version 1.5.0, SimpleQBN uses [Quis](https://www.npmjs.com/package/quis) 1.2.0 for expression evaluation with pure Quis syntax. All expressions are written as strings using Quis syntax, which provides a clean and powerful way to define conditions and comparisons.

Quis supports complex boolean expressions with operators like `&&` (AND), `||` (OR), and parentheses for grouping, allowing for sophisticated logical conditions in a single statement.

Previous versions used TinyQBN format and MongoDB query language compatibility, but as of 1.5.0, the library has been simplified to use only Quis string expressions for better maintainability and performance.

## History and Documentation

HonKit is used to create [a history and documentation of this project](https://videlais.github.io/simple-qbn/).

JSDocs is also used for the [API documentation](https://videlais.github.io/simple-qbn/api).

## Scripts

- `npm test` runs the [Jest-based](https://jestjs.io/en/) test files. (Internally, [Babel](https://babeljs.io/) is used to transform the source for testing.)
- `npm run lint` lints the files in `src` folder using [ESLint](https://eslint.org/).
- `npm run lint:test` lints the files in `test` folder using [ESLint](https://eslint.org/) with Jest settings.
- `npm run docs` generates `docs` HTML content based on Markdown files stored in `notes` using [HonKit](https://github.com/honkit/honkit).
- `npm run docs:serve` creates a local HTTP server serving the files in `notes` from a created `_book` directory by HonKit.
- `npm run build` uses [WebPack](https://webpack.js.org/) to bundle the files for use in browser-based projects. It creates globals based on each of the classes (**Card**, **Deck**, **Expression**, **QualitySet**, and **State**) of the project.
