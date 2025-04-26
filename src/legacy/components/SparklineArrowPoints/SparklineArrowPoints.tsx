import classNames from 'classnames'
import {FC} from 'react'
import styles from './SparklineArrowPoints.module.scss'

interface SparklineArrowPointsProps {
    isPositive: boolean
}

const SparklineArrowPoints:FC<SparklineArrowPointsProps> = ({isPositive}) => {

    const arrowStyles = classNames({
        [styles.arrow_up]: isPositive,
        [styles.arrow_down]: !isPositive
    })

    return (
        <div className={arrowStyles}/>
    )
}

export default SparklineArrowPoints