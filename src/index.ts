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
