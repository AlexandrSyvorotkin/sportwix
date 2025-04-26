import React, { FC, useContext } from 'react';
import styles from './TeamFacts.module.scss'
import { useAppSelector } from "../../types/hooks"; import { IMG_PATH } from '../../api/variables';
import { Fact } from '../../types/InformationTabs/SingleTeamInfo/Fact';
import { RootState } from '../../redux/store';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';


interface TeamFactsProps {
}

const TeamFacts: FC<TeamFactsProps> = () => {


    const teamFacts = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.tabs.facts)
    const {language} = useContext(LanguageContext)
    const {theme} = useContext(ThemeContext)
    const textColor = theme === 'dark' ? 'white' : '#333333'

    return (
        <div className={styles.facts}>
            {teamFacts?.map((it: Fact, id: number) =>
                <div className={`${styles.fact} ${id % 2 === 0 && it.image ? styles.fact_reverse : ''}`} key={id}>
                    {it.image ? <div className={styles.img_container}>
                        <div className={styles.img_wrapper}>
                            <img src={`${IMG_PATH}${it.image}`} alt="" />
                        </div> 
                    </div>: null}
                    <div className={styles.description} style={{color: textColor}}>
                        {it.title === '_' ? null
                            :
                            <div className={styles.description_title}>
                                {language === 'Eng' ? it.title : it.title_ru}
                            </div>
                        }
                        <p>{language === 'Eng' ? it.text : it.text_ru}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamFacts;