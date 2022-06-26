import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import SearchBar, { SearchBarProps } from "./SearchBar";
import userEvent from "@testing-library/user-event";

const renderComponent = (props?: SearchBarProps) => {
  const onSubmit = props?.onSubmit || jest.fn();
  render(<SearchBar onSubmit={onSubmit} />);
};

describe("Given SearchBar component", () => {
  describe("When component is rendered", () => {
    it("Should then have the name selected by default", async () => {
      renderComponent();

      const form = await screen.findByTestId("search-form");
      const radioNameInput = await within(form).findByTestId("by-name");
      const radioBrewedInput = await within(form).findByTestId(
        "by-brewed-before"
      );

      expect(radioNameInput).toBeChecked();
      expect(radioBrewedInput).not.toBeChecked();
    });
  });
  describe("When the form is submitted", () => {
    it("Should then return the name API param in the correct format", async () => {
      const onSubmit = jest.fn();
      renderComponent({ onSubmit });
      const form = await screen.findByTestId("search-form");
      const textInput = await within(form).findByTestId("text-input");
      const button = await within(form).getByRole("button");

      userEvent.type(textInput, "tasty beer");
      userEvent.click(button);

      expect(onSubmit).toHaveBeenCalledWith({ beer_name: "tasty beer" });
    });
  });
});
