import { FC } from 'react'
import styles from './PlayoffTooltip.module.scss'

interface PlayoffTooltipProps {
    info?: any,
    visible?: any
}

const PlayoffTooltip: FC<PlayoffTooltipProps> = ({ visible }) => {



    return (
            <rect className={styles.playoff_tooltip} x={130} y={160}>
                dwadwa
            </rect>
    )
}

export default PlayoffTooltip