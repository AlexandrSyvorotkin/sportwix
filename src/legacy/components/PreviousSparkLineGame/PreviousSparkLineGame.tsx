import React, {FC, useContext} from 'react';
import styles from './PreviousSparkLineGame.module.scss'
import classNames from "classnames";
import {IMG_PATH} from "../../api/variables";
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';

interface PreviousSparkLineGameTsProps {
    rival_team_logo: string,
    game_type?: boolean,
    team_goals: number,
    rival_team_goals: number,
    match_result?: string
}

const PreviousSparkLineGame:FC<PreviousSparkLineGameTsProps> = ({rival_team_goals, game_type, rival_team_logo, team_goals, match_result}) => {


    const final_score = classNames({
        [styles.game_final_score]: true,
        [styles.win]: team_goals > rival_team_goals,
        [styles.lose]: team_goals < rival_team_goals,
        [styles.draw]: team_goals === rival_team_goals,
    }) 

    const {language} = useContext(LanguageContext)
    const {theme} = useContext(ThemeContext)
    const homeGameType = language === 'Eng' ? 'H' : 'Д'
    const awaygameType = language === 'Eng' ? 'A' : 'Г'

    return (
        <div className={styles.previous_sparkline_game}>
            <div className={styles.game_info}>
                <div style={{color: theme === 'dark' ? 'white' : '#333333'}}>{game_type ? homeGameType : awaygameType}</div>
                <div className={final_score}>
                    <span>{team_goals}</span>
                    :
                    <span>{rival_team_goals}</span>
                </div>
            </div>
            <div className={styles.rival_team_img}>
                <img src={`${IMG_PATH}${rival_team_logo}`} alt=""/>
            </div>
        </div>
    );
};

export default PreviousSparkLineGame;