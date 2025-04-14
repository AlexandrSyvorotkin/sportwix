import React, {FC, useContext} from 'react';
import styles from './CoachCardInformation.module.scss'
import {useAppSelector} from "../../types/hooks";
import {IMG_PATH} from "../../api/variables";
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';

interface CoachCardInformationProps {

}

const CoachCardInformation:FC<CoachCardInformationProps> = () => {

    const firstTeamSelected = useAppSelector(state => state.tournamentSlice.firstSelectedTeam)
    const {language} = useContext(LanguageContext)
    const {theme} = useContext(ThemeContext)
    const textColor = theme === 'dark' ? 'white' : '#333333'

    return (
        <div className={styles.coach_card_information}>
            <div className={styles.info_inner}>
                <div className={styles.img}>
                    <img src={`${IMG_PATH}/${firstTeamSelected?.team_coach?.img}`} alt=""/>
                </div>
                <div className={styles.dates} style={{color: textColor}}>
                    <span>{language === 'Eng' ? "Coach" : 'Тренер'}</span>
                    <span>{firstTeamSelected?.team_coach?.first_name} {firstTeamSelected?.team_coach?.last_name}</span>
                    {/* <span>from {time_start} to {time_end}</span> */}
                </div>
            </div>
            {/*<div className={styles.coach_metrics}>*/}
            {/*    <div className={styles.single_metric} style={{color: '#469A1F'}}>*/}
            {/*        <span>4,8</span>*/}
            {/*        <div className={styles.color_metrcic} style={{backgroundColor: '#469A1F'}}/>*/}
            {/*    </div>*/}
            {/*    <div className={styles.single_metric} style={{color: '#B7A503'}}>*/}
            {/*        <span>0,3</span>*/}
            {/*        <div className={styles.color_metrcic} style={{backgroundColor: '#B7A503'}}/>*/}
            {/*    </div>*/}
            {/*    <div className={styles.single_metric} style={{color: '#ED392F'}}>*/}
            {/*        <span>1,5</span>*/}
            {/*        <div className={styles.color_metrcic} style={{backgroundColor: '#ED392F'}}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default CoachCardInformation;