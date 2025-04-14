import React, { FC, useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import styles from './RecentResultItem.module.scss'
import { IMG_PATH } from "../../api/variables";
import ball from '../../assets/other/ball.svg'
import classNames from "classnames";
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { setLoadingFalse, setLoadingTrue } from '../../redux/candle-slice/candle-slice';
import { ILastMatch } from "../../models/ILastMatch";
import { API_VARIABLES } from '../../api/variables';
import { addCandlesNew, addSeasons } from '../../redux/candle-slice/candle-slice';
import { Goal } from '../../types/types';
import { currentMatchUuid } from '../../redux/TestingConnection/TestingConnection';
import { ITeam } from '../../models/ITeam';
import { RootState } from '../../redux/store';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';

interface RecentResultItemProps {
    result: ILastMatch,
    match_id: number
}

const RecentResultItem: FC<RecentResultItemProps> = ({result, match_id}) => {

    const { theme } = useContext(ThemeContext)
    

    const { BASE_PATH, API, V1, EVENT, TEAM } = API_VARIABLES

    const dispatch = useAppDispatch()

    const [activeGoalsSection, setActiveGoalsSection] = useState<boolean>(false)

    const goalsStyles = classNames({
        [styles.goals_disabled]: !activeGoalsSection,
        [styles.goals_visible]: activeGoalsSection
    })

    const [displayTeamNames, setDisplayTeamNames] = useState<string>('none')

    const [active, setActive] = useState(false)


    function showElement(e: any,) {
        // if (result.status === 'finished') {
            // dispatch(currentMatchUuid(result.uuid))
            const container = e.target.closest("#container");
            const collapsible = container?.querySelector("#collapsible");
            const hidden =
                collapsible.style.visibility === "hidden" ||
                collapsible.style.visibility === "";

            if (hidden) {
                collapsible.style.maxHeight = `${collapsible.scrollHeight}px`;
                collapsible.style.visibility = "visible";
                collapsible.setAttribute("aria-expanded", "true");
                setActive(!active)
            } 
        // } else {
        //     return null
        // }
        
    }

    function hideElement(e: any) {
        // if (result.status === 'finished') {
            const container = e.target.closest("#container");
            const collapsible = container?.querySelector("#collapsible");

            collapsible.style.maxHeight = "0";
            collapsible.style.visibility = "hidden";
            collapsible.setAttribute("aria-expanded", "false");
            setActive(false)
        // } else {
        //     return null
        // }

    }

    
    const firstSelectedTeam = useAppSelector(state => state.tournamentSlice.firstSelectedTeam)
    const secondSelectedTeam = useAppSelector(state => state.tournamentSlice.firstSelectedTeam)


    const {isSingleTeamView, isDoubleTeamView} = useAppSelector((state: RootState) => state.tournamentSlice)

    // async function fetchSingleTeamInfoData(teamPair: ILastMatch) {
    //     const filteredTeams = teams.teams.filter((team:ITeam) => !team.is_event)
    //     dispatch(setLoadingTrue())
    //     if (isSingleTeamView || isDoubleTeamView) {
    //         const filteredTeamsArray = teams.teams.filter(it => it.team_uuid === teamPair.home_team.uuid || it.team_uuid === teamPair.away_team.uuid)
    //         const secondTeam = filteredTeamsArray.find(it => it.team_uuid !== teams.firstSelectedTeam?.team_uuid)

    //         if (secondTeam) dispatch(chooseSecondTeam(secondTeam))
            
    //         try {
    //             const {data} = await axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${secondTeam?.team_uuid}/event/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=false`)    
    //             dispatch(addCandlesNew({type: 'secondSelectedTeam', candles: data.candles}))
    //             dispatch(addSeasons({type: 'secondSelectedTeam', saeasons: data.seasons}))
    //             dispatch(switchToDoubleCandleCharts())
    //         } catch {
    //             // setError(true)
    //         } finally {
    //             dispatch(setLoadingFalse())
    //         }
    //     } else {
    //         const filteredFirstTeam = filteredTeams?.find((team:ITeam) => team.team_uuid === teamPair?.home_team.uuid)
    //         const filteredSecondTeam = filteredTeams?.find((team:ITeam) => team.team_uuid === teamPair?.away_team.uuid)

    //        if (filteredFirstTeam) dispatch(chooseFirstTeam(filteredFirstTeam))
    //     if (filteredSecondTeam) dispatch(chooseSecondTeam(filteredSecondTeam))
            
    //         try {
    //             const fisrtTeam = await axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${filteredFirstTeam?.team_uuid}/event/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=false`)
    //             const secondTeam = await axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${filteredSecondTeam?.team_uuid}/event/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=false`)    
    //             dispatch(addCandlesNew({type: 'firstSelectedTeam', candles: fisrtTeam.data.candles}))
    //             dispatch(addCandlesNew({type: 'secondSelectedTeam', candles: secondTeam.data.candles}))
    //             dispatch(addSeasons({type: 'firstSelectedTeam', saeasons: fisrtTeam.data.seasons}))
    //             dispatch(addSeasons({type: 'secondSelectedTeam', saeasons: secondTeam.data.seasons}))
    //             dispatch(switchToDoubleCandleCharts())
    //         } catch {
    //             // setError(true)
    //         } finally {
    //             dispatch(setLoadingFalse())
    //         }
    //     }    
    // }

    const totalGoals = classNames({
        [styles.total_goals]: theme === 'dark',
        [styles.total_goals_light]: theme === 'light',
    })

    const recentGamesContainerStyles = classNames({
        [styles.container]: true,
        [styles.notstarted_games]: result.status === 'notstarted'
    })

    
   


    // function filterSelectedTeams (selectedPair: ILastMatch ) {
    //     if (isSingleTeamView) {
    //         const filteredTeamsArray = teams.teams.filter(it => it.team_uuid === selectedPair.home_team.uuid || it.team_uuid === selectedPair.away_team.uuid)
    //         const secondTeam = filteredTeamsArray.find(it => it.team_uuid !== teams.firstSelectedTeam?.team_uuid)
    //         console.log(secondTeam)
    //         if (secondTeam) {
    //             dispatch(chooseSecondTeam(secondTeam))
    //         }
    //     } else {
    //         const filteredFirstTeam = filteredTeams?.find((team:ITeam) => team.team_uuid === selectedPair?.home_team.uuid)
    //         const filteredSecondTeam = filteredTeams?.find((team:ITeam) => team.team_uuid === selectedPair?.away_team.uuid)
    //         console.log(filteredFirstTeam)
    //         console.log(filteredSecondTeam)
    //         if (filteredFirstTeam && filteredSecondTeam) {
    //             dispatch(chooseFirstTeam(filteredFirstTeam))
    //             dispatch(chooseSecondTeam(filteredSecondTeam))
    //         }
    //     }
        
    // }

   
    const {language} = useContext(LanguageContext)

    const inputDate = result.date;
    const date = new Date(inputDate);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    return (
        <div className={styles.blockradius}>
            <div id='container' className={recentGamesContainerStyles} onMouseEnter={e => showElement(e)} onMouseLeave={(e) => hideElement(e)}>
                <div className={styles.title} onClick={() => null} >
                    <div className={`${styles.recent_result_item} ${styles[theme]}`} >
                        <div className={styles.team} id={`recent_game${match_id}`}>
                            <span className={styles.home_team_name}>{language === 'Eng' ? result.home_team.name :  result.home_team.name_ru}</span>
                            <div className={styles.team_logo}>
                                <img src={`${IMG_PATH}${result.home_team.img}`} alt="" />
                            </div>
                        </div>
                        <div className={totalGoals}>
                            <span>{result.status === 'finished' ? result?.score?.short_score?.full_time[0] : "-"}</span>
                            <span>:</span>
                            <span>{result.status === 'finished' ? result?.score?.short_score?.full_time[1]: '-'}</span>
                        </div>
                        <div className={styles.team}>
                            <div className={styles.team_logo}>
                                <img src={`${IMG_PATH}${result.away_team.img}`} alt="" />
                            </div>
                            <span className={styles.away_team_name}>{language === 'Eng' ? result.away_team.name : result.away_team.name_ru}</span>
                        </div>
                    </div>
                </div>
                <div id='collapsible' className={styles.collapsible}>
                    <div className={styles.detail_match_info_wrapper}>
                        <div className={styles.date}>
                            <span>{formattedDate}</span>
                        </div>
                        <div className={styles.detail_match_info}>
                            <div className={styles.goal_section_home}>
                                {result.score.goals_home.map((goal:Goal, id: number) =>
                                    <span key={id}>{goal.goal.player} {goal.goal.munite}`</span>
                                )}
                            </div>
                            <div className={styles.ball_img_wrapper}>
                                <img src={ball} alt="" />
                            </div>
                            <div className={styles.goal_section_away}>
                                {result.score.goals_away.map((goal:Goal, id: number) =>
                                    <span key={id}>{goal.goal.player} {goal.goal.munite}`</span>
                                )}
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default RecentResultItem;