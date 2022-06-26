import React from "react";
import {render, screen, waitFor, within} from "@testing-library/react";
import FilterBeer from "./FilterBeer";
import userEvent from "@testing-library/user-event";
import GETPunkAPI from "../../../mocks/GETPunkAPI.json"


const renderComponent = () => {
  render(<FilterBeer />);
};

describe("Given FilterBeer", () => {
  describe("When a beer name is entered", () => {
    it("Should fetch a list of beers that matches", async () => {
      renderComponent()
      const form = await screen.findByTestId("search-form");
      const textInput = await within(form).findByTestId("text-input");
      const button = await within(form).getByRole("button");

      userEvent.type(textInput, "tasty beer");
      userEvent.click(button);

      const rows = await screen.findAllByTestId("row");
      console.log(GETPunkAPI.length)
      await waitFor(() => {
        expect(rows).toHaveLength(GETPunkAPI.length)
      })
    });
  });
});
