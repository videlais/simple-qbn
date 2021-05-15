# SimpleQBN (1.4.0)

*Because nothing about quality-based narratives is actually simple.*

SimpleQBN is a quality-based narrative (QBN) generic JavaScript library for use in browsers or Node.js-based projects.

## Expression Language Change

Previous to 1.4, SimpleQBN used expression operators from [TinyQBN](https://github.com/JoshuaGrams/tiny-qbn) in the Grams format of `variable-op-value`. Starting with 1.4, all expressions are written in the MongoDB query language via [Mingo](https://www.npmjs.com/package/mingo).

While the Grams format works well for Twine-related projects, the MongoDB query language allows for a broader definition of expressions using multiple comparsions and operator usages in a single statement.

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
