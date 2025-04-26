import React, {FC, useContext} from 'react';
import styles from './SingleCupTeamAchievment.module.scss'
import {useAppSelector} from "../../types/hooks";
import { IMG_PATH } from '../../api/variables';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import classNames from 'classnames';



interface AchievementProps {
    bronse_of_league: number,
    coeff_games: number,
    count_games: number,
    gold_of_league: number,
    league_name: string,
    silver_of_league: number
    img: string
}

const SingleCupTeamAchievement:FC<AchievementProps> = ({coeff_games, count_games, league_name, gold_of_league, bronse_of_league, silver_of_league, img}) => {

    const {language} = useContext(LanguageContext)
    const {theme} = useContext(ThemeContext)
    const textColor = theme === 'dark' ? 'white' : '#333333'


    const singleCupAchievementStyles = classNames({
        [styles.single_cup_team_achievement]:true,
        [styles.border_dark]: theme === 'dark',
        [styles.border_light]: theme === 'light'
    })

    return (
        <div className={singleCupAchievementStyles}>
            <div className={styles.cup_description}>
                <div className={styles.cup_img_container}>
                    <div className={styles.cup_img_wrapper}>
                        <img src={`${IMG_PATH}${img}`} alt=""/>
                    </div>
                </div>
                <p className={styles.cup_title} style={{color: textColor}}>{league_name}</p>
            </div>
            <div className={styles.achievement_border}/>
            <div className={styles.metrics}>
                <div className={styles.metric_item} style={{color: textColor}}>
                    <div className={styles.metric_type}>{language === 'Eng' ? "Total games" : "Всего игр"}</div>
                    <div className={styles.games} style={{color: textColor}}>{count_games}</div>
                </div>
                <div className={styles.metric_item} style={{color: textColor}}>
                    <div className={styles.metric_type}>{language === 'Eng' ? "Prizes coefficient" : "Коефф. побед"}</div>
                    <div className={styles.games} style={{color: textColor}}>{coeff_games}</div>
                </div>
                <div className={styles.metric_item} style={{color: textColor}}>
                    <div className={styles.metric_type}>{language === 'Eng' ? "Prize" : "Награды"}</div>
                    <div className={styles.titles_quantities}>
                        <div className={styles.cup} style={{backgroundColor: '#EBBB41', border: "3px solid #B3891F", color: '#8D6C16'}}>{gold_of_league}</div>
                        <div className={styles.cup} style={{backgroundColor: '#A8A8A8', border: "3px solid #867D7D", color: '#615A5A'}}>{silver_of_league}</div>
                        <div className={styles.cup} style={{backgroundColor: '#92683C', border : "3px solid #5C3E1F", color: '#4F3418'}}>{bronse_of_league}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCupTeamAchievement;