import { ReadonlyURL } from ".";

// tslint:disable: no-expression-statement no-if-statement

it("iterates through URL search params using for..of", () => {
  const url = ReadonlyURL("http://example.com?foo=a&bar=b");

  // tslint:disable-next-line: no-loop-statement
  for (const p of url.searchParams) {
    const [k, v] = p;
    if (k === "foo") {
      expect(v).toEqual("a");
    } else {
      expect(k).toEqual("bar");
      expect(v).toEqual("b");
    }
  }
});
