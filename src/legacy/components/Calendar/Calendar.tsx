import React, {FC, useEffect, useState} from 'react';
import styles from './Calendar.module.scss'
import CalendarGameItem from "../CalendarGameItem/CalendarGameItem";
import ball from '../../assets/calendar/ball.svg'
import percent from '../../assets/calendar/%.png'
import { useAppSelector } from '../../types/hooks';

import CalendarSideBar from '../CalendarSideBar/CalendarSideBar';
import { RootState } from '../../redux/store';
import { ILastMatch } from '../../models/ILastMatch';


const Calendar:FC = () => {

    const isSingleTeamView = useAppSelector((state:RootState) => state.tournamentSlice.isSingleTeamView)
    const isDoubleTeamView = useAppSelector((state: RootState) => state.tournamentSlice.isDoubleTeamView)

    const recentFirstTeamMatches = useAppSelector((state:RootState) => state.tournamentSlice.firstSelectedTeam?.last_matches)

    const finishedLastMatches = recentFirstTeamMatches?.filter(game => game.status === 'finished')
    const futureMatches = recentFirstTeamMatches?.filter(game => game.status === 'notstarted')

    const [activeLastMatches, setActiveLastMatches] = useState<ILastMatch[]>([])

    let lastGamesCopy:any = [];

    if (Array.isArray(finishedLastMatches)) {
      lastGamesCopy = [...finishedLastMatches];
    } else {
      // Обработка случая, когда recentSingleTeamMatches не является массивом
      lastGamesCopy = [];
    }

    useEffect(() => {
        if (isSingleTeamView || isDoubleTeamView) {
            setActiveLastMatches(lastGamesCopy)
        } else {
            setActiveLastMatches([])
        }
    }, [isSingleTeamView, recentFirstTeamMatches, isDoubleTeamView])

    const [secondTeamForceIndex, setSecondTeamForceIndex] = useState<any>(null)

    useEffect(() => {
        setSecondTeamForceIndex(null)
    }, [recentFirstTeamMatches])

    

    return (
        <div className={styles.calendar}>
            <div className={styles.sidebar}>
                <CalendarSideBar secondTeamImg={secondTeamForceIndex?.team_img} secondTeamForceIndex={secondTeamForceIndex?.odd_score_procent}/>
            </div>
            <div className={styles.calendar_wrapper}>
                <div className={styles.calendar_imgs}>
                    <div className={styles.calendar_img_wrapper}>
                        <img src={percent} alt=""/>
                    </div>
                    <div className={styles.calendar_img_wrapper}>
                        <img src={ball} alt=""/>
                    </div>
                </div>
                <div className={styles.calendar_matches}>
                    {activeLastMatches?.slice(-10).map(single_match =>
                        <CalendarGameItem
                            key={single_match.uuid}
                            team_img={single_match.is_home ? single_match.away_team.img : single_match.home_team.img}
                            goals_selected={single_match.is_home ? single_match?.score.goals_home : single_match.score.goals_away}
                            goals_versus={single_match.is_home ? single_match?.score.goals_away : single_match.score.goals_home}
                            date={single_match.is_home ? single_match.date : single_match.date}
                            team_opponent_odds_procents={single_match.odds.team_opponent_odds_procents}
                            draw_odds_procents={single_match.odds.draw_odds_procents}
                            team_target_odds_procents={single_match.odds.team_target_odds_procents}
                            team={single_match}
                            setSecondTeamForceIndex={setSecondTeamForceIndex}
                            status={single_match.status}
                        />
                    )}
                    <div className={styles.border}/>
                    {futureMatches?.slice(0,3).map(single_match =>
                        <CalendarGameItem
                            key={single_match.uuid}
                            team_img={single_match.is_home ? single_match.away_team.img : single_match.home_team.img}
                            goals_selected={single_match.is_home ? single_match?.score.goals_home : single_match.score.goals_away}
                            goals_versus={single_match.is_home ? single_match?.score.goals_away : single_match.score.goals_home}
                            date={single_match.is_home ? single_match.date : single_match.date}
                            team_opponent_odds_procents={single_match.odds.team_opponent_odds_procents}
                            draw_odds_procents={single_match.odds.draw_odds_procents}
                            team_target_odds_procents={single_match.odds.team_target_odds_procents}
                            team={single_match}
                            setSecondTeamForceIndex={setSecondTeamForceIndex}
                            status={single_match.status}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendar;