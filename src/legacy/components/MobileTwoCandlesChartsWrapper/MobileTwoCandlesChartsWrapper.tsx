import { IMG_PATH } from '../../api/variables'
import { useAppSelector } from '../../types/hooks'
import styles from './MobileTwoCandlesChartsWrapper.module.scss'
import { FC, useState } from 'react'
import arrowClose from '../../assets/select-arrows/close-arrow.svg'
import arrowOpen from '../../assets/select-arrows/open-arrow.svg'
import CandleChart from '../CandleChart/CandleChart'
import CandleChartTest from '../CandleChart/CandleChartMobile'
import { RootState } from '../../redux/store'


interface MobileTwoCandlesChartsWrapperProps {
    width: number,
    height: number,
    drawRulerActive: boolean
}

const MobileTwoCandlesChartsWrapper: FC<MobileTwoCandlesChartsWrapperProps> = ({width, height, drawRulerActive}) => {

    const [isFirstTeamChart, setIsFirstTeamChart] = useState<boolean>(true)

    const firstTeam = useAppSelector(state => state.tournamentSlice.firstSelectedTeam)
    const secondTeam = useAppSelector(state => state.tournamentSlice.secondSelectedTeam)

    const [isTeamsSelectionMenuOpen, setIsTeamsSelectionMenuOpen] = useState<boolean>(false)
    const [selectedTeamImg, setSelectedTeamImg] = useState<string>(`${IMG_PATH}${firstTeam?.team_img}`)

    const  changleCurrentTeamHandler = (selectedImg: string, type: number) => {
        setSelectedTeamImg(selectedImg)
        if (type === 2) {
            setIsFirstTeamChart(false)
        } else setIsFirstTeamChart(true)
    }

    const filterCandleChartByTypeOfGames = useAppSelector((state: RootState) => state.candleSliceNew.filters.byHomeAwayGames)
    const filterCandleChartByAmoutOfGoals = (useAppSelector((state: RootState) => state.candleSliceNew.filters.byAmountOfGoals))
    const filterCandleChartByTypeOfTime = useAppSelector((state: RootState) => state.candleSliceNew.filters.byTypeOfTime)

    // const teams = useAppSelector(state => state.tournamentSlice.tea)
    const candles = useAppSelector((state: RootState) => state.candleSliceNew)

    return (
        <div className={styles.mobile_two_candle_charts_wrapper}>
            <div className={styles.teams_selector} onClick={() => setIsTeamsSelectionMenuOpen(!isTeamsSelectionMenuOpen)}>
                <div className={styles.selected_team}>
                    <div className={styles.img_wrapper}>
                        <img src={selectedTeamImg} alt="" />
                    </div>
                    <div className={styles.img_wrapper_s}>
                        <img src={isTeamsSelectionMenuOpen ? arrowClose : arrowOpen} alt="" />
                    </div>
                </div>
                {isTeamsSelectionMenuOpen ?
                    <div className={styles.menu_content}>
                        <div className={styles.img_wrapper} onClick={() => changleCurrentTeamHandler(`${IMG_PATH}${firstTeam?.team_img}`, 1)}>
                            <img src={`${IMG_PATH}${firstTeam?.team_img}`} alt="" />
                        </div>
                        <div className={styles.img_wrapper} onClick={() => changleCurrentTeamHandler(`${IMG_PATH}${secondTeam?.team_img}`, 2)}>
                            <img src={`${IMG_PATH}${secondTeam?.team_img}`} alt="" />
                        </div>
                    </div> : null
                }
            </div>
            {isFirstTeamChart ? <CandleChartTest
                rulerActive={drawRulerActive}
                modifiedCandles={candles.firstSelectedTeam.candles}
                team_name={firstTeam?.team_name}
                team_img={secondTeam?.team_svg_img}
                two_candles={false}
                expandMiniCandle={() => null}
                filterByHomeAwayGames={filterCandleChartByTypeOfGames}
                filterByAmoutOfGoals={filterCandleChartByAmoutOfGoals}
                filterCandleChartByTypeOfTime={filterCandleChartByTypeOfTime}
                filter={''}
                seasons={candles.firstSelectedTeam.seasons}
                chartType={1}
                chartId='single_chart'
                width={width}
                height={height}
                twoCandlesStatus={true}
            /> :
                <CandleChartTest
                rulerActive={drawRulerActive}
                modifiedCandles={candles.secondSelectedTeam.candles}
                team_name={firstTeam?.team_name}
                team_img={secondTeam?.team_svg_img}
                two_candles={false}
                expandMiniCandle={() => null}
                filterByHomeAwayGames={filterCandleChartByTypeOfGames}
                filterByAmoutOfGoals={filterCandleChartByAmoutOfGoals}
                filterCandleChartByTypeOfTime={filterCandleChartByTypeOfTime}
                filter={''}
                seasons={candles.secondSelectedTeam.seasons}
                chartType={2}
                chartId='single_chart'
                width={width}
                height={height}
                twoCandlesStatus={true}
            />
            }
        </div>
    )
}

export default MobileTwoCandlesChartsWrapper