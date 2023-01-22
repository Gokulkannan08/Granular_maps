import { FC } from "react";
import Typography from "../typography";
import cn from 'classnames';
import styles from './card.module.scss';
import { bool, string } from "prop-types";
interface CardProps {
    title: string,
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    variant?: string,
    divider?: boolean,
}

const Card: FC<CardProps> = (props) => {
    const { title, variant = "card", onClick, divider } = props;

    const className = cn([{
        [styles[`card_${variant}`]]: variant,
    }, styles.listItem,])
    return <>
        <div className={className} onClick={onClick} >


            <Typography variant="body1" color="text" >
                {title}
            </Typography>
        </div>
        {
            divider ? <hr className={styles.divider} /> : null
        }
    </>
}

export default Card;


Card.propTypes = {
    title: string.isRequired,
    variant: string,
    divider: bool,
}