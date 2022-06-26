import React, { InputHTMLAttributes, useState } from "react";

interface InputDateProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputDate = (props: InputDateProps) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
  };

  return (
    <>
      <input type="month" value={month} onChange={onInputChange} />

      {/*<datalist id="month">*/}
      {/*  <option value="01" />*/}
      {/*    <option value="02" />*/}
      {/*      <option value="03" />*/}
      {/*        <option value="04" />*/}
      {/*          <option value="05" />*/}
      {/*            <option value="06" />*/}
      {/*            <option value="07" />*/}
      {/*            <option value="08" />*/}
      {/*            <option value="09" />*/}
      {/*            <option value="10" />*/}
      {/*            <option value="11" />*/}
      {/*            <option value="12" />*/}
      {/*</datalist>*/}
      {/*      <input list="year" type="text" value={year} onChange={onInputChange}  />*/}
      {/*      <datalist id="year">*/}
      {/*        <option value="2007" />*/}
      {/*        <option value="2008" />*/}
      {/*        <option value="2009" />*/}
      {/*        <option value="2010" />*/}
      {/*        <option value="2011" />*/}
      {/*        <option value="2012" />*/}
      {/*        <option value="2013" />*/}
      {/*        <option value="2014" />*/}
      {/*        <option value="2015" />*/}
      {/*        <option value="2016" />*/}
      {/*        <option value="2017" />*/}
      {/*        <option value="2018" />*/}
      {/*        <option value="2019" />*/}
      {/*        <option value="2020" />*/}
      {/*        <option value="2021" />*/}
      {/*        <option value="2022" />*/}
      {/*      </datalist>*/}
    </>
  );
};

export default InputDate;
