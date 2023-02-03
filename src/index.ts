/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-restricted-globals */

import { AnyArray, IsTuple, IsUnknown } from "ts-essentials";

export type DeepImmutable<T> = T extends Date
  ? ReadonlyDate
  : T extends URL
  ? ReadonlyURL
  : T extends URLSearchParams
  ? ReadonlyURLSearchParams
  : // eslint-disable-next-line functional/prefer-readonly-type
  T extends Map<infer K, infer V>
  ? ImmutableMap<DeepImmutable<K>, DeepImmutable<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ImmutableMap<DeepImmutable<K>, DeepImmutable<V>>
  : T extends ImmutableMap<infer K, infer V>
  ? ImmutableMap<DeepImmutable<K>, DeepImmutable<V>>
  : T extends WeakMap<infer K, infer V>
  ? ReadonlyWeakMap<DeepImmutable<K>, DeepImmutable<V>>
  : T extends ReadonlyWeakMap<infer K, infer V>
  ? ReadonlyWeakMap<DeepImmutable<K>, DeepImmutable<V>>
  : // eslint-disable-next-line functional/prefer-readonly-type
  T extends Set<infer U>
  ? ImmutableSet<DeepImmutable<U>>
  : T extends ReadonlySet<infer U>
  ? ImmutableSet<DeepImmutable<U>>
  : T extends ImmutableSet<infer U>
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

export type ReadonlyPromise<T> = Readonly<Promise<T>>;

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
    return undefined;
  }
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
