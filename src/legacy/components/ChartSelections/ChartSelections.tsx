import React, { FC } from 'react'
import ChartSelect from '../../ui/Selections/ChartSelect/ChartSelect'
import CandleCHartSelect from '../../ui/Selections/candleChartSelect/candleChartSelect'

type Metric = {
    metric: string
}

type metric = {
    param: string,
    filterFunc: any,
    id: number
}

interface ChartSelectionsProps {
    chartSelect: boolean,
    filterBySeasons: boolean,
    filterByHomeAwayGames:boolean,
    filterByTimes: boolean
    filterByGoals: boolean
    metrics: Metric[]
    candleMetrics: metric[],
    seasonFilterParams: metric[],
    metricsByGames: metric[],
    metricsFilterByTime: metric[],
    goalsFilterParams: metric[],
    filterByParamHandler: any,
    setChartSelect: any,
    setFilterBySeasons: any,
    setFilterByHomeAwayGames: any
    setFilterByTimes: any,
    setFilterByGoals: any
    activeParamsSelect: any
}

const ChartSelections: FC<ChartSelectionsProps> = ({
    chartSelect, 
    filterBySeasons, 
    filterByHomeAwayGames, 
    filterByTimes, 
    filterByGoals, 
    metrics, 
    filterByParamHandler, 
    setChartSelect, 
    seasonFilterParams, 
    metricsByGames, 
    activeParamsSelect, 
    metricsFilterByTime, 
    goalsFilterParams, 
    setFilterBySeasons,
    setFilterByHomeAwayGames,
    setFilterByGoals,
    setFilterByTimes
    }) => {
    return (
        <>
            {/* {chartSelect ?
                <ChartSelect
                    metrics={metrics}
                    filterChart={filterByParamHandler}
                    onClose={() => setChartSelect(false)}
                    topPosition={50}
                /> :
                null}
            {filterBySeasons ?
                <CandleCHartSelect
                    candleMetrics={seasonFilterParams}
                    onClose={() => setFilterBySeasons(false)}
                    topPosition={90}
                    activeParam={activeParamsSelect.filterBySeasons}
                />
                :
                null}
            {filterByHomeAwayGames ?
                <CandleCHartSelect
                    candleMetrics={metricsByGames}
                    onClose={() => setFilterByHomeAwayGames(false)}
                    topPosition={150}
                    activeParam={activeParamsSelect.filterByGames}
                /> :
                null}
            {filterByTimes ?
                <CandleCHartSelect
                    candleMetrics={metricsFilterByTime}
                    onClose={() => setFilterByTimes(false)}
                    topPosition={200}
                    activeParam={activeParamsSelect.filterByTimes}
                /> :
                null}
            {filterByGoals ?
                <CandleCHartSelect
                    candleMetrics={goalsFilterParams}
                    onClose={() => setFilterByGoals(false)}
                    topPosition={250}
                    activeParam={activeParamsSelect.filterByGoals}
                /> :
                null} */}
        </>
    )
}

export default ChartSelections