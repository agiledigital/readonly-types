# Readonly TypeScript Types

[![Build Status](https://github.com/agiledigital/readonly-types/actions/workflows/main.yml/badge.svg)](https://github.com/agiledigital/readonly-types/actions/workflows/main.yml)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fagiledigital%2Freadonly-types%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![codecov](https://codecov.io/gh/agiledigital/readonly-types/branch/master/graph/badge.svg?token=SYO6NY3DF0)](https://codecov.io/gh/agiledigital/readonly-types)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fagiledigital%2Freadonly-types%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/agiledigital/readonly-types/master)
[![Known Vulnerabilities](https://snyk.io/test/github/agiledigital/readonly-types/badge.svg?targetFile=package.json)](https://snyk.io/test/github/agiledigital/readonly-types?targetFile=package.json)
[![npm](https://img.shields.io/npm/v/readonly-types.svg)](https://www.npmjs.com/package/readonly-types)

A collection of readonly TypeScript types inspired by TypeScript's built-in readonly types (`ReadonlyArray`, `ReadonlyMap`, etc) and by [is-immutable-type](https://github.com/RebeccaStevens/is-immutable-type).

The types here are all fully `Immutable` following [is-immutable-type#definitions](https://github.com/RebeccaStevens/is-immutable-type#definitions).

This package assumes you have TypeScript's [strict mode](https://www.typescriptlang.org/tsconfig#strict) and [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) option turned on. [eslint-plugin-total-functions](https://github.com/danielnixon/eslint-plugin-total-functions/) provides an ESLint rule to ensure they're both on.

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
| [ImmutableMap or similar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps) | `ReadonlyRecord` | | | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkt) |
| | `ReadonlyURL` | | | [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) | 
| | `ReadonlyURLSearchParams` | | | [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) |
| [Temporal](https://tc39.es/proposal-temporal/) (stage 3 proposal, aims to solve various problems in `Date`, including its mutability) | `ReadonlyDate` | | | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) |
| [PrincipledArray](https://github.com/agiledigital/readonly-types/issues/7) (does not return mutable arrays from methods like `map`), purpose-built immutable data structures | `ImmutableArray` | `ReadonlyArray`, [immutable-js](https://github.com/immutable-js/immutable-js/)'s `List` | | `Array` |
| purpose-built immutable data structures | `ImmutableSet` | `ReadonlySet`, immutable-js's `Set` | | `Set` |
| purpose-built immutable data structures | `ImmutableMap` | `ReadonlyMap`, immutable-js's `Map` | | `Map` |
| | `ReadonlyWeakSet` | | | [`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) |
| | `ReadonlyWeakMap` | | | [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) |
| [fp-ts's `Either`](https://gcanti.github.io/fp-ts/modules/Either.ts.html) | `ReadonlyError` (and friends) | | | [`Error` and friends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#error_objects) |
| | `ReadonlyRegExp` | | | `RegExp` |
| [fp-ts's `TaskEither`](https://gcanti.github.io/fp-ts/modules/TaskEither.ts.html), and eventually [Effect](https://www.effect.website/docs/what-is-effect) | `ReadonlyPromise` | `Promise` | | |
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

## `ImmutableArray` and `PrincipledArray`

TypeScript's built-in `ReadonlyArray` isn't truly immutable. Observe:

```typescript
const foo: ReadonlyArray<string> = [""] as const;

// This compiles
foo.every = () => false;
// So does this
foo.at = () => undefined;
```

is-immutable-type provides the answer in [Making ReadonlyDeep types Immutable](https://github.com/RebeccaStevens/is-immutable-type#making-readonlydeep-types-immutable). We've reused that here to provide an `ImmutableArray` type.

```typescript
import { ImmutableArray } from "readonly-types";

const foo: ImmutableArray<string> = [""] as const;

// These no longer compile
foo.every = () => false; // Cannot assign to 'every' because it is a read-only property. ts(2540)
foo.at = () => undefined; // Cannot assign to 'at' because it is a read-only property. ts(2540)
```

`ReadonlyArray` achieves the `ReadonlyDeep` level of immutability, `ImmutableArray` achieves the `Immutable` level.

It turns out that even `ImmutableArray` has cracks in its immutable armour. Here's a subtle one:

```typescript
// This doesn't compile...
foo.at = () => undefined;

foo.map((value, index, array) => {
  // ... but this does!
  array.at = () => undefined;

  return value;
});
```

The `array` passed as the third argument to the `map` callback is typed as `ReadonlyArray`. Our `ImmutableArray` trick doesn't change that method's callback's argument's types. The same applies to `filter`, `flatMap`, `find` and so on.

To fix that issue we provide a type called `PrincipledArray`:

```typescript
const foo: PrincipledArray<string> = [""] as const;

// This doesn't compile...
foo.at = () => undefined;

foo.map((value, index, array) => {
  // ... and neither does this!
  array.at = () => undefined;

  return value;
});
```

`PrincipledArray` makes a few other (type-incompatible) improvements while its at it, including:

* Removes `forEach` entirely (use `map` or another non-side-effecting alternative instead).
* Requires a true boolean return type from predicates passed to `filter` and other methods (by default, TypeScript allows these predicates to return `unknown`).
* Removes the partial versions of `reduce` and `reduceRight` that throw at runtime if the array is empty (i.e. those that don't require the caller to specify an initial value). See also https://github.com/eslint-functional/eslint-plugin-functional/issues/527

```typescript
import { principledArray } from "readonly-types";

// Given a principled array.
const foo = principledArray<string>([]);

// This does not compile.
// Property 'forEach' does not exist on type 'PrincipledArray<string>'. ts(2339)
foo.forEach(() => {});

// This would normally throw at runtime, but with PrincipledArray it does not compile
// Expected 2 arguments, but got 1. ts(2554)
// An argument for 'initialValue' was not provided.
const result = foo.reduce((p) => p);
```

The downside to `PrincipledArray` is that -- precisely because it changes the type in these ways -- you cannot assign it to a value of type `ReadonlyArray`. `ImmutableArray` doesn't have this downside. Choose whichever is most appropriate for you.

## `ImmutableNonEmptyArray` and `PrincipledNonEmptyArray`

An array type that is verifiably non-empty (i.e. known to have at least one entry at compile time) is a useful type to have.

You can make such a type based on `ReadonlyArray` like this:

```typescript
type ReadonlyNonEmptyArray<T> = readonly [T, ...(readonly T[])];
```

Like `ReadonlyArray` that type is only `ReadonlyDeep`, not truly `Immutable`.

We provide a truly immutable version in the form of `ImmutableNonEmptyArray`.

With `PrincipledArray` having removed the versions of `reduce` and `reduceRight` that do not require an `initialValue`, there becomes a need for another type that is verifiably non-empty (at compile time) which puts them back again.

We provide that type in the form of `PrincipledNonEmptyArray`, which you can think of as a mix between `ImmutableNonEmptyArray` and `PrincipledArray`:

```typescript
// Given a principled non-empty array.
const foo = principledNonEmptyArray<string>(["a"]);

// This compiles, whereas it wouldn't have compiled for a regular principled array.
const result = foo.reduce((p) => p);
```

## Array type compatibility

| ⬇️ can be assigned to ➡️ | `Array` | `ReadonlyArray`   | `ImmutableArray`  | `PrincipledArray` | `PrincipledNonEmptyArray` |
|---------------------------|--------|-------------------|-------------------|-------------------|---------------------------|
| `Array`                   | ✅     | ✅ ⚠️             | ✅ ⚠️             | ❌                | ❌ |
| `ReadonlyArray`           | ❌     | ✅                | ✅ ⚠️             | ❌                | ❌ |
| `ImmutableArray`          | ❌     | ✅ ⚠️             | ✅                | ❌                | ❌ |
| `PrincipledArray`         | ❌     | ❌                | ❌                | ✅                | ❌ |
| `PrincipledNonEmptyArray` | ❌     | ❌                | ❌                | ✅                | ✅ |

Assignments marked ⚠️ can lead to surprising mutation in whichever side of the assignment appears to have "more" immutability, via mutations made to the side that has "less". [eslint-plugin-total-functions](https://github.com/danielnixon/eslint-plugin-total-functions/) includes an ESLint rule to flag these unsafe assignments. https://github.com/eslint-functional/eslint-plugin-functional/issues/526 may play a part too. See https://github.com/Microsoft/TypeScript/issues/13347 for more.

## Purpose-built immutable data structures

Types like `ImmutableArray` and `PrincipledArray` (and even the humble built-in `ReadonlyArray`) can help a lot with correctness but the underlying runtime type remains a mutable `Array`. The same goes for our immutable `Set` and `Map` types. In essence the data structures are the same, we're just constraining ourselves to an immutable subset of their mutable APIs.

One consequence of this is that if someone could get their hands on a mutable handle to one of our values, they could edit it as if it were mutable (e.g. via an `as` type assertion or via an `Array.isArray` check). This forces us to put a little asterisk next to any immutability guarantees we make. You might reach for [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) in response to that risk, but that comes with its own issues (performance, compatibility, doesn't show up in the type system, ...).

Another consequence of this is that updating and copying values of these types is needlessly expensive (in terms of compute and memory). A copy of the _entire_ structure must be taken to preserve correctness, even if all we want to do for example is update a single element.

There exist purpose-built immutable data structures that give us an immutable API without the associated performance cost of copying an underlying mutable structure (look for terms like 'structural sharing' and 'copy on write'). If performance is a factor for you, these can be a better choice than the immutable types provided by this package.

To get you started, check out the following:

* https://github.com/immerjs/immer
* https://github.com/immutable-js/immutable-js
* https://github.com/rtfeldman/seamless-immutable

A surprising irony of these types is that they typically aren't truly immutable, for the same reason that `ReadonlyArray` isn't truly immutable. Here's an example:

```typescript
import { Map as ImmutableJsMap } from "immutable";
const foo = ImmutableJsMap([["key", "value"]]);
// This compiles
foo.delete = () => foo;
```

Because `delete` is implemented using method syntax it is necessarily mutable (TypeScript methods defined using method syntax cannot be readonly for "reasons"). This is so common that [is-immutable-type#definitions](https://github.com/RebeccaStevens/is-immutable-type#definitions) defines a level of "readonly-ness" called `ReadonlyDeep` that sits below truly `Immutable` but above the mutable levels `ReadonlyShallow` and `Mutable`.

Depending on how strictly you wish to enforce immutability, `ReadonlyDeep` may or may not be acceptable to you. If it isn't, you can fix it like this:

```typescript
import { Map as ImmutableJsMap } from "immutable";

type TrulyImmutableMap<K, V> = Readonly<ImmutableJsMap<K, V>>;

const foo: TrulyImmutableMap<string, string> = ImmutableJsMap([
  ["key", "value"],
]);

// No longer compiles
foo.delete = () => foo; // Cannot assign to 'delete' because it is a read-only property. ts(2540)
```

See [Making ReadonlyDeep types Immutable](https://github.com/RebeccaStevens/is-immutable-type#making-readonlydeep-types-immutable) for more on this.

## See Also
* https://github.com/danielnixon/eslint-config-typed-fp
* https://github.com/jonaskello/eslint-plugin-functional
* https://github.com/danielnixon/eslint-plugin-total-functions
* https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#readonly-and-const
* To see ReadonlyDate adoption grow, upvote this: https://github.com/date-fns/date-fns/issues/1944
* https://github.com/Microsoft/TypeScript/issues/13347
