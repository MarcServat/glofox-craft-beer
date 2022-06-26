import React, { ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button className="button-component" {...props}>
      {props.content}
    </button>
  );
};

export default Button;
