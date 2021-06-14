/**
 * @jest-environment jsdom
 */

import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import CustomerResults from "../../components/CustomerResults.js";

describe("CustomerResults", () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  });

  test("renders a prompt if no searching or filtering", () => {
    const results = mount(
      <CustomerResults customers={[]} resultsExpected={false} />
    );

    expect(
      results.contains(
        "Use the search and filter options above to view Customer results."
      )
    ).toBe(true);
  });

  test("renders table headers even with no results", () => {
    const results = mount(
      <CustomerResults customers={[]} resultsExpected={false} />
    );

    expect(results.find("th")).toHaveLength(3);
    expect(results.contains("First Name")).toBe(true);
    expect(results.contains("Last Name")).toBe(true);
    expect(results.contains("Company Name")).toBe(true);
  });

  test("renders an empty results message if no results", () => {
    const results = mount(
      <CustomerResults customers={[]} resultsExpected={true} />
    );

    expect(
      results.contains(
        "No Customers found. Try adjusting your search and filter options."
      )
    ).toBe(true);
  });

  test("renders a list of customers", () => {
    const customers = [
      {
        id: 1,
        firstName: "Tom",
        lastName: "Reis",
        companyName: "New Relic",
      },
      {
        id: 2,
        firstName: "Brooke",
        lastName: "Raboutou",
        companyName: "La Sportiva",
      },
      {
        id: 3,
        firstName: "Adam",
        lastName: "Ondra",
        companyName: "La Sportiva",
      },
    ];

    const results = mount(<CustomerResults customers={customers} />);

    expect(results.find("tbody").find("tr")).toHaveLength(3);
    expect(results.contains("Tom")).toBe(true);
    expect(results.contains("Reis")).toBe(true);
    expect(results.contains("New Relic")).toBe(true);
    expect(results.contains("Brooke")).toBe(true);
    expect(results.contains("Raboutou")).toBe(true);
    expect(results.contains("La Sportiva")).toBe(true);
    expect(results.contains("Adam")).toBe(true);
    expect(results.contains("Ondra")).toBe(true);
  });
});
