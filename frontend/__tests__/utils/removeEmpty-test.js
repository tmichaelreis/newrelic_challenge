import { removeEmpty } from "../../utils/removeEmpty.js";

describe("removeEmpty", () => {
  it("removes entries with null value", () => {
    const obj = { foo: "bar", baz: null };

    const newObj = removeEmpty(obj);

    expect(Object.keys(newObj)).toContain("foo");
    expect(Object.keys(newObj)).not.toContain("baz");
  });

  it("removes entries with undefined value", () => {
    const obj = { foo: "bar", baz: undefined };

    const newObj = removeEmpty(obj);
    expect(Object.keys(newObj)).toContain("foo");
    expect(Object.keys(newObj)).not.toContain("baz");
  });

  it("removes entries with empty string value", () => {
    const obj = { foo: "bar", baz: "" };

    const newObj = removeEmpty(obj);
    expect(Object.keys(newObj)).toContain("foo");
    expect(Object.keys(newObj)).not.toContain("baz");
  });
});
