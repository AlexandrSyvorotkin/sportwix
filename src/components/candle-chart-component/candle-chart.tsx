import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react'
import styles from './candle-chart.module.scss'
import { useAppSelector } from '../../types/hooks'
import { Candle } from '../../models/Candle'
import leagueLogo from '@assets/icons/epllogo.svg'
import { candleSeasons } from '../../types/candleSeason'
import { candleParameters } from '../../types/candleParameters'
import { useFetchTeamCandlesQuery } from '../../services/candles-api/candle-api'
import { RootState } from '@store/store'
import { CandleChartParams } from '@components/candle-chart-params'
// @ts-ignore
import { candleChart } from '@charts/candle-chart/candle-chart'

interface CandleChartProps {
  rulerActive?: boolean
  modifiedCandles: Candle[]
  team_img: string | undefined
  team_name: string | undefined
  two_candles: boolean
  filterByHomeAwayGames: string
  filterByAmoutOfGoals: string
  filterCandleChartByTypeOfTime: string
  expandMiniCandle?: MouseEventHandler<HTMLButtonElement>
  seasons: candleSeasons[]
  chartVisible?: boolean
  chartType?: number
  chartId: string
  width?: number
  height?: number
}

import candles from '../../mocks/mock-candles.json'

const CandleChart: FC<CandleChartProps> = ({
  rulerActive,
  filterByHomeAwayGames,
  filterByAmoutOfGoals,
  filterCandleChartByTypeOfTime,
  chartType,
  team_img,
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const firstTeamSelectedUuid = useAppSelector(state => state.tournamentSlice.firstSelectedTeamUuid)
  const currentSeasonsAmount = useAppSelector(
    state => state.tournamentSlice.filters.candleChartFilters.currentSeasonsAmount
  )
  const spliteType = useAppSelector(
    state => state.tournamentSlice.filters.candleChartFilters.spliteType
  )

  const { data } = useFetchTeamCandlesQuery({
    team_uuid: firstTeamSelectedUuid,
    seasonsAmount: currentSeasonsAmount,
    spliteType: spliteType,
  })

  // console.log(data)

  // console.log(modifiedCandles)
  // const dispatch = useAppDispatch()
  const currentMatchUuid = useAppSelector((state: RootState) => state.test.matchUuid)
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
      time: undefined,
    },
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

  const theme = 'dark'

  const [miniNews, setMiniNews] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    candleChart(
      ctx,
      canvasRef.current,
      candles?.candles,
      setCandleParams,
      data?.seasons,
      theme,
      filterByHomeAwayGames,
      filterByAmoutOfGoals,
      filterCandleChartByTypeOfTime,
      teams,
      chartType,
      leagueLogo, // team_img
      teams.first_team_img,
      teams.second_team_img,
      setMiniNews,
      width,
      height
    )
  }, [
    candles?.candles,
    // candleParams,
    theme,
    filterByHomeAwayGames,
    filterByAmoutOfGoals,
    filterCandleChartByTypeOfTime,
    rulerActive,
    width,
    height,
    currentMatchUuid,
  ])

  return (
    <div className={styles.chart_container} style={{ width: '100%' }}>
      <CandleChartParams
        team_img={team_img}
        team_name={firstSelectedTeam?.team_name}
        two_candle={false}
        candleParams={candleParams.params}
      />
      <div style={{ borderTop: '1px solid #333' }} className={styles.canvas_container}>
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className={styles.team_img}>
          <div className={styles.team_wrapper}>
            <img src={`${team_img}`} alt="" />
          </div>
        </div>
        <div className={styles.news_tooltip} id="news_tooltip">
          {miniNews.map((single_news: any, id: number) => (
            <div className={styles.mini_news} key={id}>
              <div className={styles.img_wrapper}>
                <img src={`${single_news.header_img}`} alt="" />
              </div>
              <div className={styles.news_info}>
                <p>{single_news.header_title}</p>
                <div>{single_news.header_date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { CandleChart }
