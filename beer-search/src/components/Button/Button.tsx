import React from "react";
import "./Button.css";

interface ButtonProps {
    content: string;
    onClick: () => void;
}

const Button = (props: ButtonProps) => {
    return (
        <button className="button-component" onClick={props.onClick}>{props.content}</button>
    )
}

export default Button;