import React from "react";
import { shallow } from "enzyme";
import CustomerResults from "../../components/CustomerResults.js";

test("CustomerResults renders a prompt if no searching or filtering", () => {
  const results = shallow(
    <CustomerResults customers={[]} resultsExpected={false} />
  );

  expect(results.find("tbody").text()).toEqual(
    "Use the search and filter options above to view Customer results."
  );
});

test("CustomerResults renders table headers even with no results", () => {
  const results = shallow(
    <CustomerResults customers={[]} resultsExpected={false} />
  );

  expect(results.find("th")).toHaveLength(3);
  expect(results.text().includes("First Name")).toBe(true);
  expect(results.text().includes("Last Name")).toBe(true);
  expect(results.text().includes("Company Name")).toBe(true);
});

test("CustomerResults renders an empty results message if no results", () => {
  const results = shallow(
    <CustomerResults customers={[]} resultsExpected={true} />
  );

  expect(results.find("tbody").text()).toEqual(
    "No Customers found. Try adjusting your search and filter options."
  );
});

test("CustomerResults renders a list of customers", () => {
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

  const results = shallow(<CustomerResults customers={customers} />);

  expect(results.contains(<td>Tom</td>)).toBe(true);
  expect(results.contains(<td>Reis</td>)).toBe(true);
  expect(results.contains(<td>New Relic</td>)).toBe(true);
  expect(results.contains(<td>Brooke</td>)).toBe(true);
  expect(results.contains(<td>Raboutou</td>)).toBe(true);
  expect(results.contains(<td>La Sportiva</td>)).toBe(true);
});
