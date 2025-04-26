import React, {FC, useContext} from 'react';
import styles from './Sponsors.module.scss'
import {useAppSelector} from "../../types/hooks";
import { Sponsor } from '../../types/InformationTabs/SingleTeamInfo/Sponsor';
import sponsorsTitles from '../../localization/team_detail_info_section/sponsors/sponsors.json'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';

const Sponsors: FC = () => {

    const sponsors = useAppSelector<Sponsor[] | undefined>(state => state.tournamentSlice.firstSelectedTeam?.tabs.sponsors)

    const {language} = useContext(LanguageContext)
    const {theme} = useContext(ThemeContext)
    const textColor = theme === 'dark' ? 'white' : '#333333'

    return (
        <div className={styles.sponsors}>
            <div className={styles.sponsors_header} style={{color: textColor}}>
                <div className={styles.header_item}>{language === 'Eng' ? sponsorsTitles.period.eng : sponsorsTitles.period.ru}</div>
                <div className={styles.header_item}>{language === 'Eng' ? sponsorsTitles.title_sponsor.eng : sponsorsTitles.title_sponsor.ru}</div>
                <div className={styles.header_item}>{language === 'Eng' ? sponsorsTitles.uniform.eng : sponsorsTitles.uniform.ru}</div>
                <div className={styles.header_item}>{language === 'Eng' ? sponsorsTitles.contract.eng : sponsorsTitles.uniform.ru}</div>
            </div>
            <div className={styles.sponsors_list}>
                {sponsors?.map((it, id)=>
                    <div className={styles.sponsor_item} key={id} >
                        <div className={styles.sponsor_info} style={{color: textColor}}>{it.period}</div>
                        <div className={styles.title_mobile} style={{color: textColor}}>{it.title}</div>
                        <div className={styles.mobile_border}/>
                        <div className={styles.sponsor_info_detail} >
                            <div className={styles.sponsor_info_dop} style={{color: textColor}}>{it.title}</div>
                            <div className={styles.sponsor_info_dop} style={{color: textColor}}>
                                <span>{language === 'Eng' ? sponsorsTitles.period.eng : sponsorsTitles.period.ru}</span>
                                <span>{it.period}</span>
                            </div>
                            <div className={styles.sponsor_info_dop} style={{color: textColor}}>
                                <span>{language === 'Eng' ? sponsorsTitles.uniform.eng : sponsorsTitles.uniform.ru}</span>
                                <span>{it.uniform}</span>
                            </div>
                            <div className={styles.sponsor_info_dop} style={{color: textColor}}>
                                <span>{language === 'Eng' ? sponsorsTitles.contract.eng : sponsorsTitles.uniform.ru}</span>
                                <span>{it.contract}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sponsors;