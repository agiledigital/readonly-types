export type ReadonlyURLSearchParams = {
  /**
   * Returns the first value associated to the given search parameter.
   */
  readonly get: (name: string) => string | null;
  /**
   * Returns all the values association with a given search parameter.
   */
  readonly getAll: (name: string) => readonly string[];
  /**
   * Returns a Boolean indicating if such a search parameter exists.
   */
  readonly has: (name: string) => boolean;

  readonly [Symbol.iterator]: () => IterableIterator<readonly [string, string]>;
  /**
   * Returns an array of key, value pairs for every entry in the search params.
   */
  readonly entries: () => IterableIterator<readonly [string, string]>;
  /**
   * Returns a list of keys in the search params.
   */
  readonly keys: () => IterableIterator<string>;
  /**
   * Returns a list of values in the search params.
   */
  readonly values: () => IterableIterator<string>;
};

// tslint:disable: max-union-size readonly-array
export const ReadonlyURLSearchParams = (
  init?:
    | readonly string[][]
    | string[][]
    | Record<string, string>
    | string
    | URLSearchParams
    | ReadonlyURLSearchParams
): ReadonlyURLSearchParams =>
  new URLSearchParams(init as
    | string[][]
    | Record<string, string>
    | string
    | URLSearchParams);
// tslint:enable: max-union-size readonly-array

export type ReadonlyURL = {
  readonly hash: string;
  readonly host: string;
  readonly hostname: string;
  readonly href: string;
  readonly origin: string;
  readonly password: string;
  readonly pathname: string;
  readonly port: string;
  readonly protocol: string;
  readonly search: string;
  readonly searchParams: ReadonlyURLSearchParams;
  readonly username: string;
  readonly toJSON: () => string;
};

export const ReadonlyURL = (url: string, base?: string | URL): ReadonlyURL =>
  new URL(url, base);

export type ReadonlyDate = {
  /** Returns a string representation of a date. The format of the string depends on the locale. */
  readonly toString: () => string;
  /** Returns a date as a string value. */
  readonly toDateString: () => string;
  /** Returns a time as a string value. */
  readonly toTimeString: () => string;
  /** Returns a value as a string value appropriate to the host environment's current locale. */
  readonly toLocaleString: () => string;
  /** Returns a date as a string value appropriate to the host environment's current locale. */
  readonly toLocaleDateString: () => string;
  /** Returns a time as a string value appropriate to the host environment's current locale. */
  readonly toLocaleTimeString: () => string;
  /** Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC. */
  readonly valueOf: () => number;
  /** Gets the time value in milliseconds. */
  readonly getTime: () => number;
  /** Gets the year, using local time. */
  readonly getFullYear: () => number;
  /** Gets the year using Universal Coordinated Time (UTC). */
  readonly getUTCFullYear: () => number;
  /** Gets the month, using local time. */
  readonly getMonth: () => number;
  /** Gets the month of a Date object using Universal Coordinated Time (UTC). */
  readonly getUTCMonth: () => number;
  /** Gets the day-of-the-month, using local time. */
  readonly getDate: () => number;
  /** Gets the day-of-the-month, using Universal Coordinated Time (UTC). */
  readonly getUTCDate: () => number;
  /** Gets the day of the week, using local time. */
  readonly getDay: () => number;
  /** Gets the day of the week using Universal Coordinated Time (UTC). */
  readonly getUTCDay: () => number;
  /** Gets the hours in a date, using local time. */
  readonly getHours: () => number;
  /** Gets the hours value in a Date object using Universal Coordinated Time (UTC). */
  readonly getUTCHours: () => number;
  /** Gets the minutes of a Date object, using local time. */
  readonly getMinutes: () => number;
  /** Gets the minutes of a Date object using Universal Coordinated Time (UTC). */
  readonly getUTCMinutes: () => number;
  /** Gets the seconds of a Date object, using local time. */
  readonly getSeconds: () => number;
  /** Gets the seconds of a Date object using Universal Coordinated Time (UTC). */
  readonly getUTCSeconds: () => number;
  /** Gets the milliseconds of a Date, using local time. */
  readonly getMilliseconds: () => number;
  /** Gets the milliseconds of a Date object using Universal Coordinated Time (UTC). */
  readonly getUTCMilliseconds: () => number;
  /** Gets the difference in minutes between the time on the local computer and Universal Coordinated Time (UTC). */
  readonly getTimezoneOffset: () => number;

  /** Returns a date converted to a string using Universal Coordinated Time (UTC). */
  readonly toUTCString: () => string;
  /** Returns a date as a string value in ISO format. */
  readonly toISOString: () => string;

  // tslint:disable: no-any
  /** Used by the JSON.stringify method to enable the transformation of an object's data for JavaScript Object Notation (JSON) serialization. */
  readonly toJSON: (key?: any) => string;
  // tslint:enable: no-any

  // tslint:disable: no-method-signature
  /**
   * Converts a Date object to a string.
   */
  [Symbol.toPrimitive](hint: "default" | "string"): string;
  /**
   * Converts a Date object to a number.
   */
  [Symbol.toPrimitive](hint: "number"): number;
  /**
   * Converts a Date object to a string or number.
   *
   * @param hint The strings "number", "string", or "default" to specify what primitive to return.
   *
   * @throws {TypeError} If 'hint' was given something other than "number", "string", or "default".
   * @returns A number if 'hint' was "number", a string if 'hint' was "string" or "default".
   */
  [Symbol.toPrimitive](hint: string): string | number;
  // tslint:enable: no-method-signature
};

export const ReadonlyDate = (
  // tslint:disable-next-line: max-union-size
  value: number | string | Date | ReadonlyDate
): ReadonlyDate => new Date(value as number | string | Date);

export interface ReadonlyWeakKeyedCollection<K> {
  /** Returns a boolean indicating whether an element with the specified value exists in the collection  */
  readonly has: (key: K) => boolean;
}

export interface ReadonlyWeakSet<T> extends ReadonlyWeakKeyedCollection<T> {}

export interface ReadonlyWeakMap<K extends object, V>
  extends ReadonlyWeakKeyedCollection<K> {
  /** Returns the value associated to the key, or undefined if there is none. */
  readonly get: (key: K) => V | undefined;
}

export const ReadonlySet = <T>(values: Iterable<T>): ReadonlySet<T> =>
  new Set(values);
export const ReadonlyWeakSet = <T extends object>(
  values: Iterable<T>
): ReadonlyWeakSet<T> => new WeakSet(values);

export const ReadonlyMap = <K, V>(
  values: Iterable<readonly [K, V]>
): ReadonlyMap<K, V> => new Map(values);
export const ReadonlyWeakMap = <K extends object, V>(
  // tslint:disable-next-line: readonly-array
  values: Iterable<[K, V]>
): ReadonlyWeakMap<K, V> => new WeakMap(values);
