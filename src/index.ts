/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-restricted-globals */

import { IsTuple, IsUnknown } from "ts-essentials";

/**
 * as per DeepReadonly from ts-essentials but additionally accounts for the readonly/immutable types from this package.
 */
export type DeepImmutable<T> = T extends Date
  ? ReadonlyDate
  : T extends URL
  ? ReadonlyURL
  : T extends URLSearchParams
  ? ReadonlyURLSearchParams
  : T extends AnyMap<infer K, infer V>
  ? ImmutableMap<DeepImmutable<K>, DeepImmutable<V>>
  : T extends WeakMap<infer K, infer V>
  ? ReadonlyWeakMap<DeepImmutable<K>, DeepImmutable<V>>
  : T extends ReadonlyWeakMap<infer K, infer V>
  ? ReadonlyWeakMap<DeepImmutable<K>, DeepImmutable<V>>
  : T extends AnySet<infer U>
  ? ImmutableSet<DeepImmutable<U>>
  : T extends WeakSet<infer U>
  ? ReadonlyWeakSet<DeepImmutable<U>>
  : T extends ReadonlyWeakSet<infer U>
  ? ReadonlyWeakSet<DeepImmutable<U>>
  : T extends Promise<infer U>
  ? ReadonlyPromise<DeepImmutable<U>>
  : T extends AnyArray<infer U>
  ? T extends IsTuple<T>
    ? { readonly [K in keyof T]: DeepImmutable<T[K]> }
    : ImmutableArray<DeepImmutable<U>>
  : T extends {}
  ? { readonly [K in keyof T]: DeepImmutable<T[K]> }
  : IsUnknown<T> extends true
  ? unknown
  : Readonly<T>;

export type ReadonlyPartial<T> = Readonly<Partial<T>>;

export type ReadonlyRequired<T> = Readonly<Required<T>>;

export type ReadonlyPick<T, K extends keyof T> = Readonly<Pick<T, K>>;

export type ReadonlyRecord<K extends string | number | symbol, T> = Readonly<
  Record<K, T>
>;

// From https://github.com/RebeccaStevens/is-immutable-type/#making-readonlydeep-types-immutable (what am amazing lib)
export type ImmutableShallow<T extends {}> = {
  readonly [P in keyof T & {}]: T[P];
};

// https://github.com/agiledigital/readonly-types/issues/518
export type ImmutableArray<T> = ImmutableShallow<ReadonlyArray<T>>;

export type ImmutableNonEmptyArray<T> = ImmutableShallow<
  readonly [T, ...(readonly T[])]
>;

export type ReadonlyPromise<T> = Readonly<Promise<T>>;

/**
 * as per AnyArray from ts-essentials but includes our PrincipledArray and ImmutableArray types as well.
 */
export type AnyArray<T> =
  | PrincipledArray<T>
  | ImmutableArray<T>
  | ReadonlyArray<T>
  // eslint-disable-next-line functional/prefer-readonly-type
  | Array<T>;

// eslint-disable-next-line functional/prefer-readonly-type
export type AnyMap<K, V> = Map<K, V> | ReadonlyMap<K, V> | ImmutableMap<K, V>;

// eslint-disable-next-line functional/prefer-readonly-type, functional/type-declaration-immutability
export type AnySet<T> = Set<T> | ReadonlySet<T> | ImmutableSet<T>;

/**
 * Recursive machinery to implement PrincipledArray's flat method. Copied from TypeScript standard lib
 * with necessary changes to accommodate our array types.
 */
type FlatArray<Arr, Depth extends number> = {
  readonly done: Arr;
  readonly recur: Arr extends AnyArray<infer InnerArr>
    ? FlatArray<
        InnerArr,
        // eslint-disable-next-line functional/prefer-readonly-type
        [
          -1,
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ][Depth]
      >
    : Arr;
}[Depth extends -1 ? "done" : "recur"];

/**
 * Concat machinery, copied from TypeScript standard lib
 * with necessary changes to accommodate our array types.
 */
export type ConcatArray<T> = {
  readonly length: number;
  readonly [n: number]: T;
  readonly join: (separator?: string) => string;
  readonly slice: (
    start?: number,
    end?: number
  ) => PrincipledArray<T> | ImmutableArray<T>;
};

/**
 * A principled immutable array type.
 * @see https://github.com/agiledigital/readonly-types/issues/518
 */
export type PrincipledArray<T> = ImmutableShallow<
  OmitStrict<
    ImmutableArray<T>,
    | "map"
    | "filter"
    | "forEach"
    | "flatMap"
    | "flat"
    | "concat"
    | "slice"
    | "every"
    | "some"
    | "find"
    | "findIndex"
    | "reduce"
    | "reduceRight"
  >
