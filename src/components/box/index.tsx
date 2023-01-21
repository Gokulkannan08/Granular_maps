import  { FC, ReactNode } from 'react';
import PropTypes from "prop-types";

interface BoxProps{
  children?: ReactNode;
  className?: string
}

const Box: FC<BoxProps>=({
  children,
  className
})=>{

  return <div className={className}>
  {children}
  </div>
}

export default Box;

Box.propTypes={
  children: PropTypes.node,
  className: PropTypes.string,
}