import React, {FC, useEffect, useRef, useState} from 'react';
// import candles from '../../MockData/CandlesMini.json'
import {lineChart} from "../../Charts/LineChart/LineChart";
import CandlesMini from "../CandlesMini/CandlesMini";
import {Candle} from "../../models/Candle";
import styles from './LinaChart.module.scss'
import { current } from '@reduxjs/toolkit';
import { CandleMini } from '../../models/Candle';

interface LineChartProps {
    candles: CandleMini[]
    candleCanvasRef: any
}

const LineChart:FC<LineChartProps> = ({candles, candleCanvasRef}) => {



    // const candleCanvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        lineChart(candles, candleCanvasRef)
    }, [])
    

    return (
        <div style={{position: "relative"}} className={styles.line_chart}>
            <canvas ref={candleCanvasRef} style={{width: "100%", height: "100%", cursor: 'pointer'}}
                // onMouseEnter={() => showCandlesMini(candles)}
                // onMouseLeave={() => hideCandlesMini()}
            />
            {/* <CandlesMini candles={candles}/> */}
        </div>
    )

    function showCandlesMini(candles:any) {

        const rect = candleCanvasRef.current?.getBoundingClientRect()

        if (rect) {
            const { top, left, width: offset } = rect;
        
            const e = new CustomEvent('show-candles-mini', {
                detail: {
                    candles,
                    msg: "show",
                    top,
                    left,
                    offset
                }
            });
            document.dispatchEvent(e);
        }
    }
    
    function hideCandlesMini() {
        const e = new CustomEvent('hide-candles-mini', { detail: {
            msg: "hide"
        }});
        document.dispatchEvent(e);
    }
};



export default LineChart;