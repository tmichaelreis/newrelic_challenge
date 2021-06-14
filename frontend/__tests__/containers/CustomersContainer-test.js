/**
 * @jest-environment jsdom
 */

import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import CustomersContainer from "../../containers/CustomersContainer.js";
import { act } from "react-dom/test-utils";

// Mock useRouter and fetch
const useRouter = jest.spyOn(require("next/router"), "useRouter");

const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    wrapper.update();
  });
};

describe("CustomerResults", () => {
  let mount;

  beforeAll(() => {
    mount = createMount();

    const mockResponse = JSON.stringify([
      { id: 1, first_name: "Test", last_name: "User" },
    ]);
    fetch.mockResponse(mockResponse);
  });

  /*it("renders without breaking", async () => {
    useRouter.mockImplementation(() => ({ query: {} }));
    const wrapper = mount(<CustomersContainer companies={[]} />);
    await waitForComponentToPaint(wrapper);
  });*/

  it("updates search input based on route", async () => {
    useRouter.mockImplementation(() => ({ query: { search: "foobar" } }));

    const wrapper = mount(<CustomersContainer companies={[]} />);
    await waitForComponentToPaint(wrapper);
    const searchInput = wrapper.find("input#customer-search");
    expect(searchInput.props().value).toEqual("foobar");
  });
});
