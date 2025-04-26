import { ITeam } from '../../models/ITeam'
import styles from './TeamSparklineMobile.module.scss'
import { FC, useState, useEffect, useRef, useContext } from 'react'
import { IMG_PATH } from '../../api/variables'
import SparkLineSeasonResultBar from '../SparkLineSeasonResultBar/SparkLineSeasonResultBar'
import PreviousSparkLineGame from '../PreviousSparkLineGame/PreviousSparkLineGame'
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { addCandlesNew, addSeasons, } from '../../redux/candle-slice/candle-slice'
import { setLoadingFalse, setLoadingTrue } from '../../redux/candle-slice/candle-slice';
import { API_VARIABLES } from '../../api/variables';
import axios from 'axios'
import PieChart from '../PieChart/PieChart';
import ProgressCircle from '../ProgressCircle/ProgressCircle'
import LineChart from '../LineChart/LineChart'
import CandlesMini from '../CandlesMini/CandlesMini'
import LineChartMobile from '../LineChartMobile/LineChartMobile'
import NextGameSparkLine from '../NextGameSparkline/NextGameSparkLine'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import sparklineCap from '../../localization/sparkline/sparkline-cap.json'
import SparklineArrowPoints from '../SparklineArrowPoints/SparklineArrowPoints'
import LineChartLastCandlePos from '../LineChartLastCandlePos/LineChartLastCandlePos'
import { chooseFirstTeam, switchToSingleCandleChart } from '../../redux/tournament-slice/tournament-slice'
import { useFetchChampionshipInfoQuery } from '../../services/championships-api/championship-api'
import { filterTeams } from '../../utils/filterTeams'

interface TeamSparklineMobileProps {
    teams?: ITeam[]
}

