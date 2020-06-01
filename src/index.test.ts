import { ReadonlyURL, ReadonlyDate, ReadonlyMap, ReadonlyWeakMap } from ".";

// tslint:disable: no-expression-statement no-if-statement

describe("ReadonlyURL", () => {
  it("iterates through URL search params using for..of", () => {
    const url = ReadonlyURL("http://example.com?foo=a&bar=b");

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
    const url = ReadonlyURL("asdf");
    expect(url).toBeUndefined();
  });

  it("doesn't allow mutation via search params", () => {
    const url = ReadonlyURL("http://example.com");
    expect(url).toBeDefined();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    url!.searchParams.append("", "");
  });
});

describe("ReadonlyDate", () => {
  it("doesn't throw on invalid input", () => {
    const date = ReadonlyDate("asdf");
    expect(date.getMilliseconds()).toBeNaN();
  });
});

describe("ReadonlyMap", () => {
  it("allows iteration using for..of", () => {
    const map = ReadonlyMap([
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
    ReadonlyWeakMap([
      [{}, "one"],
      [{}, "two"],
      [{}, "three"],
    ]);
  });
});
