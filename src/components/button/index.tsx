import { bool, element, oneOf, string } from "prop-types";
import React, { Children, HtmlHTMLAttributes } from "react";
import styles from "./button.module.scss";
import cn from 'classnames';
interface ButtonProps {
    variant?: "contained" | "outlined" | "text",
    children?: React.ReactNode,
    color?: | "primary" | "secondary" | "disabled" | "success" | "error" | "text",
    disabled?: boolean,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    fullwidth?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
    const { variant = "contained", children, color = "primary", onClick, disabled, fullwidth } = props;
    const className = cn([styles.Button, {
        [styles[`Button_${variant}_${color}`]]: color,
        [styles[`Button_${variant}_disabled`]]: disabled,
        [styles[`Button_fullwidth`]]: fullwidth,
    }])
    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button;


Button.propTypes = {
    variant: oneOf(["contained", "outlined", "text"]),
    children: element,
    color: oneOf(["primary", "secondary", "disabled", "text", "success", "error"]),
    disabled: bool,
    fullwidth: bool
}