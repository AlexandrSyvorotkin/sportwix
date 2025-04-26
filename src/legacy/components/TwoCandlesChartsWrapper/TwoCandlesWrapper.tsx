import React, {FC, useEffect, useState} from 'react';
import CandleChart from "../CandleChart/CandleChart";
import {useAppDispatch, useAppSelector} from "../../types/hooks";
import styles from './TwoCandlesWrapper.module.scss'
import { Candle } from '../../models/Candle';
import CandleChartTest from '../CandleChart/CandleChartMobile';
import { ITeam } from '../../models/ITeam';
import { RootState } from '../../redux/store';

interface TwoCandlesWrapperProps {
    drawRulerActive: boolean,
    width?: number
    height?: number
}

const TwoCandlesWrapper:FC<TwoCandlesWrapperProps> = ({drawRulerActive, width, height}) => {


    const {firstSelectedTeam, secondSelectedTeam} = useAppSelector(state => state.tournamentSlice)
    const candles = useAppSelector((state: RootState) => state.candleSliceNew)
  

    const [firstCandleChartVisible, setFirstCandleChartVisible] = useState(true)
    const [secondCandleChartVisible, setSecondCandleChartVisible] = useState(true)

    function expandMiniCandleChart(expandChart: number) {
        if (expandChart === 1) {
            setSecondCandleChartVisible(!secondCandleChartVisible)
        } else {
            setFirstCandleChartVisible(!firstCandleChartVisible)
        }
    }

    const filterCandleChartByTypeOfGames = useAppSelector((state: RootState) => state.candleSliceNew.filters.byHomeAwayGames)
    const filterCandleChartByAmoutOfGoals = (useAppSelector((state: RootState) => state.candleSliceNew.filters.byAmountOfGoals))
    const filterCandleChartByTypeOfTime = useAppSelector((state: RootState) => state.candleSliceNew.filters.byTypeOfTime)

    return (
        <div className={styles.two_candles_wrapper}>
            {firstCandleChartVisible && <CandleChart
                rulerActive={drawRulerActive}
                modifiedCandles={candles.firstSelectedTeam.candles}
                team_name={firstSelectedTeam?.team_name}
                team_img={firstSelectedTeam?.team_img}
                two_candles={true}
                expandMiniCandle={() => expandMiniCandleChart(1)}
                filterByHomeAwayGames={filterCandleChartByTypeOfGames}
                filterByAmoutOfGoals={filterCandleChartByAmoutOfGoals}
                filterCandleChartByTypeOfTime={filterCandleChartByTypeOfTime}
                seasons={candles.firstSelectedTeam.seasons}
                chartVisible={secondCandleChartVisible}
                chartType={1}
                chartId='fisrt_chart'
                width={width}
                height={height}
            /> }
            <div style={{height: '100%', width: '1px', backgroundColor: '#5C5C5C', zIndex: 4}}/>
            {secondCandleChartVisible && <CandleChart
                rulerActive={drawRulerActive}
                modifiedCandles={candles.secondSelectedTeam.candles}
                team_name={secondSelectedTeam?.team_name}
                team_img={secondSelectedTeam?.team_img}
                two_candles={true}
                expandMiniCandle={() => expandMiniCandleChart(2)}
                filterByHomeAwayGames={filterCandleChartByTypeOfGames}
                filterByAmoutOfGoals={filterCandleChartByAmoutOfGoals}
                filterCandleChartByTypeOfTime={filterCandleChartByTypeOfTime}
                seasons={candles.secondSelectedTeam.seasons}
                chartVisible={firstCandleChartVisible}
                chartType={2}
                chartId='second_chart'
                width={width}
                height={height}
            />}
        </div>
    );
};

export default TwoCandlesWrapper;