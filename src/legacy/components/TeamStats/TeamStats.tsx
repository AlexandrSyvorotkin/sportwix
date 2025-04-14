import React, { useContext, useEffect, useState } from 'react';
import styles from './TeamStats.module.scss'
import { FC } from 'react';
import select_arrow from '../../assets/select-arrows/open-arrow.svg'
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { IMG_PATH } from '../../api/variables';
import classNames from 'classnames';
import TeamStatSelect from '../../ui/Selections/teamStatSelect/TeamStatSelect';
import { ITeam } from '../../models/ITeam';
import epllogo from '../../assets/epllogo.png'
import TeamParameter from '../TeamParameter/TeamParameter';
import ParamStatSelect from '../../ui/Selections/ParamStatSelect/ParamStatSelect';
import GamesTimeFrameStatSelect from '../../ui/Selections/GameStatSelect/GameStatSelect';

import times_selectors from '../../localization/team_detail_info_section/team_stats/times_selectors.json'
import games_selectors from '../../localization/team_detail_info_section/team_stats/games_selectors.json'
import team_stats from '../../localization/team_detail_info_section/team_stats/team_stats.json'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { RootState } from '../../redux/store';
import LoaderAlt from '../Loader2/LoaderAlt';
import { useFetchChampionshipInfoQuery } from '../../services/championships-api/championship-api';


