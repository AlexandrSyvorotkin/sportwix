import React, {Dispatch, FC, SetStateAction} from 'react'
import styles from './SparklineCoachCard.module.scss'

interface SparklineCoachCardProps {
    first_name: string,
    last_name: string
    visible: boolean,
}

const SparklineCoachCard:FC<SparklineCoachCardProps> = ({first_name, last_name, visible}) => {

    if (!visible) {
        return null
    }

    return (
        <div className={styles.sparkline_coach_card}
        >
            <span>{first_name} {last_name}</span>
        </div>
    )
}

export default SparklineCoachCard