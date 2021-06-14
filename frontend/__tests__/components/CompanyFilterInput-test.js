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
    const input = mount(
      <CompanyFilterInput companies={[]} selectedCompany={""} />
    );

    expect(input.find("input").props().value).toEqual("");
    expect(input.text()).toEqual("All Companies");
  });
});
