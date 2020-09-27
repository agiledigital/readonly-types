/* eslint-disable jest/no-conditional-expect */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-expression-statement */

import {
  readonlyURL,
  readonlyDate,
  readonlyMap,
  readonlyWeakMap,
  validReadonlyDate,
} from ".";

describe("ReadonlyURL", () => {
  it("iterates through URL search params using for..of", () => {
    const url = readonlyURL("http://example.com?foo=a&bar=b");

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const p of url!.searchParams) {
      const [k, v] = p;
      if (k === "foo") {
        expect(v).toEqual("a");
      } else {
        expect(k).toEqual("bar");
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    url!.searchParams.append("", "");
  });
});

describe("ReadonlyDate", () => {
  it("doesn't throw on invalid input", () => {
    const date = readonlyDate("asdf");
    expect(date.getMilliseconds()).toBeNaN();
  });
});

describe("ValidReadonlyDate", () => {
  it("returns undefined on invalid input", () => {
    const date = validReadonlyDate("asdf");
    expect(date).toBeUndefined();
  });

  it("returns a date for valid input", () => {
    // eslint-disable-next-line no-restricted-globals
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

    for (const [k, v] of map) {
      expect(k).toBeTruthy();
      expect(v).toBeTruthy();
    }
  });
});

describe("ReadonlyWeakMap", () => {
  it("doesn't throw", () => {
    readonlyWeakMap([
      [{}, "one"],
      [{}, "two"],
      [{}, "three"],
    ]);
  });
});
