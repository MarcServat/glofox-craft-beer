import React, { useState } from "react";
import Button from "../Button/Button";
import "./SearchBar.css";

export enum Option {
  Name = "name",
  BrewedBefore = "brewed_before",
}

export type FormValues = { beer_name?: string; brewed_before?: string };

export interface SearchBarProps {
  onSubmit: (formValues: FormValues) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");
  const [option, setOption] = useState(Option.Name);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue("");
    setOption(e.target.value as Option);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (option === Option.BrewedBefore) {
      props.onSubmit({
        brewed_before: inputValue.split("-").reverse().join("-"),
      });
    }
    if (option === Option.Name) {
      props.onSubmit({ beer_name: inputValue });
    }
  };

  return (
    <form data-testid="search-form" className="form" onSubmit={onSubmit}>
      {option === Option.Name && (
        <input
          data-testid="text-input"
          type="text"
          pattern="[A-Za-z0-9 -]+"
          title="Only letters, numbers, spaces and hyphens are allowed"
          value={inputValue}
          required
          onChange={onInputChange}
        />
      )}
      {option === Option.BrewedBefore && (
        <input
          data-testid="month-input"
          type="month"
          value={inputValue}
          required
          onChange={onInputChange}
        />
      )}
      <label htmlFor="by_name">
        <input
          data-testid="by-name"
          id="by_name"
          type="radio"
          value={Option.Name}
          checked={option === Option.Name}
          name="filter"
          onChange={onRadioChange}
        />
        by name
      </label>
      <label htmlFor="by_brewed_before">
        <input
          data-testid="by-brewed-before"
          id="by_brewed_before"
          type="radio"
          value={Option.BrewedBefore}
          checked={option === Option.BrewedBefore}
          name="filter"
          onChange={onRadioChange}
        />
        by brewed before
      </label>

      <Button content="Search" type="submit" />
    </form>
  );
};

export default SearchBar;
