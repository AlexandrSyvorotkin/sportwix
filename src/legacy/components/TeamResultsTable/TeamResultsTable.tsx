import React, { FC, useContext } from 'react';
import styles from './TeamResultsTable.module.scss'
import TeamCardLogo from "../TeamCardLogo/TeamCardLogo";
import CoachCardInformation from "../CoachCardInformation/CoachCardInformation";
import classNames from "classnames";
import { useAppSelector } from '../../types/hooks';
import { TeamSeasonResult } from '../../types/InformationTabs/TeamSeasonsResults/TeamSeasonResults';
import { RootState } from '../../redux/store';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import team_results_table from '../../localization/team_detail_info_section/team_results_table/team_results_table.json'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';

interface TeamResultsTableProps {
}

const TeamResultsTable: FC<TeamResultsTableProps> = () => {

    // TODO: дописать стили переписать компонент

    const firstSelectedTeamSeasonResults = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.tabs.seasons)

    let reversedArray = [];

    if (firstSelectedTeamSeasonResults) {
        for (let i = firstSelectedTeamSeasonResults?.length - 1; i >= 0; i--) {
            reversedArray.push(firstSelectedTeamSeasonResults[i]);
        }
    }

    const getPlaceStyles = (place: string | null) => {
        return classNames({
            [styles.season_parameter_price_place]: true,
            [styles.season_parameter_1st_prize]: place === '1',
            [styles.season_parameter_2st_prize]: place === "2",
            [styles.season_parameter_3st_prize]: place === "3"
        });
    };

    const {language} = useContext(LanguageContext) 
    const {theme} = useContext(ThemeContext)
    const textColor = theme === 'dark' ? 'white' : '#333333'


    const tableHeaderListStyles = classNames({
        [styles.table_header_list]: true,
        [styles.table_header_list_dark]: theme === 'dark',
        [styles.table_header_list_light]: theme === 'light'
    })

    const parameterHeader = classNames({
        [styles.season_parameter_header]: true,
        [styles.seasons_parameter_header_dark]: theme === 'dark',
        [styles.seasons_parameter_header_light]: theme === 'light'
    })

    return (
        <div className={styles.results_table}>
            <div className={styles.club_coach_section}>
                <TeamCardLogo/>
                <CoachCardInformation
                />
            </div>
            <div className={styles.table_info}>
                <div className={tableHeaderListStyles} >
                    <div className={parameterHeader} style={{color: textColor}}>{language === 'Eng' ? team_results_table.season.eng : team_results_table.season.ru}</div>
                    <div className={parameterHeader} style={{color: textColor}}>{language === 'Eng' ? team_results_table.epl.eng : team_results_table.epl.ru}</div>
                    <div className={parameterHeader} style={{color: textColor}}>{language === 'Eng' ? team_results_table.eng_cup.eng : team_results_table.eng_cup.ru}</div>
                    <div className={parameterHeader} style={{color: textColor}}>{language === 'Eng' ? team_results_table.league_cup.eng : team_results_table.league_cup.ru}</div>
                    <div className={parameterHeader} style={{color: textColor}}>{language === 'Eng' ? team_results_table.ucl.eng : team_results_table.ucl.ru}</div>
                    <div className={parameterHeader} style={{color: textColor}}>{language === 'Eng' ? team_results_table.el.eng : team_results_table.el.ru}</div>
                    <div className={parameterHeader} style={{color: textColor}}>{language === 'Eng' ? team_results_table.cs.eng : team_results_table.cs.ru}</div>
                </div>
                <div className={styles.results}>
                    {reversedArray?.map((it: any) =>
                        <div key={it.season} className={styles.table_header} >
                            <div className={styles.season_parameter_title} style={{color: textColor}}>
                                <span>{language === 'Eng' ? team_results_table.season.eng : team_results_table.season.ru}</span>
                                <span>{it.season}</span>
                            </div>
                            <div className={styles.seasons_params_info}>
                                <div className={styles.season_parameter} style={{color: textColor}}>
                                    <span>{language === 'Eng' ? team_results_table.epl.eng : team_results_table.epl.ru}</span>
                                    <div className={getPlaceStyles(it["Premier League"])}>{it["Premier League"]}</div>
                                </div>
                                <div className={styles.season_parameter} style={{color: textColor}}>
                                    <span>{language === 'Eng' ? team_results_table.eng_cup.eng : team_results_table.eng_cup.ru}</span>
                                    <div className={getPlaceStyles(it["FA Cup"])}>{it["FA Cup"]}</div>
                                </div>
                                <div className={styles.season_parameter} style={{color: textColor}}>
                                    <span>{language === 'Eng' ? team_results_table.league_cup.eng : team_results_table.league_cup.ru}</span>
                                    <div className={getPlaceStyles(it["League Cup"])}>{it["League Cup"]}</div>
                                </div>
                                <div className={styles.season_parameter} style={{color: textColor}}>
                                    <span>{language === 'Eng' ? team_results_table.ucl.eng : team_results_table.ucl.ru}</span>
                                    <div className={getPlaceStyles(it["UEFA Champions League"])}>{it["UEFA Champions League"]}</div>
                                </div>
                                <div className={styles.season_parameter} style={{color: textColor}}>
                                    <span>{language === 'Eng' ? team_results_table.el.eng : team_results_table.el.ru}</span>
                                    <div className={getPlaceStyles(it["Europa League"])}>{it["Europa League"]}</div>
                                </div>
                                <div className={styles.season_parameter} style={{color: textColor}}>
                                    <span>{language === 'Eng' ? team_results_table.cs.eng : team_results_table.cs.ru}</span>
                                    <div className={getPlaceStyles(it["FA Community Shield"])}>{it["FA Community Shield"]}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamResultsTable;