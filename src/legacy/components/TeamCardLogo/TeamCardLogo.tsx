import React, {FC, useContext} from 'react';
import styles from './TeamCardLogo.module.scss'
import {useAppSelector} from "../../types/hooks";
import {IMG_PATH} from "../../api/variables";
import { ITeam } from '../../models/ITeam';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import classNames from 'classnames';

interface TeamCardLogoProps {
}

const TeamCardLogo:FC<TeamCardLogoProps> = () => {
    const firstTeamSelected = useAppSelector(state => state.tournamentSlice.firstSelectedTeam)
    
    const {language} = useContext(LanguageContext)

    const team_name = language === 'Eng' ? firstTeamSelected?.team_name :  firstTeamSelected?.team_name_ru
    const team_alter_name = language === 'Eng' ? firstTeamSelected?.tabs.team_alter_name : firstTeamSelected?.tabs.team_alter_name_ru

    const {theme} = useContext(ThemeContext)
    const textColor = theme === 'dark' ? 'white' : '#333333'

    const teamCardStyles = classNames({
        [styles.team_card_logo]: true,
        [styles.border_dark]: theme === 'dark',
        [styles.border_light]: theme === 'light'
    })


    return (
        <div className={teamCardStyles}>
                <div className={styles.logo}>
                    <img src={`${IMG_PATH}${firstTeamSelected?.team_img}`} alt=""/>
                </div>
                <div className={styles.club_description} style={{color: textColor}}>
                    <div>{team_name}</div>
                    <div>{team_alter_name}</div>
                    <div>{language === 'Eng' ? "Founded in" : "Основан в"} {firstTeamSelected?.tabs.team_found_date}</div>
                </div>
        </div>
    );
};

export default TeamCardLogo;