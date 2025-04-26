import React, {FC, useContext} from 'react';
import styles from './UniformAndEmblems.module.scss'
import TeamUniformItem from "../TeamUniformItem/TeamUniformItem";
import {useAppSelector} from "../../types/hooks";
import {IMG_PATH} from "../../api/variables";
import { ITeam } from '../../models/ITeam';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';


const UniformAndEmblems:FC = () => {
    const firstTeamSelected = useAppSelector(state => state.tournamentSlice?.firstSelectedTeam)
    const {language} = useContext(LanguageContext)
    const {theme} = useContext(ThemeContext)
    const textColor = theme === 'dark' ? 'white' : '#333333'
    return (
        <div className={styles.uniform_and_emblems}>
            <div className={styles.uniforms}>
                <TeamUniformItem uniform_img={firstTeamSelected?.tabs.form?.home_form} uniform_type={language === 'Eng' ? 'Home kit' : 'Домашняя форма'}/>
                <TeamUniformItem uniform_img={firstTeamSelected?.tabs.form?.away_form} uniform_type={language === 'Eng' ? 'Away kit' : 'Гостевая форма'}/>
                <TeamUniformItem uniform_img={firstTeamSelected?.tabs.form?.alt_form} uniform_type={language === 'Eng' ? 'Reserve kit' : 'Резервная форма'}/>
            </div>
            <div className={styles.club_description}>
                <div className={styles.img_wrapper}>
                    <img src={`${IMG_PATH}/${firstTeamSelected?.team_img}`} alt=""/>
                </div>
                <p className={styles.text} style={{color: textColor}}>{language === 'Eng' ? firstTeamSelected?.tabs.form?.design_info : firstTeamSelected?.tabs.form.design_info_ru}</p>
            </div>
        </div>
    );
};

export default UniformAndEmblems;