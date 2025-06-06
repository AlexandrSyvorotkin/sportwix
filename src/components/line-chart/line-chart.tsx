import { FC, useEffect, useRef } from 'react'
// import candles from '../../MockData/CandlesMini.json'
// import {lineChart} from "../../Charts/LineChart/LineChart";
import styles from './line-chart.module.scss'
import { CandleMini } from '../../models/Candle'
// @ts-ignore
import { lineChart } from '@charts/line-chart/line-chart'

interface LineChartProps {
  candles: CandleMini[]
}

const LineChart: FC<LineChartProps> = ({ candles }) => {
  const candleCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    lineChart(candles, candleCanvasRef)
  }, [])

  return (
    <div style={{ position: 'relative' }} className={styles.line_chart}>
      <canvas
        ref={candleCanvasRef}
        style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        // onMouseEnter={() => showCandlesMini(candles)}
        // onMouseLeave={() => hideCandlesMini()}
      />
      {/* <CandlesMini candles={candles}/> */}
    </div>
  )
}

export { LineChart }
