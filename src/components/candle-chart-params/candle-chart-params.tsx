import React, {FC, MouseEventHandler, useContext} from 'react';
import styles from "./CandleParams.module.scss";
import {IMG_PATH} from "../../api/variables";
import {useAppSelector} from "../../types/hooks";
import classNames from "classnames";
import chart_expand from '../../assets/expand_mini_candle_chart/expand_candle_chart.svg'
import chart_expand_active from '../../assets/expand_mini_candle_chart/expand_candle_chart_active.svg'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';

interface CandleChartParamsProps {
    team_img: string | undefined,
    team_name: string | undefined,
    two_candle: boolean,
    expandMiniCandle?: MouseEventHandler<HTMLButtonElement>;
    candleParams: any,
    chartVisible?: boolean
}

const CandleChartParams: FC<CandleChartParamsProps> = ({team_img, team_name, two_candle, expandMiniCandle, candleParams, chartVisible}) => {

    const paramStyles = classNames({
        [styles.candle_draw]: candleParams.close === candleParams.open,
        [styles.candle_win]: candleParams.close && candleParams.open && candleParams.close < candleParams.open,
        [styles.candle_lose]: candleParams.close && candleParams.open && candleParams.close > candleParams.open,
    });

    // console.log(chartVisible, 'chart_visible')

    const {theme} = useContext(ThemeContext)

    return (
        <div className={styles.chart_header}>
            <div className={`${styles.params_wrapper} ${styles[theme]}`}>
                <div className={styles.img_wrapper}>
                    <img src={`${IMG_PATH}${team_img}`} alt=""/>
                </div>
                {two_candle ? null : <span>{team_name}</span>}
                <div className={styles.divider}/>
                <div className={styles.candle_params}>
                    <div className={styles.candle_team_params}>
                        <span>Open</span>
                        <span className={paramStyles}>{candleParams.open}</span>
                    </div>
                    <div className={styles.candle_team_params}>
                        <span>High</span>
                        <span className={paramStyles}>{candleParams.high}</span>
                    </div>
                    <div className={styles.candle_team_params}>
                        <span>Low</span>
                        <span className={paramStyles}>{candleParams.low}</span>
                    </div>
                    <div className={styles.candle_team_params}>
                        <span>Close</span>
                        <span className={paramStyles}>{candleParams.close}</span>
                    </div>
                    <div style={{display: 'flex', gap: '5px'}}>
                        {two_candle? null : 
                            <>
                                <span>Date</span>
                                <span>{candleParams.date}</span>
                            </>
                        }
                    </div>
                    <div className={styles.candle_team_params}>
                        <span>{two_candle? 'T:' : 'Time:'} {candleParams.time}</span>
                    </div>
                    <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                        {candleParams.home_team_img === undefined ? null :
                            <div className={styles.img_wrapper}>
                                <img src={`${IMG_PATH}/${candleParams.home_team_img}`} alt=""/>
                            </div>
                        }
                        {two_candle ? null : <span>{candleParams.home_team}</span>}
                        <span>{candleParams.score[0]} : {candleParams.score[1]}</span>
                        {two_candle ? null : <span>{candleParams.away_team}</span>}
                        {candleParams.away_team_img === undefined ? null :
                            <div className={styles.img_wrapper}>
                                <img src={`${IMG_PATH}/${candleParams.away_team_img}`} alt=""/>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {/* {two_candle ? <button onClick={expandMiniCandle} className={styles.expand}>
                <img src={chartVisible ? chart_expand : chart_expand_active } alt=""/>
            </button> : null} */}
        </div>
    );
};

export {CandleChartParams};