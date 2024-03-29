/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  readonlyURL,
  readonlyDate,
  readonlyNow,
  readonlyMap,
  readonlyWeakMap,
  validReadonlyDate,
  readonlyURLSearchParams,
  readonlySet,
  readonlyWeakSet,
  principledArray,
  PrincipledArray,
  ReadonlyPromise,
  principledNonEmptyArray,
  PrincipledNonEmptyArray,
} from ".";

describe("ReadonlyURL", () => {
  it("iterates through URL search params using for..of", () => {
    const url = readonlyURL("http://example.com?foo=a&bar=b");

    if (url === undefined) {
      throw new Error("url was undefined");
    }

    // eslint-disable-next-line functional/no-loop-statements
    for (const [k, v] of url.searchParams) {
      if (k === "foo") {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(v).toEqual("a");
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(k).toEqual("bar");
        // eslint-disable-next-line jest/no-conditional-expect
        expect(v).toEqual("b");
      }
    }
  });

  it("doesn't throw on invalid input", () => {
    const url = readonlyURL("asdf");
    expect(url).toBeUndefined();
  });

  it("doesn't allow mutation via search params", () => {
    const url = readonlyURL("http://example.com");
    expect(url).toBeDefined();

    if (url === undefined) {
      throw new Error("url was undefined");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    url.searchParams.append("", "");
  });
});

describe("ReadonlyURLSearchParams", () => {
  // eslint-disable-next-line sonarjs/no-duplicate-string
  it("doesn't throw", () => {
    const x = readonlyURLSearchParams("");
    expect(x).toBeDefined();
  });

  // eslint-disable-next-line sonarjs/no-duplicate-string
  it("allows iteration using for..of", () => {
    const params = readonlyURLSearchParams({ a: "b" });

    expect(params[Symbol.iterator]).toBeDefined();

    // eslint-disable-next-line functional/no-loop-statements
    for (const [k, v] of params) {
      expect(k).toBe("a");
      expect(v).toBe("b");
    }

    /* eslint-disable functional/immutable-data, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/consistent-type-assertions, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any */
    // @ts-expect-error
    params[Symbol.iterator] = null as any;
    /* eslint-enable functional/immutable-data, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/consistent-type-assertions, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any */
  });

  // eslint-disable-next-line jest/expect-expect
  it("does not expose forEach", () => {
    const params = readonlyURLSearchParams({ a: "b" });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    params.forEach(() => {});
  });
});

describe("ReadonlyDate", () => {
  it("doesn't throw on invalid input", () => {
    const date = readonlyDate("asdf");
    expect(date.getMilliseconds()).toBeNaN();
  });

  it("doesn't throw when getting current date (now)", () => {
    const date = readonlyDate(readonlyNow());
    expect(date.getMilliseconds()).toBeGreaterThan(0);
  });
});

describe("ValidReadonlyDate", () => {
  it("returns undefined on invalid input", () => {
    const date = validReadonlyDate("asdf");
    expect(date).toBeUndefined();
  });

  it("returns a date for valid input", () => {
    const date = validReadonlyDate(Date.now());
    expect(date).toBeDefined();
  });
});

describe("ReadonlyMap", () => {
  it("allows iteration using for..of", () => {
    const map = readonlyMap([
      [1, "one"],
      [2, "two"],
      [3, "three"],
    ]);

    // eslint-disable-next-line functional/no-loop-statements
    for (const [k, v] of map) {
      expect(k).toBeTruthy();
      expect(v).toBeTruthy();
    }
  });
});

describe("ReadonlyWeakMap", () => {
  it("doesn't throw", () => {
    const map = readonlyWeakMap([
      [{}, "one"],
      [{}, "two"],
      [{}, "three"],
    ]);

    expect(map).toBeDefined();
  });
});

describe("ReadonlySet", () => {
  it("allows iteration using for..of", () => {
    const set = readonlySet([
      [1, "one"],
      [2, "two"],
      [3, "three"],
    ]);

    // eslint-disable-next-line functional/no-loop-statements
    for (const [k, v] of set) {
      expect(k).toBeTruthy();
      expect(v).toBeTruthy();
    }
  });
});

describe("ReadonlyWeakSet", () => {
  it("doesn't throw", () => {
    const set = readonlyWeakSet([
      [{}, "one"],
      [{}, "two"],
      [{}, "three"],
    ]);

    expect(set).toBeDefined();
  });
});

describe("ReadonlyPromise", () => {
  it("can be awaited", async () => {
    const p: ReadonlyPromise<string> = Promise.resolve("a");
    const result = await p;
    expect(result).toStrictEqual("a");
    return undefined;
  });
});

describe("PrincipledArray", () => {
  it("can be mapped", () => {
    const foo = principledArray(["a"]);

    expect(
      foo.map((s, _i, _array: PrincipledArray<string>) => s.toUpperCase()),
    ).toStrictEqual(["A"]);
  });

  it("can be flatMapped", () => {
    const foo = principledArray(["a"]);

    expect(
      foo.flatMap((s, _i, _array: PrincipledArray<string>) =>
        principledArray([s.toUpperCase()]),
      ),
    ).toStrictEqual(["A"]);
  });

  it("can be flattened", () => {
    const foo = principledArray([
      principledArray(["a"]),
      principledArray(["b"]),
    ]);

    const flattened: PrincipledArray<string> = foo.flat();

    expect(flattened).toStrictEqual(["a", "b"]);
  });

  it("can be flattened when nested level is regular array", () => {
    const foo = principledArray([["a"], ["b"]]);

    const flattened: PrincipledArray<string> = foo.flat();

    expect(flattened).toStrictEqual(["a", "b"]);
  });

  it("can be flattened when nested level is mixed", () => {
    const foo = principledArray([["a"], principledArray(["b"]), "c"]);

    const flattened: PrincipledArray<string> = foo.flat();

    expect(flattened).toStrictEqual(["a", "b", "c"]);
  });

  it("can be filtered with a boolean predicate", () => {
    const foo = principledArray(["a", "b"]);

    expect(
      foo.filter((s, _index, _array: PrincipledArray<string>) => s !== "b"),
    ).toStrictEqual(["a"]);
  });

  it("can be filtered with a type guard predicate", () => {
    const foo = principledArray(["a", "b"]);

    const isLetterA = (s: string): s is "a" => s === "a";

    const aArray: PrincipledArray<"a"> = foo.filter(isLetterA);

    expect(aArray).toStrictEqual(["a"]);
  });

  it("can use find with a boolean predicate", () => {
    const foo = principledArray(["a", "b"]);

    expect(
      foo.find((s, _index, _array: PrincipledArray<string>) => s !== "b"),
    ).toStrictEqual("a");
  });

  it("can use find with a type guard predicate", () => {
    const foo = principledArray(["a", "b"]);

    const isLetterA = (s: string): s is "a" => s === "a";

    const result: "a" | undefined = foo.find(isLetterA);

    expect(result).toStrictEqual("a");
  });

  it("can use findIndex", () => {
    const foo = principledArray(["a", "b"]);

    expect(
      foo.findIndex((s, _index, _array: PrincipledArray<string>) => s !== "b"),
    ).toStrictEqual(0);
  });

  // eslint-disable-next-line jest/expect-expect
  it("does not expose forEach", () => {
    const foo = principledArray(["a", "b"]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    foo.forEach(() => {});
  });

  it("can be concatenated with a single value", () => {
    const foo = principledArray(["a"]);

    const bar: PrincipledArray<string> = foo.concat("b");

    expect(bar).toStrictEqual(["a", "b"]);
  });

  it("can be concatenated with another array", () => {
    const foo = principledArray(["a"]);

    const bar: PrincipledArray<string> = foo.concat(["b"]);

    expect(bar).toStrictEqual(["a", "b"]);
  });

  it("can be concatenated with a spread array", () => {
    const foo = principledArray(["a"]);

    const bar: PrincipledArray<string> = foo.concat(...["b"]);

    expect(bar).toStrictEqual(["a", "b"]);
  });

  it("can be concatenated with a principled array", () => {
    const foo = principledArray(["a"]);

    const bar: PrincipledArray<string> = foo.concat(principledArray(["b"]));

    expect(bar).toStrictEqual(["a", "b"]);
  });

  it("can be sliced", () => {
    const foo = principledArray(["a"]);

    const bar = foo.slice(0, 1);

    expect(bar).toStrictEqual(["a"]);
  });

  it("can use every", () => {
    const foo = principledArray(["a"]);

    const bar = foo.every((s, _index, _array: PrincipledArray<string>) => {
      return s === "a";
    });

    expect(bar).toBe(true);
  });

  it("can use some", () => {
    const foo = principledArray(["a"]);

    const bar = foo.some((s, _index, _array: PrincipledArray<string>) => {
      return s === "a";
    });

    expect(bar).toBe(true);
  });

  it("can use reduce", () => {
    const foo = principledArray(["a", "b"]);

    const bar = foo.reduce(
      (p, c, _index, _array: PrincipledArray<string>) => `${p}${c}`,
      "",
    );

    expect(bar).toBe("ab");
  });

  it("can use reduceRight", () => {
    const foo = principledArray(["a", "b"]);

    const bar = foo.reduceRight(
      (p, c, _index, _array: PrincipledArray<string>) => `${p}${c}`,
      "",
    );

    expect(bar).toBe("ba");
  });

  it("cannot use reduce to cause a runtime error with an empty array", () => {
    const foo = principledArray<string>([]);

    const unsafe = () =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      foo.reduce((_p, c, _index, _array: PrincipledArray<string>) => c);

    expect(unsafe).toThrow();
  });

  it("cannot use reduceRight to cause a runtime error with an empty array", () => {
    const foo = principledArray<string>([]);

    const unsafe = () =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      foo.reduceRight((_p, c, _index, _array: PrincipledArray<string>) => c);

    expect(unsafe).toThrow();
  });

  it("can use reduce without an initialValue if verifiably nonempty", () => {
    const foo = principledNonEmptyArray<string>(["a"]);

    const head: string = foo[0];
    expect(head).toStrictEqual("a");

    expect(
      foo.reduce((_p, c, _index, _array: PrincipledArray<string>) => c),
    ).toStrictEqual("a");
  });

  it("can use reduceRight without an initialValue if verifiably nonempty", () => {
    const foo = principledNonEmptyArray<string>(["a"]);

    const head: string = foo[0];
    expect(head).toStrictEqual("a");

    expect(
      foo.reduceRight(
        (_p, c, _index, _array: PrincipledNonEmptyArray<string>) => c,
      ),
    ).toStrictEqual("a");
  });
});
