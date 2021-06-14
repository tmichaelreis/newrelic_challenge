import { getCustomerData } from "../../services/customers.js";

describe("customers API service", () => {
  const searchArguments = { search: "foobar", companyFilter: null };

  beforeAll(() => {
    const mockResponse = JSON.stringify([
      { id: 1, firstName: "Test", lastName: "User" },
    ]);
    fetch.mockResponse(mockResponse);
  });

  it("returns a Promise", () => {
    const result = getCustomerData(searchArguments);
    expect(typeof result).toEqual("Promise");
  });

  it("fetches customer data", () => {
    const result = getCustomerData(searchArguments);
    let data;

    result.then((response) => (data = response));
    expect(data).toEqual({ id: 1, firstName: "Test", lastName: "User" });
  });

  it("is cancellable", () => {
    const result = getCustomerData(searchArguments);
    result.cancel();

    expect(() => {
      result.resolve("test");
    }).toThrow();
  });
});
