import {  element, oneOf } from "prop-types";
import styles from './paper.module.scss';
import cn from 'classnames';
interface PaperProp{
    children : React.ReactNode,
    elavation?:"1"|"2"|"3"|"4"|"5"|"6"|"7",
    style?:React.CSSProperties,

}

const Paper : React.FC<PaperProp> = ({children,elavation,style})=>{
    const className=cn([styles.paper ,{ [styles[`rbox_${elavation}`]]: elavation,}]);
   return (<div className={className} style={style} >
         {children}
   </div>)
}

export default Paper;

Paper.propTypes={
  children:element,
  elavation:oneOf(["1","2","3","4","5","6","7"])
};