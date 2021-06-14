import { getCustomerData } from "../../services/customers.js";

describe("customers API service", () => {
  beforeAll(() => {
    const mockResponse = JSON.stringify([
      { id: 1, firstName: "Test", lastName: "User" },
    ]);
    fetch.mockResponse(mockResponse);
  });

  it("returns a Promise", () => {
    const result = getCustomerData({ search: "foobar", companyFilter: null });
    expect(typeof result.then).toEqual("function");
  });

  it("fetches customer data", () => {
    const result = getCustomerData({ search: "foobar", companyFilter: null });

    result.then((response) => {
      expect(response).toEqual([
        { id: 1, firstName: "Test", lastName: "User" },
      ]);
    });
  });

  it("calls customers API with search only", () => {
    fetch.resetMocks();
    const result = getCustomerData({ search: "foobar" });

    result.then();

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("/api/customers?search=foobar");
  });

  it("calls customers API with filter only", () => {
    fetch.resetMocks();
    const result = getCustomerData({ companyFilter: 1 });

    result.then();

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("/api/customers?company_id=1");
  });

  it("calls customers API with both search and filter", () => {
    fetch.resetMocks();
    const result = getCustomerData({ search: "foobar", companyFilter: 1 });

    result.then();

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      "/api/customers?search=foobar&company_id=1"
    );
  });
});