const TeamStats: FC = () => {

    const [activeSelector, setActiveSelector] = useState(3)
    const {language} = useContext(LanguageContext)

    const dispatch = useAppDispatch()

    // console.log(activeSelector)

    const [firstSelectedTeamMetrics, setFirstSelectedTeamParams] = useState<any>(null)
    const [secondSelectedTeamMetrics, setSecondSelectedTeamMetrics] = useState<any>(null)

    const firstTeam = useAppSelector(state => state.tournamentSlice.firstSelectedTeam)
    const secondTeam = useAppSelector(state => state.tournamentSlice.secondSelectedTeam)

    const [gamesTimeFrame, setActiveGameTimeFrame] = useState<string>('1 game')

    const teamTableH2h = useAppSelector((state: RootState) => state.tournamentSlice.h2h.isH2h.teamTable)
    const firstTeamH2h = useAppSelector((state:RootState) => state.tournamentSlice.h2h.teamStatsTable.firstTeamH2h)
    const secondTeamH2h = useAppSelector((state:RootState) => state.tournamentSlice.h2h.teamStatsTable.secondTeamH2h)

    const h2hTeamTableStatus = useAppSelector((state:RootState) => state.tournamentSlice.h2h.isH2h.teamTable)
    const [isLoadingH2h, setIsLoadingH2h] = useState<boolean>(false)

    // console.log(firstTeamH2h, secondTeamH2h)

    useEffect(() => {
        if (teamTableH2h) {
            setActiveGameTimeFrame('Сезон')
        } else if (!teamTableH2h) {
            setActiveGameTimeFrame('1 игра')
        }
    }, [teamTableH2h])

    const [timeFrame, setActiveTimeFrame] = useState<string>('1 time')

    useEffect(() => {
        if (h2hTeamTableStatus) {
            if (activeSelector === 1) {
                setFirstSelectedTeamParams(firstTeamH2h?.timeframe_all.time_1)
                setSecondSelectedTeamMetrics(secondTeamH2h?.timeframe_all.time_1)
            } else if (activeSelector === 2) {
                setFirstSelectedTeamParams(firstTeamH2h?.timeframe_all.time_2)
                setSecondSelectedTeamMetrics(secondTeamH2h?.timeframe_all.time_2)
            } else if (activeSelector === 3) {
                setFirstSelectedTeamParams(firstTeamH2h?.timeframe_all.full_time)
                setSecondSelectedTeamMetrics(secondTeamH2h?.timeframe_all.full_time)
            }
        } else if (!h2hTeamTableStatus) {
            if (activeSelector === 1) {
                setFirstSelectedTeamParams(firstTeam?.metrics?.timeframe_1.time_1)
                setSecondSelectedTeamMetrics(secondTeam?.metrics?.timeframe_1.time_1)
            } else if (activeSelector === 2) {
                setFirstSelectedTeamParams(firstTeam?.metrics?.timeframe_1.time_2)
                setSecondSelectedTeamMetrics(secondTeam?.metrics?.timeframe_1.time_2)
            } else if (activeSelector === 3) {
                setFirstSelectedTeamParams(firstTeam?.metrics?.timeframe_1.full_time)
                setSecondSelectedTeamMetrics(secondTeam?.metrics?.timeframe_1.full_time)
            }
        }
        
    }, [firstTeam, secondTeam, activeSelector, h2hTeamTableStatus, firstTeamH2h, secondTeamH2h])

    
    const timeSelectors = [
        { id: 1, title: language === 'Eng' ? times_selectors.first_time.eng : times_selectors.first_time.ru},
        { id: 2, title: language === 'Eng' ? times_selectors.second_time.eng : times_selectors.second_time.ru },
        { id: 3, title: language === 'Eng' ? times_selectors.full_time.eng : times_selectors.full_time.ru },
    ]


    const gameSelectors = [
        { id: 1, title: language === 'Eng' ? games_selectors['1game'].eng : games_selectors['1game'].ru, params_first: firstTeam?.metrics?.timeframe_1.full_time, params_second: secondTeam?.metrics?.timeframe_1.full_time },
        { id: 2, title: language === 'Eng' ? games_selectors['3games'].eng : games_selectors['3games'].ru, params_first: firstTeam?.metrics?.timeframe_3.full_time, params_second: secondTeam?.metrics?.timeframe_3.full_time },
        { id: 3, title: language === 'Eng' ? games_selectors['5games'].eng : games_selectors['5games'].ru, params_first: firstTeam?.metrics?.timeframe_5.full_time, params_second: secondTeam?.metrics?.timeframe_5.full_time },
        { id: 4, title: language === 'Eng' ? games_selectors['10games'].eng : games_selectors['10games'].ru, params_first: firstTeam?.metrics?.timeframe_10.full_time, params_second: secondTeam?.metrics?.timeframe_10.full_time },
        { id: 5, title: language === 'Eng' ? games_selectors['15games'].eng : games_selectors['15games'].ru, params_first: firstTeam?.metrics?.timeframe_15.full_time, params_second: secondTeam?.metrics?.timeframe_15.full_time },
        { id: 6, title: language === 'Eng' ? games_selectors.season.eng : games_selectors.season.ru, params_first: firstTeam?.metrics?.timeframe_all.full_time, params_second: secondTeam?.metrics?.timeframe_all.full_time },
    ]

 

    const {championshipId, season} = useAppSelector(state => state.tournamentSlice)
    const { data } = useFetchChampionshipInfoQuery({championshipId, season})


    const [activeId, setActiveId] = useState(1)

    const [metricsVisibility, setMetricsVisibility] = useState({
        goals_scored: true,
        goals_conceded: true,
        delta_goals: true,
        xg_sum: true,
        ball_possession: true,
        total_shots: true,
        innaccurate_passes: false,
        accurate_passes: false,
        bch: false,
        bchm: false,
        avg_coeff: false,
        offsides: false,
        corners: false
    })


    const teamStatisticsParamsList = [
        { id: 1, component: <TeamParameter activeGameTimeFrame={activeSelector} title={team_stats.goals_scored} first_selected_param={firstSelectedTeamMetrics?.goals_scored} second_selected_param={secondSelectedTeamMetrics?.goals_scored} visible={metricsVisibility.goals_scored} type={1}/> },
        { id: 2, component: <TeamParameter activeGameTimeFrame={activeSelector} title={team_stats.goals_conceded} first_selected_param={firstSelectedTeamMetrics?.goals_conceded} second_selected_param={secondSelectedTeamMetrics?.goals_conceded} visible={metricsVisibility.goals_conceded} type={2}/> },
        { id: 3, component: <TeamParameter activeGameTimeFrame={activeSelector} title={team_stats.delta_goals} first_selected_param={firstSelectedTeamMetrics?.delta_goals} second_selected_param={secondSelectedTeamMetrics?.delta_goals} visible={metricsVisibility.delta_goals} type={1}/> },
        { id: 4, component: <TeamParameter activeGameTimeFrame={activeSelector} title={team_stats.xgSum} first_selected_param={firstSelectedTeamMetrics?.xG_sum} second_selected_param={secondSelectedTeamMetrics?.xG_sum} visible={metricsVisibility.xg_sum} type={1}/>, },
        { id: 5, component: <TeamParameter activeGameTimeFrame={activeSelector} title={team_stats.ball_possession} first_selected_param={firstSelectedTeamMetrics?.ball_possession} second_selected_param={secondSelectedTeamMetrics?.ball_possession} visible={metricsVisibility.ball_possession} type={1}/> },
        { id: 6, component: <TeamParameter activeGameTimeFrame={activeSelector} title={team_stats.total_shots} first_selected_param={firstSelectedTeamMetrics?.total_shots} second_selected_param={secondSelectedTeamMetrics?.total_shots} visible={metricsVisibility.total_shots} type={1}/> },
        { id: 7, component: <TeamParameter activeGameTimeFrame={activeSelector} title={team_stats.innaccurate_passes}  first_selected_param={firstSelectedTeamMetrics?.inaccurate_passes} second_selected_param={secondSelectedTeamMetrics?.inaccurate_passes} visible={metricsVisibility.innaccurate_passes} type={1}/> },
        { id: 8, component: <TeamParameter activeGameTimeFrame={activeSelector} title={team_stats.accurate_passes}   first_selected_param={firstSelectedTeamMetrics?.accurate_passes} second_selected_param={secondSelectedTeamMetrics?.accurate_passes} visible={metricsVisibility.accurate_passes} type={1}/> },
        { id: 9, component: <TeamParameter activeGameTimeFrame={activeSelector} title={team_stats.bch}  first_selected_param={firstSelectedTeamMetrics?.bch} second_selected_param={secondSelectedTeamMetrics?.bch} visible={metricsVisibility.bch} type={1}/> },
        { id: 10, component: <TeamParameter activeGameTimeFrame={activeSelector} title={team_stats.bchm}  first_selected_param={firstSelectedTeamMetrics?.bchm} second_selected_param={secondSelectedTeamMetrics?.bchm} visible={metricsVisibility.bchm} type={1}/> },
        { id: 11, component: <TeamParameter activeGameTimeFrame={activeSelector} title={team_stats.avg_coeff}  first_selected_param={firstSelectedTeamMetrics?.avg_coeff} second_selected_param={secondSelectedTeamMetrics?.avg_coeff} visible={metricsVisibility.avg_coeff} type={1}/> },
        { id: 12, component: <TeamParameter activeGameTimeFrame={activeSelector} title={team_stats.offsides}  first_selected_param={firstSelectedTeamMetrics?.offsides} second_selected_param={secondSelectedTeamMetrics?.offsides} visible={metricsVisibility.offsides} type={1}/> },
        { id: 13, component: <TeamParameter activeGameTimeFrame={activeSelector}  title={team_stats.corners} first_selected_param={firstSelectedTeamMetrics?.corners} second_selected_param={secondSelectedTeamMetrics?.corners} visible={metricsVisibility.corners} type={1}/> },
    ]


    const paramsSelectors = [
        { id: 1, title: 'goals_scored', componentVisible: metricsVisibility.goals_scored, ruTitle: team_stats.goals_scored.ru, engTitle: team_stats.goals_scored.eng},
        { id: 2, title: 'goals_conceded', componentVisible: metricsVisibility.goals_conceded, ruTitle: team_stats.goals_conceded.ru, engTitle: team_stats.goals_conceded.eng},
        { id: 3, title: 'delta_goals', componentVisible: metricsVisibility.delta_goals, ruTitle: team_stats.delta_goals.ru, engTitle: team_stats.delta_goals.eng},
        { id: 4, title: 'xg_sum', componentVisible: metricsVisibility.xg_sum, ruTitle: team_stats.xgSum.ru, engTitle: team_stats.xgSum.eng },
        { id: 5, title: 'ball_possession', componentVisible: metricsVisibility.ball_possession, ruTitle: team_stats.ball_possession.ru, engTitle: team_stats.ball_possession.eng},
        { id: 6, title: 'total_shots', componentVisible: metricsVisibility.total_shots, ruTitle: team_stats.total_shots.ru, engTitle: team_stats.total_shots.eng},
        { id: 7, title: 'innaccurate_passes', componentVisible:  metricsVisibility.innaccurate_passes, ruTitle: team_stats.innaccurate_passes.ru, engTitle: team_stats.innaccurate_passes.eng},
        { id: 8, title: 'accurate_passes', componentVisible:metricsVisibility.accurate_passes, ruTitle: team_stats.accurate_passes.ru, engTitle: team_stats.accurate_passes.eng},
        { id: 9, title: 'bch', componentVisible: metricsVisibility.bch, ruTitle: team_stats.bch.ru, engTitle: team_stats.bch.eng},
        { id: 10, title: 'bchm', componentVisible: metricsVisibility.bchm, ruTitle: team_stats.bchm.ru, engTitle: team_stats.bchm.eng},
        { id: 11, title: 'avg_coeff', componentVisible: metricsVisibility.avg_coeff, ruTitle: team_stats.avg_coeff.ru, engTitle: team_stats.avg_coeff.eng},
        { id: 11, title: 'offsides', componentVisible: metricsVisibility.offsides, ruTitle: team_stats.offsides.ru, engTitle: team_stats.offsides.eng},
        { id: 13, title: 'corners', componentVisible: metricsVisibility.corners, ruTitle: team_stats.corners.ru, engTitle: team_stats.corners.eng},
    ]

    const {theme} = useContext(ThemeContext)
    const textColor = theme === 'dark' ? 'grey' : '#333333'
    const teamsColor = theme === 'dark' ? 'white' : '#333333'

    // console.log(isLoadingH2h)

    return (
        <div className={styles.team_stat}>
            <div className={styles.params_mobile}>
                    <div className={styles.times}>
                        <GamesTimeFrameStatSelect
                            onClose={() => null}
                            selectors={gameSelectors}
                            defaultValue={gamesTimeFrame}
                            setActiveTimeSelector={setActiveSelector}
                            setActiveGameTimeFrame={setActiveGameTimeFrame}
                            setSelectedTeamParameters={setFirstSelectedTeamParams}
                            setSelectedOverageParameters={setSecondSelectedTeamMetrics}
                            activeGameTimeFrame={gamesTimeFrame}
                        />
                        <div style={{width: "50%", display: 'flex', justifyContent: 'center', padding: '12px 8px', borderRight: "1px solid #5C5C5C", color: textColor}}>
                            {language === 'Eng' ? "Times" : 'Таймы'}
                            {/* <GamesTimeFrameStatSelect
                                onClose={() => null}
                                selectors={timeSelectors}
                                defaultValue={'1 time'}
                                setActiveGameTimeFrame={setActiveTimeFrame}
                                setSelectedTeamParameters={() => null}
                                setSelectedOverageParameters={() => null}
                                activeGameTimeFrame={timeFrame}
                            /> */}
                        </div>
                    </div>
                    <div className={styles.params_controller}>
                        <ParamStatSelect
                            onClose={() => null}
                            selectors={paramsSelectors}
                            metricsVisibility={metricsVisibility}
                            setMetricsVisibility={setMetricsVisibility}
                            setIsLoading={setIsLoadingH2h}
                        />
                    </div>
            </div>
            <div className={styles.stat_header}>
                <div className={styles.team} style={{color: teamsColor}}>
                    <div className={styles.img_wrapper}>
                        <img src={`${IMG_PATH}${firstTeam?.team_img}`} alt={firstTeam?.team_name} />
                    </div>
                    <span>{firstTeam?.team_name}</span>
                </div>
                <div className={styles.params}>
                    <div className={styles.times}>
                        <GamesTimeFrameStatSelect
                            onClose={() => null}
                            selectors={gameSelectors}
                            defaultValue={gamesTimeFrame}
                            setActiveTimeSelector={setActiveSelector}
                            setActiveGameTimeFrame={setActiveGameTimeFrame}
                            setSelectedTeamParameters={setFirstSelectedTeamParams}
                            setSelectedOverageParameters={setSecondSelectedTeamMetrics}
                            activeGameTimeFrame={gamesTimeFrame}
                        />
                        {timeSelectors.map(selector =>
                            <div className={activeSelector === selector.id ? `${styles.active_selector}` : `${styles.time_item}`} key={selector.id} onClick={() => setActiveSelector(selector.id)}>{selector.title}</div>
                        )}
                    </div>
                    <div className={styles.params_controller}>
                        <ParamStatSelect
                            onClose={() => null}
                            selectors={paramsSelectors}
                            metricsVisibility={metricsVisibility}
                            setMetricsVisibility={setMetricsVisibility}
                            setIsLoading={setIsLoadingH2h}
                        />
                    </div>
                </div>
                <div className={styles.team}>
                    <TeamStatSelect
                        selectors={data?.teams}
                    />
                </div>
            </div>
            {isLoadingH2h 
                ?
                <LoaderAlt/> 
                :
                <div className={styles.stat_metrics}>
                    {teamStatisticsParamsList.map(it => <div key={it.id}>{it.component}</div>)}
                </div>
            }
        </div>
    );
};

export default TeamStats;