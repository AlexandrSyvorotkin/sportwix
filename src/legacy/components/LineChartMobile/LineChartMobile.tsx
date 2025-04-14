import {FC, useEffect, useRef} from 'react';
// import candles from '../../MockData/CandlesMini.json'
import {lineChart} from "../../Charts/LineChart/LineChart";
import styles from './LineChartMobile.module.scss'
import { CandleMini } from '../../models/Candle';

interface LineChartProps {
    candles: CandleMini[]
}

const LineChartMobile:FC<LineChartProps> = ({candles}) => {


    const candleCanvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        lineChart(candles, candleCanvasRef)
    }, [])
    

    return (
        <div style={{position: "relative"}} className={styles.line_chart}>
            <canvas ref={candleCanvasRef} style={{width: "100px", height: "40px", cursor: 'pointer'}}
            />
        </div>
    )
       
};



export default LineChartMobile;