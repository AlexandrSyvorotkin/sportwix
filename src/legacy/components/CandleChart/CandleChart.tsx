import React, { FC, MouseEventHandler, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { candleChart } from "../../Charts/CandleChart/candleChart";
import styles from './CandleChart.module.scss'
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import CandleChartParams from "../CandleChartParams/CandleChartParams";
import { Candle } from "../../models/Candle";
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import Loader from '../Loader/Loader';
import { IMG_PATH } from '../../api/variables';
import leagueLogo from '../../assets/leagues/epllogo.svg'
import vector1 from '../../assets/vector/vector1.svg'
import vector2 from '../../assets/vector/vector2.svg'
import { newCandleChart } from '../../Charts/NewCandleChart/NewCandleChart';
import { ITeam } from '../../models/ITeam';
import { RootState } from '../../redux/store';
import { candleSeasons } from '../../types/candleSeason';
import { candleParameters } from '../../types/candleParameters';
import { drawTeamLogo } from '../../Charts/Functions/DrawTeamLogo';
import { drawTest } from '../../Charts/Functions/DrawTest';
import { drawArrow } from '../../Charts/Functions/drawArrow';
import { useFetchTeamCandlesQuery } from '../../services/candles-api/candle-api';
import LoaderAlt from '../Loader2/LoaderAlt';


interface CandleChartProps {
    rulerActive?: boolean,
    modifiedCandles: Candle[],
    team_img: string | undefined,
    team_name: string | undefined,
    two_candles: boolean,
    filterByHomeAwayGames: string,
    filterByAmoutOfGoals: string,
    filterCandleChartByTypeOfTime: string
    expandMiniCandle?: MouseEventHandler<HTMLButtonElement>,
    seasons: candleSeasons[],
    chartVisible?: boolean,
    chartType?: number,
    chartId: string,
    width?: number,
    height?: number
}



const CandleChart: FC<CandleChartProps> = ({ rulerActive, modifiedCandles, team_name, two_candles, expandMiniCandle, filterByHomeAwayGames, filterByAmoutOfGoals, filterCandleChartByTypeOfTime,  seasons, chartVisible, chartType, team_img, chartId, width, height }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const firstTeamSelectedUuid = useAppSelector(state => state.tournamentSlice.firstSelectedTeamUuid)
    const currentSeasonsAmount = useAppSelector(state => state.tournamentSlice.filters.candleChartFilters.currentSeasonsAmount)
    const spliteType = useAppSelector(state => state.tournamentSlice.filters.candleChartFilters.spliteType)

    const {data, isFetching} = useFetchTeamCandlesQuery({team_uuid: firstTeamSelectedUuid, seasonsAmount: currentSeasonsAmount, spliteType: spliteType})

    // console.log(data)

    const candlesMemo = useMemo(() => {
        return data?.candles
    }, [data?.candles])

    // console.log(modifiedCandles)
    const dispatch = useAppDispatch()
    const currentMatchUuid = useAppSelector((state:RootState) => state.test.matchUuid)
    // console.log(currentMatchUuid)

    const [candleParams, setCandleParams] = useState<candleParameters>({
        params: {
            high: undefined,
            open: undefined,
            low: undefined,
            close: undefined,
            date: undefined,
            home_team_img: undefined,
            away_team_img: undefined,
            score: [],
            home_team: undefined,
            away_team: undefined,
            time: undefined
        }
    })

    const firstSelectedTeam = useAppSelector(state => state.tournamentSlice.firstSelectedTeam)
    const secondSelectedTeam = useAppSelector(state => state.tournamentSlice.secondSelectedTeam)

    const teams = {
        first_team_name: firstSelectedTeam?.team_name,
        first_team_img: firstSelectedTeam?.team_svg_img,
        second_team_name: secondSelectedTeam?.team_name,
        second_team_img: secondSelectedTeam?.team_svg_img,
    }
    // const teamsRedux = useAppSelector((state: RootState) => state.teams)

    // console.log(width, height)


    const { theme } = useContext(ThemeContext)

    const [miniNews, setMiniNews] = useState([])

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Проверяем наличие холста
        const ctx = canvas.getContext('2d');
        if (!ctx) return; 
       
        candleChart(ctx, chartId , candlesMemo, rulerActive, setCandleParams, data?.seasons, theme, filterByHomeAwayGames,filterByAmoutOfGoals, filterCandleChartByTypeOfTime, teams, chartType, leagueLogo, teams.first_team_img, teams.second_team_img, setMiniNews, width, height, currentMatchUuid)
    }, [chartId, candlesMemo, theme, filterByHomeAwayGames,filterByAmoutOfGoals, filterCandleChartByTypeOfTime, rulerActive, width, height, currentMatchUuid])


   




    return (
        <div className={styles.chart_container} style={{ width: '100%'}}>
            <CandleChartParams team_img={team_img} team_name={team_name} two_candle={two_candles} expandMiniCandle={expandMiniCandle} candleParams={candleParams.params} chartVisible={chartVisible} />
                <div style={{ borderTop: '1px solid #333'}} className={styles.canvas_container}>
                    {isFetching ? <LoaderAlt/> : <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} id={chartId}/>}
                    <div className={styles.team_img}>
                        <div className={styles.team_wrapper}>
                            <img src={`${IMG_PATH}${team_img}`} alt="" />
                        </div>
                    </div>
                    <div className={styles.news_tooltip} id='news_tooltip'>
                        {miniNews.map((single_news: any, id: number) => 
                                <div className={styles.mini_news} key={id}>
                                    <div className={styles.img_wrapper}>
                                        <img src={`${IMG_PATH}${single_news.header_img}`} alt="" />
                                    </div>
                                    <div className={styles.news_info}>
                                        <p>{single_news.header_title}</p>
                                        <div>{single_news.header_date}</div>
                                    </div>
                                </div>
                        )}
                    </div>
                </div>
        </div>
    );
};

export default CandleChart;