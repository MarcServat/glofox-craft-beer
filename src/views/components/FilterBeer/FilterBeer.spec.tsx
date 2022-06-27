import React from "react";
import { render, screen } from "@testing-library/react";
import FilterBeer from "./FilterBeer";

const renderComponent = () => {
  render(<FilterBeer />);
};

describe("Given a search", () => {
  describe("When filtering by name", () => {
    it("Should render a list of beers", async () => {
      renderComponent();

      const rows = await screen.findAllByTestId("row");

      expect(rows).toHaveLength(27);
    });
  });
});