const TeamSparklineMobile: FC<TeamSparklineMobileProps> = ({ teams }) => {

    const dispatch = useAppDispatch()
    const loadingCandles = useAppSelector(state => state.candleSliceNew.loading)
    const { BASE_PATH, API, V1, EVENT, TEAM } = API_VARIABLES

    const {championshipId, season} = useAppSelector(state => state.tournamentSlice)
    const { data, isLoading, error, isFetching } = useFetchChampionshipInfoQuery({ championshipId, season })

    const filteredTeams = filterTeams(data?.teams)

    function fetchSingleTeamInfoData(team: ITeam) {

        dispatch(setLoadingTrue())

        if (!loadingCandles) {
            dispatch(switchToSingleCandleChart())
            dispatch(chooseFirstTeam(team))


            axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${team.team_uuid}/${EVENT}/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=false`).then((response => {
                // dispatch(filterByTimesRedux('Полный матч'))  
                dispatch(addCandlesNew({ type: 'firstSelectedTeam', candles: response.data.candles }))
                dispatch(addSeasons({ type: 'firstSelectedTeam', saeasons: response.data.seasons }))
                // console.log(response)

            })).finally(() => {
                dispatch(setLoadingFalse())
            })
        }

    }

    // function fetchSingleTeamInfoData(team: ITeam) {

    //     dispatch(setLoadingTrue())

    //     if (!loadingCandles) {
    //     dispatch(switchToSingleCandleChart())
    //         // setSelectedTeamUuid(id)
    //         dispatch(chooseFirstTeam(team))


    //         axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${team.team_uuid}/${EVENT}/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=false`).then((response => {
    //             dispatch(addCandlesNew(response.data.candles))
    //             dispatch(addSeasons(response.data.seasons))
    //             // dispatch(filterByTimesRedux('Полный матч'))


    //         })).finally(() => {
    //             dispatch(setLoadingFalse())
    //         })
    //     }

    // }

    const candleCanvasRef = useRef(null)

    const { language } = useContext(LanguageContext)

    // const finishedLastGames 

    // let pointsDifference
    // let pointsDifferenceColor

    // switch (lastGame[0].match_result) {
    //     case 'win':
    //         pointsDifference = '+3';
    //         pointsDifferenceColor = '#51B136';
    //         break;
    //     case 'draw':
    //         pointsDifference = '+1';
    //         pointsDifferenceColor = '#B7A503';
    //         break;
    //     case 'loss':
    //         pointsDifference = '0';
    //         pointsDifferenceColor = '#C00000';
    //         break;
    //     default:
    //         break;
    // }

    function getColorAndPointsDifference(matchResult: any) {
        let pointsDifference
        let pointsDifferenceColor
        switch (matchResult) {
            case 'win':
                pointsDifference = '+3';
                pointsDifferenceColor = '#51B136';
                break;
            case 'draw':
                pointsDifference = '+1';
                pointsDifferenceColor = '#B7A503';
                break;
            case 'loss':
                pointsDifference = '0';
                pointsDifferenceColor = '#C00000';
                break;
            default:
                break;
        }
        return { pointsDifference, pointsDifferenceColor }
    }

    return (
        <>
            <div className={styles.sparks_list}>
                <div className={styles.sparks_list_header}>
                    <div className={styles.team_pos}>{language === 'Eng' ? sparklineCap[0].eng : sparklineCap[0].ru}</div>
                    <div className={styles.team_name_header}>{language === 'Eng' ? sparklineCap[1].eng : sparklineCap[1].ru}</div>
                </div>
                {filteredTeams?.map((team: ITeam, id: number) =>
                    <div className={styles.sparkline_item} id={`mobile_sparkline_team+${id}`} onClick={() => fetchSingleTeamInfoData(team)} key={team.team_uuid}>
                        <div className={styles.team_number}>
                            {id + 1}
                        </div>
                        <div className={styles.team_logo_wrapper}>
                            <div className={styles.team_logo}>
                                <img src={`${IMG_PATH}${team?.team_img}`} alt="" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.dop_sparkline_info} id='scroll-sparkline'>
                <div className={styles.dop_header}>
                    <div className={styles.team_coach_header}>{language === 'Eng' ? sparklineCap[2].eng : sparklineCap[2].ru}</div>
                    <div className={styles.team_points_header}>{language === 'Eng' ? sparklineCap[3].eng : sparklineCap[3].ru}</div>
                    <div className={styles.line_char_header}>{language === 'Eng' ? sparklineCap[5].mobile_eng : sparklineCap[5].mobile_ru}</div>
                    <div className={styles.last_games_header}>{language === 'Eng' ? sparklineCap[6].eng : sparklineCap[6].ru}</div>
                    <div className={styles.next_game_header}>{language === 'Eng' ? sparklineCap[7].eng : sparklineCap[7].ru}</div>
                </div>
                {filteredTeams?.map((team: ITeam, id: number) =>
                    <div className={styles.dop_spakrs_info_item} key={team.team_uuid}>
                        <div className={styles.logo_coach_container}>
                            <div className={styles.coach_wrapper} id={`mobile_sparkline_coach+${id}`}>
                                <div className={styles.team_coach}>
                                    <img src={`${IMG_PATH}${team.team_coach?.img}`} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.team_info} id={`mobile_sparkline_info+${id}`}>
                            <div className={styles.team_name}>{language === 'Eng' ? team?.team_short_name : team?.team_short_name_ru}</div>
                            <div className={styles.points_info}>
                                <div className={styles.points}>{team.score}(P)</div>
                                {team.last_matches?.filter(game => game.status === 'finished').slice(-1)[0].match_result === 'win' || team.last_matches?.filter(game => game.status === 'finished').slice(-1)[0].match_result === 'draw' ? <SparklineArrowPoints isPositive={true} /> : <SparklineArrowPoints isPositive={false} />}
                                <div style={{ color: getColorAndPointsDifference(team.last_matches?.filter(game => game.status === 'finished').slice(-1)[0].match_result).pointsDifferenceColor }}>
                                    {getColorAndPointsDifference(team.last_matches?.filter(game => game.status === 'finished').slice(-1)[0].match_result).pointsDifference}
                                </div>
                            </div>
                        </div>
                        <div className={styles.line_chart_and_last_candle_pos} id='mobile-line-chart'>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <LineChartMobile candles={team.candles} />
                                <SparkLineSeasonResultBar
                                    wins={team.wins}
                                    draws={team.draws}
                                    losses={team.losses}
                                    setIsAlternativeResultsVisible={() => null}
                                    height={2}
                                    width={100}
                                    isDopInfo={false}
                                />
                            </div>
                            <LineChartLastCandlePos lastCandles={team.candles.slice(-2)} />
                        </div>
                        <div className={styles.last_matches} id='last-matches-mobile'>
                            <div className={styles.border} style={{ height: '40px' }} />
                            {team.last_matches.filter(game => game.status === 'finished').slice(-3).map(game =>
                                !game.is_home ?
                                    <PreviousSparkLineGame
                                        key={game.uuid}
                                        rival_team_logo={game.home_team.img}
                                        game_type={game.is_home}
                                        team_goals={game.is_home ? game.score.short_score.full_time[0] : game.score.short_score.full_time[1]}
                                        rival_team_goals={game.is_home ? game.score.short_score.full_time[1] : game.score.short_score.full_time[0]}
                                        match_result={game.match_result}
                                    />
                                    :
                                    <PreviousSparkLineGame
                                        key={game.uuid}
                                        rival_team_logo={game.away_team.img}
                                        game_type={game.is_home}
                                        team_goals={game.is_home ? game.score.short_score.full_time[0] : game.score.short_score.full_time[1]}
                                        rival_team_goals={game.is_home ? game.score.short_score.full_time[1] : game.score.short_score.full_time[0]}
                                        match_result={game.match_result}
                                    />
                            )}
                            <div className={styles.border} style={{ height: '40px' }} />
                        </div>
                        <div className={styles.next_game} id='next-game-mobile'>
                            {team.last_matches.filter(game => game.status === 'notstarted').slice(0, 1).map(game =>
                                <NextGameSparkLine
                                    key={game.uuid}
                                    team_logo={game.is_home ? game.away_team.img : game.home_team.img}
                                    match_type={game.is_home}
                                    possible_winning_percentage={game.odds.team_target_odds_procents}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default TeamSparklineMobile