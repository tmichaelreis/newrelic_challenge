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
    expect(typeof result.then).toEqual("function");
  });

  it("fetches customer data", () => {
    const result = getCustomerData(searchArguments);

    result.then((response) => {
      expect(response).toEqual([
        { id: 1, firstName: "Test", lastName: "User" },
      ]);
    });
  });
});
