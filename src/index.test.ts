import { ReadonlyURL } from ".";

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
});
