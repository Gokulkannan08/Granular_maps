import React, { useState } from 'react';
import styles from './tooltip.module.scss';
import cn from 'classnames';

interface Props {
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    children?: React.ReactNode;
}

const Tooltip: React.FC<Props> = ({ text, position = 'top', children }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const className = cn(styles.tooltipContainer)
    return (
        <div
            className={className}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {children}
            {showTooltip && <div className={cn([styles.tooltip, { [styles[`tooltip_${position}`]]: position }])}>{text}</div>}
        </div>
    );
};

export default Tooltip;
