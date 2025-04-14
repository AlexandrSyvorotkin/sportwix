import { FC } from 'react'
import styles from './SparkLineSingleCup.module.scss'

interface SparkLineSingleCupProps {
    backgroudColor: string,
    borderColor: string,
    children: number | null
}

const SparkLineSingleCup:FC<SparkLineSingleCupProps> = ({backgroudColor, borderColor, children}) => {
    return (
        <div className={styles.cup} style={{backgroundColor: `${backgroudColor}`, border: `3px solid ${borderColor}`}}>{children}</div>
    )
}

export default SparkLineSingleCup