import { FC } from "react";
import Typography from "../typography";
import cn from 'classnames';
import styles from './card.module.scss';
import { string } from "prop-types";
interface CardProps {
    title: string,
    icon?: string,
    variant?: string,
}

const Card: FC<CardProps> = (props) => {
    const { title, icon, variant = "card" } = props;

    const className = cn([{
        [styles[`Card_${variant}`]]: variant,
    }, styles.listItem,])
    return <div className={className} >

        {icon && <div className={styles.avater}>
            <img src="" alt="icon" />
        </div>}
        <Typography variant="body1" color="text" >
            {title}
        </Typography>



    </div>
}

export default Card;


Card.propTypes = {
    title: string.isRequired,
    icon: string,
    variant: string,
}