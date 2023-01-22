import { arrayOf, bool, element, elementType, node } from "prop-types";
import styles from './rootbox.module.scss';
import cn from 'classnames';
interface RootBoxProp {
    children?: React.ReactNode
    fullwidth?: boolean
}

const RootBox: React.FC<RootBoxProp> = ({ children, fullwidth }) => {
    const className = cn([styles.rbox, { [styles['rbox_fullWidth']]: fullwidth, }]);
    return (<div className={className} >
        {children}
    </div>)
}

export default RootBox;

RootBox.propTypes = {
    children: element,
    fullwidth: bool
};