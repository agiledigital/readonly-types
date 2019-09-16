# Readonly TypeScript Types

[![Build Status](https://travis-ci.org/danielnixon/readonly-types.svg?branch=master)](https://travis-ci.org/danielnixon/readonly-types)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdanielnixon%2Freadonly-types%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/danielnixon/readonly-types/badge.svg?targetFile=package.json)](https://snyk.io/test/github/danielnixon/readonly-types?targetFile=package.json)
[![npm](https://img.shields.io/npm/v/readonly-types.svg)](https://www.npmjs.com/package/readonly-types)

A collection of readonly TypeScript types inspired by the built-in `ReadonlyArray`, `ReadonlyMap`, etc.

## Installation

```sh
# yarn
yarn add readonly-types

# npm
npm install readonly-types
```

## Usage

```TypeScript
// Here's an example using ReadonlyURL.
import { ReadonlyURL } from "readonly-types";

const hasFooSearchParam = (url: ReadonlyURL) => url.searchParams.has("foo")
```

## The Types
* ReadonlyURL (for [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL))
* ReadonlyURLSearchParams (for [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams))
* ReadonlyDate (for [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date))
* ReadonlyWeakSet (for [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet))
* ReadonlyWeakMap (for [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap))
* PRs welcome!

## See Also
* https://github.com/immutable-js/immutable-js
* https://github.com/jonaskello/tslint-immutable
* https://github.com/jonaskello/eslint-plugin-functional
* https://github.com/krzkaczor/ts-essentials#deep-partial--deep-required--deep-readonly--deep-nonnullable
* https://github.com/piotrwitek/utility-types#deepreadonlyt
