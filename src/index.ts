export type ReadonlyPartial<T> = Readonly<Partial<T>>;

export type ReadonlyRequired<T> = Readonly<Required<T>>;

export type ReadonlyPick<T, K extends keyof T> = Readonly<Pick<T, K>>;

export type ReadonlyRecord<K extends string | number | symbol, T> = Readonly<
  Record<K, T>
>;

export type ReadonlyURLSearchParams = Readonly<
  Omit<URLSearchParams, "append" | "delete" | "set" | "sort">
> & {
  // TODO why doesn't is this included in the above type?
  [Symbol.iterator](): IterableIterator<readonly [string, string]>;
};

export const ReadonlyURLSearchParams = (
  init?:
    | readonly string[][]
    | string[][]
    | Record<string, string>
    | string
    | URLSearchParams
    | ReadonlyURLSearchParams
): ReadonlyURLSearchParams =>
  new URLSearchParams(
    init as string[][] | Record<string, string> | string | URLSearchParams
  );

export type ReadonlyURL = Readonly<Omit<URL, "searchParams">> & {
  searchParams: ReadonlyURLSearchParams;
};

export const ReadonlyURL = (
  url: string,
  base?: string | URL | ReadonlyURL
): ReadonlyURL | undefined => {
  try {
    return new URL(url, base as string | URL);
  } catch {
    return undefined;
  }
};

export type ReadonlyDate = Readonly<
  Omit<
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

export const ReadonlyDate = (
  value: number | string | Date | ReadonlyDate
): ReadonlyDate => new Date(value as number | string | Date);

// eslint-disable-next-line @typescript-eslint/ban-types
export type ReadonlyWeakSet<T extends object> = Readonly<
  Omit<WeakSet<T>, "add" | "delete">
>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ReadonlyWeakMap<K extends object, V> = Readonly<
  Omit<WeakMap<K, V>, "delete" | "set">
>;

export const ReadonlySet = <T>(values: Iterable<T>): ReadonlySet<T> =>
  new Set(values);

// eslint-disable-next-line @typescript-eslint/ban-types
export const ReadonlyWeakSet = <T extends object>(
  values: Iterable<T>
): ReadonlyWeakSet<T> => new WeakSet(values);

export const ReadonlyMap = <K, V>(
  values: Iterable<readonly [K, V]>
): ReadonlyMap<K, V> => new Map(values);

// eslint-disable-next-line @typescript-eslint/ban-types
export const ReadonlyWeakMap = <K extends object, V>(
  values: Iterable<[K, V]>
): ReadonlyWeakMap<K, V> => new WeakMap(values);
