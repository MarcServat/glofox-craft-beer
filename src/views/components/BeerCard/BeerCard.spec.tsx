import React from "react";
import { render, screen, within } from "@testing-library/react";
import BeerCard from "./BeerCard";

const renderComponent = () => {
  render(<BeerCard />);
};

describe("Given a beer card", () => {
  describe("When render for the first time", () => {
    it("Should have a random beer", async () => {
      renderComponent();

      const pod = await screen.findByTestId("pod");

      expect(pod).toBeInTheDocument();
    });
  });
});
