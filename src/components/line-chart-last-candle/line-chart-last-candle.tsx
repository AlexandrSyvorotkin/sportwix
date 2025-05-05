import {FC} from 'react'
import styles from './line-chart-last-candle.module.scss'
import SparklineArrowPoints from '../../legacy/components/SparklineArrowPoints/SparklineArrowPoints'

type LittleCandle = {
    open: number,
    high: number,
    close: number,
    low: number
}

interface LineChartLastCandlePosProps {
    lastCandles: LittleCandle[]
}

const LineChartLastCandlePos:FC<LineChartLastCandlePosProps> = ({lastCandles}) => {

    const language = 'Eng'


    const lastCloseDifference = lastCandles[1].close - lastCandles[0].close

    let pointsDifference
    let pointsDifferenceColor

    if (lastCloseDifference > 0) {
        pointsDifferenceColor = '#51B136'
    } else if (lastCloseDifference === 0) {
        pointsDifferenceColor = '#B7A503';
    } else if (lastCloseDifference < 0) {
        pointsDifferenceColor = '#C00000'
    }

    return (
        <div className={styles.last_candle}>
            <div>{lastCandles[1].close} ({language === 'Eng' ? 'Gls' : 'Гз'})</div>
            <div className={styles.last_candles_diff}>
                <div style={{color: pointsDifferenceColor}}>{lastCloseDifference}</div>
                {lastCloseDifference >= 0 ? <SparklineArrowPoints isPositive={true}/> : <SparklineArrowPoints isPositive={false}/>}
            </div>
        </div>
    )
}

export { LineChartLastCandlePos } 