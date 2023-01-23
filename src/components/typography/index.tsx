import { FC, ReactNode } from 'react';
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./typography.module.scss";

interface TypographyProps {
  children?: ReactNode;
  variant?: | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption",
  color?: | "primary" | "secondary" | "disabled" | "success" | "error" | "text",
  style?: React.CSSProperties,

}

const Typography: FC<TypographyProps> = ({
  children, variant = "body1", color = "text", style
}) => {
  const className = cn({

    [styles[`Typography_${variant}`]]: variant,
    [styles[`Typography_${color}`]]: color,
  })
  return <span className={className} style={style} >
    {children}
  </span>
}

export default Typography;

Typography.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2", "caption"]),
  color: PropTypes.oneOf(["primary", "secondary", "disabled", "text", "success", "error"]),
}