> & {
  readonly map: <U, This = undefined>(
    callback: (value: T, index: number, array: PrincipledArray<T>) => U,
    thisArg?: This
  ) => PrincipledArray<U>;

  readonly filter: <S extends T = T, This = undefined>(
    predicate:
      | ((value: T, index: number, array: PrincipledArray<T>) => value is S)
      | ((value: T, index: number, array: PrincipledArray<T>) => boolean),
    thisArg?: This
  ) => PrincipledArray<S>;

  readonly find: <S extends T = T, This = undefined>(
    predicate:
      | ((value: T, index: number, obj: PrincipledArray<T>) => value is S)
      | ((value: T, index: number, obj: PrincipledArray<T>) => boolean),
    thisArg?: This
  ) => S | undefined;

  readonly findIndex: <This = undefined>(
    predicate: (value: T, index: number, obj: PrincipledArray<T>) => boolean,
    thisArg?: This
  ) => number;

  readonly flatMap: <U, This = undefined>(
    callback: (
      value: T,
      index: number,
      array: PrincipledArray<T>
    ) => U | PrincipledArray<U> | ImmutableArray<U>,
    thisArg?: This
  ) => PrincipledArray<U>;

  readonly flat: <A, D extends number = 1>(
    this: A,
    depth?: D
  ) => PrincipledArray<FlatArray<A, D>>;

  readonly concat: (
    // eslint-disable-next-line functional/prefer-immutable-types
    ...items: readonly (T | ConcatArray<T>)[]
  ) => PrincipledArray<T>;

  readonly slice: (start?: number, end?: number) => PrincipledArray<T>;

  readonly every: <This = undefined>(
    predicate: (value: T, index: number, array: PrincipledArray<T>) => boolean,
    thisArg?: This
  ) => boolean;

  readonly some: <This = undefined>(
    predicate: (value: T, index: number, array: PrincipledArray<T>) => boolean,
    thisArg?: This
  ) => boolean;

  readonly reduce: <U = T>(
    callback: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: PrincipledArray<T>
    ) => U,
    initialValue: U
  ) => U;

  readonly reduceRight: <U = T>(
    callback: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: PrincipledArray<T>
    ) => U,
    initialValue: U
  ) => U;
};

/**
 * Mixes `NonEmptyImmutableArray<T>` into our standard PrincipledArray<T> to
 * prove to the compiler that it has a head element. This allows us to make
 * `initialValue` optional in `reduce` and `reduceRight` without risk of runtime errors.
 */
export type PrincipledNonEmptyArray<T> = ImmutableShallow<
  OmitStrict<
    ImmutableNonEmptyArray<T> & PrincipledArray<T>,
    "reduce" | "reduceRight"
  >
> & {
  readonly reduce: <U = T>(
    callback: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: PrincipledNonEmptyArray<T>
    ) => U,
    initialValue?: U | undefined
  ) => U;

  readonly reduceRight: <U = T>(
    callback: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: PrincipledNonEmptyArray<T>
    ) => U,
    initialValue?: U | undefined
  ) => U;
};

/**
 * Copies the provided immutable array and returns the result as a principled array.
 */
export const principledArray = <T>(
  immutableArray: ImmutableArray<T>
): PrincipledArray<T> => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return [...immutableArray] as PrincipledArray<T>;
};

export const principledNonEmptyArray = <T>(
  immutableArray: ImmutableNonEmptyArray<T>
): PrincipledNonEmptyArray<T> => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return [...immutableArray] as unknown as PrincipledNonEmptyArray<T>;
};

// Methods are technically mutable in TypeScript. There is no way to use method syntax and retain immutability. (OO strikes again)
// Annoyingly, this includes methods on the built-in ReadonlySet type.
//
// eslint-plugin-functional, with its prefer-immutable-types rule, draws a distinction between (truly) `Immutable` types and those
// types that would be fully immutable if not for pesky methods (which it calls `ReadonlyDeep`).
// This is a useful distinction for practical reasons, so we reuse it here to create a (truly) ImmutableSet as distinct
// from the (flawed) built-in ReadonlySet.
//
// The Readonly<T> type takes care of mutable methods for us, replacing them with readonly function properties.
//
// For example, the mutable method `has`:
//
// ```
//   has(value: T): boolean;
// ```
//
// becomes a readonly property:
//
// ```
//   readonly has: (value: T) => boolean;
// ```
//
// Note that this compiles:
// ```
//  export const foo = (set: ReadonlySet<string>): void => {
//   set.has = () => true; // YOLO
//  };
// ```
//
// But this doesn't:
// ```
//  export const foo = (set: ImmutableSet<string>): void => {
//   set.has = () => true; // doesn't compile
//  };
// ```
//
// TODO: Suggest a prefer-immutable-types fixer from ReadonlySet to ImmutableSet.
//
// @see https://github.com/eslint-functional/eslint-plugin-functional/blob/main/docs/rules/prefer-immutable-types.md#enforcement
export type ImmutableSet<T> = Readonly<ReadonlySet<T>>;

