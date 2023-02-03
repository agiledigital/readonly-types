# Readonly TypeScript Types

[![Build Status](https://github.com/danielnixon/readonly-types/actions/workflows/main.yml/badge.svg)](https://github.com/danielnixon/readonly-types/actions/workflows/main.yml)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdanielnixon%2Freadonly-types%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![codecov](https://codecov.io/gh/danielnixon/readonly-types/branch/master/graph/badge.svg?token=SYO6NY3DF0)](https://codecov.io/gh/danielnixon/readonly-types)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fdanielnixon%2Freadonly-types%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/danielnixon/readonly-types/master)
[![Known Vulnerabilities](https://snyk.io/test/github/danielnixon/readonly-types/badge.svg?targetFile=package.json)](https://snyk.io/test/github/danielnixon/readonly-types?targetFile=package.json)
[![npm](https://img.shields.io/npm/v/readonly-types.svg)](https://www.npmjs.com/package/readonly-types)

A collection of readonly TypeScript types inspired by TypeScript's built-in readonly types (`ReadonlyArray`, `ReadonlyMap`, etc) and by [is-immutable-type](https://github.com/RebeccaStevens/is-immutable-type).

The types here are all fully `Immutable` following [is-immutable-type#definitions](https://github.com/RebeccaStevens/is-immutable-type#definitions).

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

The second column contains the types provided by this library (which are all `Immutable`). The columns to the right of it show the types being replaced and what level of immutability they achieve by default.

The first column ("Even Better 🚀") contains types that are more than just immutable versions of the types in the later columns. These "even better" options require more effort to adopt than those in the second column (or may not even be generally available yet), but they're worth considering if you want something that is more closely aligned with a pure typeful functional programming approach.

| Even Better 🚀 | Immutable | ReadonlyDeep | ReadonlyShallow | Mutable |
|----------------|-----------|--------------|-----------------|---------|
| | `ReadonlyRecord` | | | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkt) |
| | `ReadonlyURL` | | | [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) | 
| | `ReadonlyURLSearchParams` | | | [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) |
| [Temporal](https://tc39.es/proposal-temporal/docs/ambiguity.html) (stage 3 proposal, aims to solve various problems in `Date`, including its mutability) | `ReadonlyDate` | | | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) |
| [PrincipledArray](https://github.com/agiledigital/readonly-types/issues/7) (does not return mutable arrays from methods like `map`), [immutable-js](https://github.com/immutable-js/immutable-js/)'s types | `ImmutableArray` | `ReadonlyArray` | | `Array` |
| [immutable-js](https://github.com/immutable-js/immutable-js/)'s types | `ImmutableSet` | `ReadonlySet` | | `Set` |
| [immutable-js](https://github.com/immutable-js/immutable-js/)'s types | `ImmutableMap` | `ReadonlyMap` | | `Map` |
| | `ReadonlyWeakSet` | | | [`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) |
| | `ReadonlyWeakMap` | | | [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) |
| | `ReadonlyError` (and friends) | | | [`Error` and friends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#error_objects) |
| | `ReadonlyRegExp` | | | `RegExp` |
| [fp-ts's `TaskEither`](https://gcanti.github.io/fp-ts/modules/TaskEither.ts.html) | `ReadonlyPromise` | `Promise` | | |
| | `DeepImmutable` | | | [`DeepReadonly` from ts-essentials](https://github.com/ts-essentials/ts-essentials/blob/master/lib/types.ts#L156-L181), which when used will produce a mix of `Mutable` and `ReadonlyDeep` types |
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
* To see ReadonlyDate adoption grow, upvote this: https://github.com/date-fns/date-fns/issues/1944
