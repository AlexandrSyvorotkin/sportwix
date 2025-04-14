import React, { FC, useEffect, useState, useRef, useContext } from 'react';
import styles from './SparkLineSection.module.scss'
import TeamSparkLine from "../TeamSparkLine/TeamSparkLine";
import { ITeam } from "../../models/ITeam";
import CandlesMini from '../CandlesMini/CandlesMini';
import TeamSparklineMobile from '../TeamSparklineMobile/TeamSparklineMobile';
import SparklineHeader from '../SparklineHeader/SparklineHeader';
import sparklineCap from '../../localization/sparkline/sparkline-cap.json'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { IMG_PATH } from '../../api/variables';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { useAppSelector } from '../../types/hooks';
import { RootState } from '../../redux/store';
import classNames from 'classnames';
import LoaderAlt from '../Loader2/LoaderAlt';
import { useFetchChampionshipInfoQuery } from '../../services/championships-api/championship-api';

interface SparkLineSectionProps {
    sectionWidth: number,
}

const SparkLineSection: FC<SparkLineSectionProps> = ({ sectionWidth }) => {

    const { language } = useContext(LanguageContext)
    const { theme } = useContext(ThemeContext)
    const interfaceState = useAppSelector((state: RootState) => state.interfaceState)

    const {championshipId, season} = useAppSelector(state => state.tournamentSlice)
    const { data, isLoading, error, isFetching } = useFetchChampionshipInfoQuery({ championshipId, season })


    // console.log(isLoading, 'table')

    const teams = data?.teams?.filter((team: ITeam) => !team.is_event)
   

    const sparklineHeaderColors = classNames({
        [styles.header]: true,
        [styles.bkg_light]: theme === 'light',
        [styles.bkg_dark]: theme === 'dark'
    })

    const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'
    const [isFutureGame, setIsFutureGame] = useState(true)

    const championshipTeams = useAppSelector(state => state.tournamentSlice.tournament?.teams.filter(((team:ITeam) => !team.is_event)))

    return (
            <div className={styles.sparkline_wrapper} id='sparkline'>
                <div className={sparklineHeaderColors} style={{borderBottom: border}}>
                    <div className={styles.header_items} >
                        <div className={styles.team_pos}>{language === 'Eng' ? sparklineCap[0].eng : sparklineCap[0].ru}</div>
                        <div className={styles.team_img}>{language === 'Eng' ? sparklineCap[1].eng : sparklineCap[1].ru}</div>
                        <div className={styles.team_coach}>{language === 'Eng' ? sparklineCap[2].eng : sparklineCap[2].ru}</div>
                        <div className={styles.team_name}>{language === 'Eng' ? sparklineCap[3].eng : sparklineCap[3].ru}</div>
                        <div className={styles.season_bar}>{language === 'Eng' ? sparklineCap[4].eng : sparklineCap[4].ru}</div>
                        <div className={styles.line_chart}>{language === 'Eng' ? sparklineCap[5].eng : sparklineCap[5].ru}</div>
                        {interfaceState.mobile.expandSections.sparklineSection ? <div className={styles.medals}>{language === 'Eng' ? sparklineCap[6].eng : sparklineCap[6].ru}</div> : null}
                        <div className={styles.last_games}>{language === 'Eng' ? sparklineCap[7].eng : sparklineCap[7].ru}</div>
                        {/* {isFutureGame ?
                            <div className={styles.next_game}>{language === 'Eng' ? sparklineCap[8].eng : sparklineCap[8].ru}</div>
                        :  null
                        } */}
                        <div className={styles.next_game}>{language === 'Eng' ? sparklineCap[8].eng : sparklineCap[8].ru}</div>
                    </div>
                </div>
                {isFetching ? <LoaderAlt/> :
                    <div>
                    {teams?.map((team: ITeam, id: number) =>
                        <TeamSparkLine section_width={sectionWidth} team={team} id={id} uuid={team.team_uuid} key={id} setIsFutureGame={setIsFutureGame}/>
                    )}
                </div>
                }
            </div>
    );
};

export default SparkLineSection;
