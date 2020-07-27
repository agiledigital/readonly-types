export type ReadonlyPartial<T> = Readonly<Partial<T>>;

export type ReadonlyRequired<T> = Readonly<Required<T>>;

export type ReadonlyPick<T, K extends keyof T> = Readonly<Pick<T, K>>;

export type ReadonlyRecord<K extends string | number | symbol, T> = Readonly<
  Record<K, T>
>;

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
  OmitStrict<URLSearchParams, "append" | "delete" | "set" | "sort">
> & {
  // TODO why isn't this included in the above type?
  readonly [Symbol.iterator]: () => IterableIterator<readonly [string, string]>;
};

export const readonlyURLSearchParams = (
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
    // eslint-disable-next-line functional/prefer-readonly-type, total-functions/no-unsafe-type-assertion
    init as string[][] | Record<string, string> | string | URLSearchParams
  );

export type ReadonlyURL = Readonly<OmitStrict<URL, "searchParams">> & {
  readonly searchParams: ReadonlyURLSearchParams;
};

export const readonlyURL = (
  url: string,
  base?: string | URL | ReadonlyURL
): ReadonlyURL | undefined => {
  // eslint-disable-next-line functional/no-try-statement
  try {
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
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
  value: number | string | Date | ReadonlyDate
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
): ReadonlyDate => new Date(value as number | string | Date);

export const validReadonlyDate = (
  value: number | string | Date | ReadonlyDate
): ReadonlyDate | undefined => {
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  const d = new Date(value as number | string | Date);
  return isNaN(d.getMilliseconds()) ? undefined : d;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ReadonlyWeakSet<T extends object> = Readonly<
  OmitStrict<WeakSet<T>, "add" | "delete">
>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ReadonlyWeakMap<K extends object, V> = Readonly<
  OmitStrict<WeakMap<K, V>, "delete" | "set">
>;

export const readonlySet = <T>(values: Iterable<T>): ReadonlySet<T> =>
  new Set(values);

// eslint-disable-next-line @typescript-eslint/ban-types
export const readonlyWeakSet = <T extends object>(
  values: Iterable<T>
): ReadonlyWeakSet<T> => new WeakSet(values);

export const readonlyMap = <K, V>(
  values: Iterable<readonly [K, V]>
): ReadonlyMap<K, V> => new Map(values);

// eslint-disable-next-line @typescript-eslint/ban-types
export const readonlyWeakMap = <K extends object, V>(
  values: Iterable<readonly [K, V]>
  // eslint-disable-next-line functional/prefer-readonly-type, total-functions/no-unsafe-type-assertion
): ReadonlyWeakMap<K, V> => new WeakMap(values as Iterable<[K, V]>);
