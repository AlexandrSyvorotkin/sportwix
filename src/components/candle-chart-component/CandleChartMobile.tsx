// import React, { FC, MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
// import { candleChart } from "../../charts/candle-chart/candle-chart";
// import styles from './CandleChart.module.scss'
// import { useAppDispatch, useAppSelector } from "../../types/hooks";
// import CandleChartParams from "../candle-chart-params/candle-chart-params";
// import { Candle } from "../../models/Candle";
// import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
// import Loader from '../Loader/Loader';
// import { IMG_PATH } from '../../api/variables';
// import leagueLogo from '../../assets/epllogo.png'
// import { candleChartMobile } from '../../Charts/CandleChartMobile/CandleChartMobile';
// import { ITeam } from '../../models/ITeam';
// import { RootState } from '../../redux/store';

// interface CandleChartProps {
//     rulerActive?: boolean,
//     modifiedCandles: Candle[],
//     team_img: string | undefined,
//     team_name: string | undefined,
//     two_candles: boolean,
//     filter: any
//     filterByHomeAwayGames: string,
//     filterByAmoutOfGoals: string,
//     filterCandleChartByTypeOfTime: string
//     expandMiniCandle?: MouseEventHandler<HTMLButtonElement>,
//     seasons: any,
//     chartVisible?: boolean,
//     chartType?: number,
//     chartId: string,
//     width: number,
//     height: number,
//     twoCandlesStatus: boolean
// }

// const CandleChartMobile: FC<CandleChartProps> = ({ rulerActive, modifiedCandles, team_name, two_candles, expandMiniCandle, filter, seasons, chartVisible, chartType, team_img, chartId, width, height, twoCandlesStatus, filterByHomeAwayGames, filterByAmoutOfGoals, filterCandleChartByTypeOfTime }) => {

//     const candleCanvasRef = useRef<HTMLCanvasElement>(null)

//     const dispatch = useAppDispatch()


//     const [candleParams, setCandleParams] = useState({
//         params: {
//             high: undefined,
//             open: undefined,
//             low: undefined,
//             close: undefined,
//             date: undefined,
//             home_team_img: undefined,
//             away_team_img: undefined,
//             score: [],
//             home_team: undefined,
//             away_team: undefined,
//             time: undefined
//         }
//     })

//     const firstSelectedTeam = useAppSelector(state => state.tournamentSlice.firstSelectedTeam)
//     const secondSelectedTeam = useAppSelector(state => state.tournamentSlice.secondSelectedTeam)

//     const teams = {
//         first_team_name: firstSelectedTeam?.team_name,
//         first_team_img: firstSelectedTeam?.team_svg_img,
//         second_team_name: secondSelectedTeam?.team_name,
//         second_team_img: secondSelectedTeam?.team_svg_img,
//     }



//     const { theme } = useContext(ThemeContext)

//     const [miniNews, setMiniNews] = useState([])

    
//     // console.log(width)

//     useEffect(() => {
//         candleChartMobile(width, height, chartId , modifiedCandles, rulerActive, setCandleParams, seasons, theme, filterByHomeAwayGames, filterByAmoutOfGoals, filterCandleChartByTypeOfTime, teams, chartType, leagueLogo, teams.first_team_img, teams.second_team_img)
//     }, [chartId, modifiedCandles, theme, filter, rulerActive, width, height, filterByHomeAwayGames, filterByAmoutOfGoals, filterCandleChartByTypeOfTime])

//     return (
//         <div className={styles.chart_container} style={{ width: '100%', height: '100%'}}>
//             <CandleChartParams team_img={team_img} team_name={team_name} two_candle={two_candles} expandMiniCandle={expandMiniCandle} candleParams={candleParams.params} chartVisible={chartVisible} />
//                 <div style={{ borderTop: '1px solid #333'}} className={styles.canvas_container}>
//                     <canvas ref={candleCanvasRef} style={{ width: "100%", height: '100%' }} id={chartId}/>
//                     {!twoCandlesStatus ? <div className={styles.team_img}>
//                         <div className={styles.team_wrapper}>
//                             <img src={`${IMG_PATH}${team_img}`} alt="" />
//                         </div>
//                     </div> : null}
//                     <div className={styles.news_tooltip} id='news_tooltip'>
//                         {miniNews.map((single_news: any, id: number) => 
//                                 <div className={styles.mini_news} key={id}>
//                                     <div className={styles.img_wrapper}>
//                                         <img src={`${IMG_PATH}${single_news.header_img}`} alt="" />
//                                     </div>
//                                     <div className={styles.news_info}>
//                                         <p>{single_news.header_title}</p>
//                                         <div>{single_news.header_date}</div>
//                                     </div>
//                         </div>
//                         )}
//                     </div>
//                 </div>
//         </div>
//     );
// };

// export default CandleChartMobile;