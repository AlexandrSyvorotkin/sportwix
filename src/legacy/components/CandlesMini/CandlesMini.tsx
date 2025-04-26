import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {candlesMiniChart} from "../../Charts/CandlesMini/CandlesMini";
import {Candle} from "../../models/Candle";
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import styles from './CandlesMini.module.scss'

interface CandlesMiniProps {
    // candles: Candle[],
}



const CandlesMini:FC<CandlesMiniProps> = ({}) => {

    // console.log(candles)
    const [visible, setVisible] = useState<boolean>(false)
    const [candles, setCandles] = useState<Candle[] | []>([])

    const [position, setPosition] = useState({
        top: 0,
        left: 0
    })
   
    const candleCanvasRef = useRef<HTMLCanvasElement>(null)


    // console.log(candles)

    // Will mount
    useEffect(componentDidMount, [])

    const modifiedCandles = {
        matches: [...candles]
    }

    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        candlesMiniChart(modifiedCandles, candleCanvasRef, theme)
    }, [theme, candles])

    const display = visible ? 'block' : 'none'

    const {top, left} = position

    return (
        <div className={styles.mini_candles} style={{top, left, display}}>
            <canvas ref={candleCanvasRef} style={{width: "100%", height: "100%", zIndex: '2', borderRadius: "6px", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}/>
        </div>
    );

    function show (e: any) {
        const {detail} = e;
        let {msg, candles, top, left, offset} = detail;
        // console.log("arrive:", offset)

        top = top +70 + 'px'
        left = left + offset - 150 + 'px'

        setVisible(true);
        setCandles(candles);
        setPosition({ top, left })
    }
    
    function hide (e: any) {
        const {detail} = e;
        const {msg} = detail;
        // console.log(msg)
        setVisible(false)
    }

    function componentDidMount () {
        document.addEventListener("show-candles-mini", show);
        document.addEventListener("hide-candles-mini", hide);
        // console.log("mount")
        return componentWillUnmount;
    }
    
    function componentWillUnmount () {
        document.removeEventListener("show-candles-mini", show);
        document.removeEventListener("hide-candles-mini", hide);
        // console.log("unmount")
    }
    
};

export default CandlesMini;





