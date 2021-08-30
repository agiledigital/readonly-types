# Readonly TypeScript Types

[![Build Status](https://github.com/danielnixon/readonly-types/actions/workflows/main.yml/badge.svg)](https://github.com/danielnixon/readonly-types/actions/workflows/main.yml)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdanielnixon%2Freadonly-types%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![codecov](https://codecov.io/gh/danielnixon/readonly-types/branch/master/graph/badge.svg?token=SYO6NY3DF0)](https://codecov.io/gh/danielnixon/readonly-types)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fdanielnixon%2Freadonly-types%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/danielnixon/readonly-types/master)
[![Known Vulnerabilities](https://snyk.io/test/github/danielnixon/readonly-types/badge.svg?targetFile=package.json)](https://snyk.io/test/github/danielnixon/readonly-types?targetFile=package.json)
[![npm](https://img.shields.io/npm/v/readonly-types.svg)](https://www.npmjs.com/package/readonly-types)

[![dependencies Status](https://david-dm.org/danielnixon/readonly-types/status.svg)](https://david-dm.org/danielnixon/readonly-types)
[![devDependencies Status](https://david-dm.org/danielnixon/readonly-types/dev-status.svg)](https://david-dm.org/danielnixon/readonly-types?type=dev)

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

// This is fine.
const hasFooSearchParam = (url: ReadonlyURL) => url.searchParams.has("foo");

// But this won't compile.
const setFooSearchParam = (url: ReadonlyURL) => url.searchParams.set("foo", "bar");
```

## The Types
* ReadonlyRecord (for [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkt))
* ReadonlyURL (for [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL))
* ReadonlyURLSearchParams (for [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams))
* ReadonlyDate (for [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date))
* ReadonlyWeakSet (for [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet))
* ReadonlyWeakMap (for [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap))
* PRs welcome!

## Linting

You can ban the mutable counterparts to these readonly types using [ESLint](https://eslint.org/), [no-restricted-globals](https://eslint.org/docs/rules/no-restricted-globals) and [typescript-eslint/ban-types](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md).

```javascript
  rules: {
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          Record: {
            fixWith: "ReadonlyRecord",
          },
          URL: {
            fixWith: "ReadonlyURL",
          },
          URLSearchParams: {
            fixWith: "ReadonlyURLSearchParams",
          },
          Date: {
            fixWith: "ReadonlyDate",
          },
        },
      },
    ],
    "no-restricted-globals": [
      "error",
      { name: "URL" },
      { name: "URLSearchParams" },
      { name: "Date" },
    ],
  },
```

These lint rules are configured by [eslint-config-typed-fp](https://github.com/danielnixon/eslint-config-typed-fp) for you.

## See Also
* https://github.com/danielnixon/eslint-config-typed-fp
* https://github.com/immutable-js/immutable-js
* https://github.com/jonaskello/eslint-plugin-functional
* https://github.com/krzkaczor/ts-essentials#deep-partial--deep-required--deep-readonly--deep-nonnullable
* https://github.com/piotrwitek/utility-types#deepreadonlyt
