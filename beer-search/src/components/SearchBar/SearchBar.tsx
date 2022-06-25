import React, { useState } from "react";
import Button from "../Button/Button";

type FormValues = { inputValue: string; option: string };
interface SearchBarProps {
  onSubmit: (formValues: FormValues) => void;
  onChange: (value: string, by: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");
  const [option, setOption] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit({ inputValue, option });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Search</h1>
      <input type="text" value={inputValue} onChange={onInputChange} />
      <label htmlFor="by_name">
        <input
          id="by_name"
          type="radio"
          value="name"
          name="filter"
          onChange={onRadioChange}
        />
        by name
      </label>
      <label htmlFor="by_description">
        <input
          id="by_description"
          type="radio"
          value="description"
          name="filter"
          onChange={onRadioChange}
        />
        by description
      </label>
      <Button content="Search" type="submit" />
    </form>
  );
};

export default SearchBar;