// As above.
export type ImmutableMap<K, V> = Readonly<ReadonlyMap<K, V>>;

/**
 * Drop keys `K` from `T`, where `K` must exist in `T`.
 *
 * @see https://github.com/pelotom/type-zoo
 * @see https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
 */
export type OmitStrict<T, K extends keyof T> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never;

export type ReadonlyURLSearchParams = Readonly<
  OmitStrict<URLSearchParams, "append" | "delete" | "set" | "sort" | "forEach">
>;

export const readonlyURLSearchParams = (
  // eslint-disable-next-line functional/prefer-immutable-types
  init?:
    | readonly (readonly string[])[]
    // eslint-disable-next-line functional/prefer-readonly-type
    | string[][]
    | Record<string, string>
    | string
    | URLSearchParams
    | ReadonlyURLSearchParams
): ReadonlyURLSearchParams =>
  new URLSearchParams(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/prefer-readonly-type
    init as string[][] | Record<string, string> | string | URLSearchParams
  );

export type ReadonlyURL = Readonly<OmitStrict<URL, "searchParams">> & {
  readonly searchParams: ReadonlyURLSearchParams;
};

export const readonlyURL = (
  url: string,
  // eslint-disable-next-line functional/prefer-immutable-types
  base?: string | URL | ReadonlyURL
): ReadonlyURL | undefined => {
  // eslint-disable-next-line functional/no-try-statements
  try {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return new URL(url, base as string | URL);
  } catch {
    /* returning undefined below results in a better mutation score */
  }
  return undefined;
};

export type ReadonlyDate = Readonly<
  OmitStrict<
    Date,
    | "setTime"
    | "setMilliseconds"
    | "setUTCMilliseconds"
    | "setSeconds"
    | "setUTCSeconds"
    | "setMinutes"
    | "setUTCMinutes"
    | "setHours"
    | "setUTCHours"
    | "setDate"
    | "setUTCDate"
    | "setMonth"
    | "setUTCMonth"
    | "setFullYear"
    | "setUTCFullYear"
  >
>;

export const readonlyDate = (
  // eslint-disable-next-line functional/prefer-immutable-types
  value: number | string | Date | ReadonlyDate
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
): ReadonlyDate => new Date(value as number | string | Date);

export const validReadonlyDate = (
  // eslint-disable-next-line functional/prefer-immutable-types
  value: number | string | Date | ReadonlyDate
): ReadonlyDate | undefined => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const d: ReadonlyDate = new Date(value as number | string | Date);
  return isNaN(d.getMilliseconds()) ? undefined : d;
};

// eslint-disable-next-line functional/functional-parameters
export const readonlyNow: () => number = () => Date.now();

export type ReadonlyWeakSet<T extends object> = Readonly<
  OmitStrict<WeakSet<T>, "add" | "delete">
>;

export type ReadonlyWeakMap<K extends object, V> = Readonly<
  OmitStrict<WeakMap<K, V>, "delete" | "set">
>;

// eslint-disable-next-line functional/prefer-immutable-types
export const readonlySet = <T>(values: Iterable<T>): ImmutableSet<T> =>
  new Set(values);

export const readonlyWeakSet = <T extends object>(
  // eslint-disable-next-line functional/prefer-immutable-types
  values: Iterable<T>
): ReadonlyWeakSet<T> => new WeakSet(values);

export const readonlyMap = <K, V>(
  // eslint-disable-next-line functional/prefer-immutable-types
  values: Iterable<readonly [K, V]>
): ImmutableMap<K, V> => new Map(values);

export const readonlyWeakMap = <K extends object, V>(
  // eslint-disable-next-line functional/prefer-immutable-types
  values: Iterable<readonly [K, V]>
): ReadonlyWeakMap<K, V> => new WeakMap(values);

export type ReadonlyError = Readonly<Error>;
export type ReadonlyEvalError = Readonly<EvalError>;
export type ReadonlyRangeError = Readonly<RangeError>;
export type ReadonlyReferenceError = Readonly<ReferenceError>;
export type ReadonlySyntaxError = Readonly<SyntaxError>;
export type ReadonlyTypeError = Readonly<TypeError>;
export type ReadonlyURIError = Readonly<URIError>;
// TODO AggregateError

export type ReadonlyRegExp = Readonly<RegExp>;
