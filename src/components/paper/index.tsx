import { element, oneOf, string } from "prop-types";
import styles from './paper.module.scss';
import cn from 'classnames';
interface PaperProp {
  children: React.ReactNode,
  elavation?: "1" | "2" | "3" | "4" | "5" | "6" | "7",
  style?: React.CSSProperties,
  direction?: string
}

const Paper: React.FC<PaperProp> = ({ children, elavation, style, direction = "row" }) => {
  const className = cn([styles.paper, { [styles[`elevation_${elavation}`]]: elavation, [styles[`${direction}`]]: direction }]);
  return (<div className={className} style={style} >
    {children}
  </div>)
}

export default Paper;

Paper.propTypes = {
  children: element,
  elavation: oneOf(["1", "2", "3", "4", "5", "6", "7"]),
  direction: oneOf(["row", "column"]),

};