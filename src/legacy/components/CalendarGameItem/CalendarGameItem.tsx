import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from './CalendarGameItem.module.scss'
import { IMG_PATH } from '../../api/variables';
import { ITeam } from '../../models/ITeam';
import { useAppSelector } from '../../types/hooks';
import classNames from 'classnames';
import { RootState } from '../../redux/store';
import CalendarGameItemGoal from '../CalendarGameItemGoal/CalendarGameItemGoal';
import { useFetchChampionshipInfoQuery } from '../../services/championships-api/championship-api';

type Goal = {
    assist_player: string,
    assist_player_img: string,
    munite: number,
    on_time: string,
    player: string,
    player_img: string
}

interface CalendarGameItemProps {
    team?: any,
    team_img?: string,
    date?: string,
    season?: string,
    goals_selected?: any,
    goals_versus?: any,
    team_target_odds_procents: number,
    draw_odds_procents: number,
    team_opponent_odds_procents: number
    setSecondTeamForceIndex: Dispatch<SetStateAction<any>>
    status: 'finished' | 'notstarted' | 'inprogress'
}

const CalendarGameItem: FC<CalendarGameItemProps> = ({ team, team_img, date, goals_selected, goals_versus, team_opponent_odds_procents, draw_odds_procents, team_target_odds_procents, setSecondTeamForceIndex, status }) => {

    
    const parts = date?.split("-");

    // Получаем год, месяц и день

    const year = parts?.[0];

    const month = parts?.[1];

    const day = parts?.[2];

    // Форматируем дату в требуемый формат "дд.мм.гггг"
    const formattedDate = day + "." + month;

    const goalsSelectedTeam = goals_selected.map((goal:Goal, i: number) => {
        return (
            <CalendarGameItemGoal key={i} type='selected-team' goal_player={goal.player} goal_minute={goal.munite}/>
        )
    })


    const goalsVersusTeam = goals_versus.map((goal:Goal, i: number) =>
        <CalendarGameItemGoal key={i} type='versus-team' goal_player={goal.player} goal_minute={goal.munite}/>

    )

    const firstSelectedTeamUuid = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.team_uuid)


    const {championshipId, season} = useAppSelector(state => state.tournamentSlice)
    const {data} = useFetchChampionshipInfoQuery({championshipId, season})

    const filterSelectedTeams = (selectedTeam: any) => {
        if (status === 'notstarted') {
            const filteredTeam = data?.teams.filter(it => it.team_uuid === selectedTeam.home_team.uuid || it.team_uuid === selectedTeam.away_team.uuid)
            const newTeam = filteredTeam?.filter(it => it.team_uuid != firstSelectedTeamUuid)
            if (newTeam) {
                setSecondTeamForceIndex(newTeam[0])
            }
        } else {
            return null
        }
    }

   

    const [visibleProcents, setVisisibleProcents] = useState<boolean | undefined>(undefined)



    const greenDisplay = Math.round(team_target_odds_procents) < 5 ? 'none' : 'block'
    const redDisplay = Math.round(team_opponent_odds_procents) < 5 ? 'none' : 'block'

    const topBorder = greenDisplay === 'none' ? '5px' : ' '
    const bottomBorder = redDisplay === 'none' ? '5px' : ' '

    const [yellowHeight, setYellowHeight] = useState(draw_odds_procents)

    useEffect(() => {
        if (Math.round(team_target_odds_procents) < 5) {
            setYellowHeight(yellowHeight + team_target_odds_procents)
        } else if (Math.round(team_opponent_odds_procents) < 5) {
            setYellowHeight(yellowHeight + team_opponent_odds_procents)
        }
    }, [team_target_odds_procents, team_opponent_odds_procents])

    // border-bottom-left-radius: 5px;
    // border-bottom-right-radius: 5px;

    const lastGameContainerStyles = classNames({
        [styles.calendar_game_item]: true,
        [styles.future_game]: status === 'notstarted'
    })




    return (
        <div className={lastGameContainerStyles}>
            <div className={styles.img_wrapper_chart}>
                <div className={styles.green} style={{ height: `${team_target_odds_procents}%`, display: greenDisplay }}></div>
                <div className={styles.yellow} style={{ height: `${yellowHeight}%`, borderTopLeftRadius: topBorder, borderTopRightRadius: topBorder, borderBottomLeftRadius: bottomBorder, borderBottomRightRadius: bottomBorder }}></div>
                <div className={styles.red} style={{ height: `${team_opponent_odds_procents}%`, display: redDisplay }}></div>
            </div>
            <div className={styles.img_wrapper}>
                <img src={`${IMG_PATH}${team_img}`} alt="" />
            </div>
            <div className={styles.goals}>
                <div className={styles.goals_detail}>
                    {goalsSelectedTeam}
                </div>
                <div className={styles.goals_detail}>
                    {goalsVersusTeam}
                </div>

            </div>
            <div className={styles.dates}>
                <span>{formattedDate}</span>
            </div>
        </div>
    );
};

export default CalendarGameItem;