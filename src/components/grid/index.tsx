import React, { FunctionComponent, HtmlHTMLAttributes, ReactNode } from "react";
import styles from "./grid.module.scss";
import cn from "classnames";

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;


type JustifyContent = "flex-start" | "center" | "flex-end" | "space-between";
type AlignItems = "flex-start" | "center" | "flex-end";

const Grid: FunctionComponent<
  {
    children: ReactNode;
    container?: boolean;
    item?: boolean;
    xs?: Cols;
    sm?: Cols;
    md?: Cols;
    lg?: Cols;
    justifyContent?: JustifyContent;
    alignItems?: AlignItems;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({
  children,
  container,
  item,
  xs,
  sm,
  md,
  lg,
  justifyContent,
  alignItems,

  ...props
}) => {
    const classNames = cn({
      [styles.Grid_container]: container,
      [styles.Grid_item]: item,
      [styles[`Grid_xs_${xs}`]]: xs,
      [styles[`Grid_sm_${sm}`]]: sm,
      [styles[`Grid_md_${md}`]]: md,
      [styles[`Grid_lg_${lg}`]]: lg,
      [styles[`Grid_justifyContent_${justifyContent}`]]: justifyContent,
      [styles[`Grid_alignItems_${alignItems}`]]: alignItems,
    });

    return (
      <div className={classNames} {...props}>
        {children}
      </div>
    );
  };

export default Grid;