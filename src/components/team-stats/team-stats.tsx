import React, { useEffect, useMemo, useState } from 'react';
import styles from './team-stats.module.scss'
import { useAppDispatch, useAppSelector } from '../../types/hooks';

import times_selectors from '../../localization/team_detail_info_section/team_stats/times_selectors.json'
import games_selectors from '../../localization/team_detail_info_section/team_stats/games_selectors.json'
import team_stats from '../../localization/team_detail_info_section/team_stats/team_stats.json'
import { TeamStatParameter } from '@components/team-stat-parameter';
import { RootState } from '../../store/store';
import { EnhancedSelect } from '@shared/ui/select';
import { Separator } from '@shared/separator';
// import { ITeam } from 'src/models/ITeam';
import { chooseSecondTeam, setGameFrame, setTimeFrame } from '@store/tournament-slice/tournament-slice';
import { TimeFrameMetrics } from '../../types/types';


const timeSelectors = [
    { id: 1, name: times_selectors.first_time.ru },
    { id: 2, name: times_selectors.second_time.ru },
    { id: 3, name: times_selectors.full_time.ru },
]

const TeamStats = () => {

    const [activeSelector, setActiveSelector] = useState('Полный матч')

    
    const [firstSelectedTeamMetrics, setFirstSelectedTeamParams] = useState<TimeFrameMetrics | undefined>(undefined)
    const [secondSelectedTeamMetrics, setSecondSelectedTeamMetrics] = useState<TimeFrameMetrics | undefined>(undefined)
        
    console.log(firstSelectedTeamMetrics, secondSelectedTeamMetrics)

    const firstTeam = useAppSelector(state => state.tournamentSlice.firstSelectedTeam)
    const secondTeam = useAppSelector(state => state.tournamentSlice.secondSelectedTeam)

    const [gamesTimeFrame, setActiveGameTimeFrame] = useState<string>('1 game')

    const teamTableH2h = useAppSelector((state: RootState) => state.tournamentSlice.h2h.isH2h.teamTable)
    const firstTeamH2h = useAppSelector((state: RootState) => state.tournamentSlice.h2h.teamStatsTable.firstTeamH2h)
    const secondTeamH2h = useAppSelector((state: RootState) => state.tournamentSlice.h2h.teamStatsTable.secondTeamH2h)

    const h2hTeamTableStatus = useAppSelector((state: RootState) => state.tournamentSlice.h2h.isH2h.teamTable)
    // const [isLoadingH2h, setIsLoadingH2h] = useState<boolean>(false)

    // console.log(firstTeamH2h, secondTeamH2h)

    useEffect(() => {
        if (teamTableH2h) {
            setActiveGameTimeFrame('Сезон')
        } else if (!teamTableH2h) {
            setActiveGameTimeFrame('1 игра')
        }
    }, [teamTableH2h])

    console.log(gamesTimeFrame)

    const language = 'Eng'

    useEffect(() => {
        if (h2hTeamTableStatus) {
            if (activeSelector === '1 тайм') {
                setFirstSelectedTeamParams(firstTeamH2h?.timeframe_all.time_1)
                setSecondSelectedTeamMetrics(secondTeamH2h?.timeframe_all.time_1)
            } else if (activeSelector === '2 тайм') {
                setFirstSelectedTeamParams(firstTeamH2h?.timeframe_all.time_2)
                setSecondSelectedTeamMetrics(secondTeamH2h?.timeframe_all.time_2)
            } else if (activeSelector === 'Полный матч') {
                setFirstSelectedTeamParams(firstTeamH2h?.timeframe_all.full_time)
                setSecondSelectedTeamMetrics(secondTeamH2h?.timeframe_all.full_time)
            }
        } else if (!h2hTeamTableStatus) {
            if (activeSelector === '1 тайм') {
                setFirstSelectedTeamParams(firstTeam?.metrics?.timeframe_1.time_1)
                setSecondSelectedTeamMetrics(secondTeam?.metrics?.timeframe_1.time_1)
            } else if (activeSelector === '2 тайм') {
                setFirstSelectedTeamParams(firstTeam?.metrics?.timeframe_1.time_2)
                setSecondSelectedTeamMetrics(secondTeam?.metrics?.timeframe_1.time_2)
                } else if (activeSelector === 'Полный матч') {
                setFirstSelectedTeamParams(firstTeam?.metrics?.timeframe_1.full_time)
                setSecondSelectedTeamMetrics(secondTeam?.metrics?.timeframe_1.full_time)
            }
        }

    }, [firstTeam, secondTeam, activeSelector, h2hTeamTableStatus, firstTeamH2h, secondTeamH2h])




    const gameSelectors = [
        { id: 1, name: language === 'Eng' ? games_selectors['1game'].eng : games_selectors['1game'].ru, params_first: firstTeam?.metrics?.timeframe_1.full_time, params_second: secondTeam?.metrics?.timeframe_1.full_time },
        { id: 2, name: language === 'Eng' ? games_selectors['3games'].eng : games_selectors['3games'].ru, params_first: firstTeam?.metrics?.timeframe_3.full_time, params_second: secondTeam?.metrics?.timeframe_3.full_time },
        { id: 3, name: language === 'Eng' ? games_selectors['5games'].eng : games_selectors['5games'].ru, params_first: firstTeam?.metrics?.timeframe_5.full_time, params_second: secondTeam?.metrics?.timeframe_5.full_time },
        { id: 4, name: language === 'Eng' ? games_selectors['10games'].eng : games_selectors['10games'].ru, params_first: firstTeam?.metrics?.timeframe_10.full_time, params_second: secondTeam?.metrics?.timeframe_10.full_time },
        { id: 5, name: language === 'Eng' ? games_selectors['15games'].eng : games_selectors['15games'].ru, params_first: firstTeam?.metrics?.timeframe_15.full_time, params_second: secondTeam?.metrics?.timeframe_15.full_time },
        { id: 6, name: language === 'Eng' ? games_selectors.season.eng : games_selectors.season.ru, params_first: firstTeam?.metrics?.timeframe_all.full_time, params_second: secondTeam?.metrics?.timeframe_all.full_time },
    ]



    // const { championshipId, season } = useAppSelector(state => state.tournamentSlice)
    // const { } = useFetchChampionshipInfoQuery({ championshipId, season })



    // const [metricsVisibility, setMetricsVisibility] = useState({
    //     goals_scored: true,
    //     goals_conceded: true,
    //     delta_goals: true,
    //     xg_sum: true,
    //     ball_possession: true,
    //     total_shots: true,
    //     innaccurate_passes: false,
    //     accurate_passes: false,
    //     bch: false,
    //     bchm: false,
    //     avg_coeff: false,
    //     offsides: false,
    //     corners: false
    // })

    const [metricsVisibility] = useState({
        goals_scored: true,
        goals_conceded: true,
        delta_goals: true,
        xg_sum: true,
        ball_possession: true,
        total_shots: true,
        innaccurate_passes: true,
        accurate_passes: true,
        bch: true,
        bchm: true,
        avg_coeff: true,
        offsides: true,
        corners: true
    })


    const teamStatisticsParamsList = [
        { id: 1, component: <TeamStatParameter title={team_stats.goals_scored} first_selected_param={firstSelectedTeamMetrics?.goals_scored} second_selected_param={secondSelectedTeamMetrics?.goals_scored} visible={metricsVisibility.goals_scored} type={1} /> },
        { id: 2, component: <TeamStatParameter title={team_stats.goals_conceded} first_selected_param={firstSelectedTeamMetrics?.goals_conceded} second_selected_param={secondSelectedTeamMetrics?.goals_conceded} visible={metricsVisibility.goals_conceded} type={2} /> },
        { id: 3, component: <TeamStatParameter title={team_stats.delta_goals} first_selected_param={firstSelectedTeamMetrics?.delta_goals} second_selected_param={secondSelectedTeamMetrics?.delta_goals} visible={metricsVisibility.delta_goals} type={1} /> },
        { id: 4, component: <TeamStatParameter title={team_stats.xgSum} first_selected_param={firstSelectedTeamMetrics?.xG_sum} second_selected_param={secondSelectedTeamMetrics?.xG_sum} visible={metricsVisibility.xg_sum} type={1} />, },
        { id: 5, component: <TeamStatParameter title={team_stats.ball_possession} first_selected_param={firstSelectedTeamMetrics?.ball_possession} second_selected_param={secondSelectedTeamMetrics?.ball_possession} visible={metricsVisibility.ball_possession} type={1} /> },
        { id: 6, component: <TeamStatParameter title={team_stats.total_shots} first_selected_param={firstSelectedTeamMetrics?.total_shots} second_selected_param={secondSelectedTeamMetrics?.total_shots} visible={metricsVisibility.total_shots} type={1} /> },
        { id: 7, component: <TeamStatParameter title={team_stats.innaccurate_passes} first_selected_param={firstSelectedTeamMetrics?.inaccurate_passes} second_selected_param={secondSelectedTeamMetrics?.inaccurate_passes} visible={metricsVisibility.innaccurate_passes} type={1} /> },
        { id: 8, component: <TeamStatParameter title={team_stats.accurate_passes} first_selected_param={firstSelectedTeamMetrics?.accurate_passes} second_selected_param={secondSelectedTeamMetrics?.accurate_passes} visible={metricsVisibility.accurate_passes} type={1} /> },
        { id: 9, component: <TeamStatParameter title={team_stats.bch} first_selected_param={firstSelectedTeamMetrics?.bch} second_selected_param={secondSelectedTeamMetrics?.bch} visible={metricsVisibility.bch} type={1} /> },
        { id: 10, component: <TeamStatParameter title={team_stats.bchm} first_selected_param={firstSelectedTeamMetrics?.bchm} second_selected_param={secondSelectedTeamMetrics?.bchm} visible={metricsVisibility.bchm} type={1} /> },
        { id: 11, component: <TeamStatParameter title={team_stats.avg_coeff} first_selected_param={firstSelectedTeamMetrics?.avg_coeff} second_selected_param={secondSelectedTeamMetrics?.avg_coeff} visible={metricsVisibility.avg_coeff} type={1} /> },
        { id: 12, component: <TeamStatParameter title={team_stats.offsides} first_selected_param={firstSelectedTeamMetrics?.offsides} second_selected_param={secondSelectedTeamMetrics?.offsides} visible={metricsVisibility.offsides} type={1} /> },
        { id: 13, component: <TeamStatParameter title={team_stats.corners} first_selected_param={firstSelectedTeamMetrics?.corners} second_selected_param={secondSelectedTeamMetrics?.corners} visible={metricsVisibility.corners} type={1} /> },
    ]


    // const paramsSelectors = [
    //     { id: 1, title: 'goals_scored', componentVisible: metricsVisibility.goals_scored, ruTitle: team_stats.goals_scored.ru, engTitle: team_stats.goals_scored.eng },
    //     { id: 2, title: 'goals_conceded', componentVisible: metricsVisibility.goals_conceded, ruTitle: team_stats.goals_conceded.ru, engTitle: team_stats.goals_conceded.eng },
    //     { id: 3, title: 'delta_goals', componentVisible: metricsVisibility.delta_goals, ruTitle: team_stats.delta_goals.ru, engTitle: team_stats.delta_goals.eng },
    //     { id: 4, title: 'xg_sum', componentVisible: metricsVisibility.xg_sum, ruTitle: team_stats.xgSum.ru, engTitle: team_stats.xgSum.eng },
    //     { id: 5, title: 'ball_possession', componentVisible: metricsVisibility.ball_possession, ruTitle: team_stats.ball_possession.ru, engTitle: team_stats.ball_possession.eng },
    //     { id: 6, title: 'total_shots', componentVisible: metricsVisibility.total_shots, ruTitle: team_stats.total_shots.ru, engTitle: team_stats.total_shots.eng },
    //     { id: 7, title: 'innaccurate_passes', componentVisible: metricsVisibility.innaccurate_passes, ruTitle: team_stats.innaccurate_passes.ru, engTitle: team_stats.innaccurate_passes.eng },
    //     { id: 8, title: 'accurate_passes', componentVisible: metricsVisibility.accurate_passes, ruTitle: team_stats.accurate_passes.ru, engTitle: team_stats.accurate_passes.eng },
    //     { id: 9, title: 'bch', componentVisible: metricsVisibility.bch, ruTitle: team_stats.bch.ru, engTitle: team_stats.bch.eng },
    //     { id: 10, title: 'bchm', componentVisible: metricsVisibility.bchm, ruTitle: team_stats.bchm.ru, engTitle: team_stats.bchm.eng },
    //     { id: 11, title: 'avg_coeff', componentVisible: metricsVisibility.avg_coeff, ruTitle: team_stats.avg_coeff.ru, engTitle: team_stats.avg_coeff.eng },
    //     { id: 11, title: 'offsides', componentVisible: metricsVisibility.offsides, ruTitle: team_stats.offsides.ru, engTitle: team_stats.offsides.eng },
    //     { id: 13, title: 'corners', componentVisible: metricsVisibility.corners, ruTitle: team_stats.corners.ru, engTitle: team_stats.corners.eng },
    // ]


    // console.log(isLoadingH2h)

    //TODO: проверить дату
    const teams = useAppSelector((state: RootState) => state.tournamentSlice.tournament?.teams)

    const teamsData = useMemo(() => {
        return teams?.map(team => ({
            id: Number(team.team_uuid),
            name: team.team_name,
            img: team.team_img
        }))
    }, [teams])

    console.log(teams)

    const dispatch = useAppDispatch()

    const onSelectSecondTeam = (team: string) => {
        const secondSelectedTeam = teams?.find(t => t.team_name === team)
        if (secondSelectedTeam) {
            dispatch(chooseSecondTeam(secondSelectedTeam))
        }
    }

    return (
        <div className={styles.team_stat}>
            <div className='flex h-[80px] w-full'>
                <div className='flex flex-col w-1/3 h-full'>
                    <div className='px-4 py-1.5 flex items-center h-full gap-2.5 font-normal text-sm leading-4 text-white w-full relative'>
                        <div className='w-[40px] h-[40px]'>
                            <img className='w-full h-full object-cover' src={`${firstTeam?.team_img}`} alt={firstTeam?.team_name} />
                        </div>
                        <span>{firstTeam?.team_name}</span>
                    </div>
                    <Separator className='w-full h-[1px]' />
                </div>
                <Separator className='w-[1px] h-full' />
                <div className='w-[40%]'>
                    <div className='flex w-full h-1/2'>
                        <div className='w-1/3 h-full flex flex-col items-center justify-center'>
                            <EnhancedSelect
                                triggerWidth='w-[99%] h-full px-4 py-1.5'
                                placeholder='1 time'
                                items={gameSelectors}
                                onValueChange={(e) => {
                                    // setActiveGameTimeFrame(e)
                                    dispatch(setGameFrame(e as '1 game' | '3 games' | '5 games' | '4 games' | '10 games' | '15 games' | 'Season'))
                                }}
                            />
                            <Separator className='w-full h-[1px]' />
                        </div>
                        <Separator className='w-[1px] h-full'/>
                        <div className='w-full h-full flex flex-col items-center justify-center'>
                            <div className='w-full h-[99%] flex items-center justify-center'>
                                {timeSelectors.map((selector, index) => (
                                    <React.Fragment key={selector.id}>
                                        <div 
                                        className={`h-full px-4 py-1.5 flex-1 flex items-center justify-center cursor-pointer ${activeSelector === selector.name ? `${styles.active_selector}` : `${styles.time_item}`}`} 
                                        onClick={() => {
                                            setActiveSelector(selector.name)
                                            dispatch(setTimeFrame(selector.name as '1 тайм' | '2 тайм' | 'Полный матч'))
                                        }}
                                        >
                                            {selector.name}
                                        </div>
                                        {index < timeSelectors.length - 1 && <Separator className='w-[1px] h-full' />}
                                    </React.Fragment>
                                ))}
                            </div>
                            <Separator className='w-full h-[1px]' />
                        </div>

                    </div>
                    <div className='flex flex-col w-full h-1/2'>
                        <div className='px-2 py-3 h-[calc(100%-1px)] flex justify-between font-normal text-sm leading-4 text-white'>
                            Параметры
                            {/* <ParamStatSelect
                                onClose={() => null}
                                selectors={paramsSelectors}
                                metricsVisibility={metricsVisibility}
                                setMetricsVisibility={setMetricsVisibility}
                                setIsLoading={setIsLoadingH2h}
                            /> */}
                        </div>
                        <Separator className='w-full h-[1px]' />
                    </div>
                </div>
                <Separator className='w-[1px] h-full' />
                <div className='w-1/3 h-[79px] flex items-center justify-center'>
                    <div className='w-full h-full'>
                        <EnhancedSelect
                            placeholder='Команда'
                            customSelectElements={teamsData}
                            onValueChange={(e) => onSelectSecondTeam(e)}
                            triggerWidth='w-full h-full px-4 py-1.5 '
                        />
                        <Separator className='w-full h-[1px]' />
                    </div>
                </div>
                
            </div>
            <div className='overflow-y-auto'>
                {teamStatisticsParamsList.map(it => <div key={it.id}>{it.component}</div>)}
            </div>
        </div>
    );
};

export { TeamStats };