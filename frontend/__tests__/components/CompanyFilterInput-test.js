/**
 * @jest-environment jsdom
 */

import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import CompanyFilterInput from "../../components/CompanyFilterInput.js";

describe("CompanyFilterInput", () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  });

  it("includes empty option", () => {
    const input = mount(<CompanyFilterInput companies={[]} />);

    expect(input.find("select").props().value).toEq("");
    expect(input.find("select").props().text).toEq("All Companies");
  });

  it("includes options for all organizations", () => {
    const companies = [
      {
        id: 1,
        name: "New Relic",
      },
      {
        id: 2,
        name: "La Sportiva",
      },
    ];

    const input = mount(<CompanyFilterInput companies={companies} />);

    expect(input.find("select").find("option")).toHaveLength(3);
    expect(input.find("select").find("option").contains("New Relic")).toBe(
      true
    );
    expect(input.find("select").find("option").contains("La Sportiva")).toBe(
      true
    );
  });
});
