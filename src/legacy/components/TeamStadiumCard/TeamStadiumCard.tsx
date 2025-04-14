import React, { FC, useContext } from 'react'
import styles from './TeamStadiumCard.module.scss'
import {useAppSelector} from "../../types/hooks";
import {IMG_PATH} from "../../api/variables";
import { ITeam } from '../../models/ITeam';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';


const TeamStadiumCard: FC = () => {
    const firstTeamSelected = useAppSelector(state => state.tournamentSlice?.firstSelectedTeam)
    const {language} = useContext(LanguageContext)

    const stadium_name = language === 'Eng' ? firstTeamSelected?.tabs.stadion?.stadion_name : firstTeamSelected?.tabs.stadion?.stadion_name_ru
    const stadion_found_date = language === 'Eng' ? firstTeamSelected?.tabs.stadion?.stadion_found_date : firstTeamSelected?.tabs.stadion?.stadion_found_date_ru
    const stadion_alt_name = language === 'Eng' ? firstTeamSelected?.tabs.stadion?.stadion_alt_name : firstTeamSelected?.tabs.stadion?.stadion_alt_name_ru

    return (
        <div className={styles.stadium_description}>
            <div className={styles.description_text}>
                {language === 'Eng' ? "Stadium" : "Стадион"} <span>{stadium_name} {stadion_found_date}</span>
                <span>{stadion_alt_name}</span>
                <span>{language === 'Eng' ? 'Capacity:' : 'Вместимость'} {firstTeamSelected?.tabs.stadion?.stadion_capacity} {language === 'Eng' ? 'places.' : 'мест.'}</span>
            </div>
            <div className={styles.stadium_img}>
                <img src={`${IMG_PATH}${firstTeamSelected?.tabs.stadion?.stadion_img}`} alt="Stadium" />
            </div>
        </div>
    )
}

export default TeamStadiumCard