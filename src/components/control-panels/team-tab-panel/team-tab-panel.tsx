import PanelBtn from "@ui/panel-btn/panel-btn"
import { onSwitchActiveTeamTab } from "../../../store/InterfaceSlice/InterfaceSlice"

import NewsIcon from '@assets/icons/news.svg?react'
import AboutTeamIcon from '@assets/icons/about-team.svg?react'
import ChampionshipsPerformanceIcon from '@assets/icons/championships-performance.svg?react'
import TeamStatsIcon from '@assets/icons/team-stats-icon.svg?react'
import PlayerStatIcon from '@assets/icons/player-stat.svg?react'
import FootballFieldIcon from '@assets/icons/football-field.svg?react'
import CalendarIcon from '@assets/icons/calendar-icon.svg?react'
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { useMemo } from "react"
import { RootState } from "../../../store/store"
import { type PanelBtnProps } from "@ui/panel-btn/panel-btn";

const activeColor = '#A266F4'


const TeamTabPanel = () => {

    const dispatch = useAppDispatch()
    const activeTeamDetailInfoTab = useAppSelector((state: RootState) => state.interfaceState.team_tabs.active_team_tab)

    const isAnyTeamSelected = useAppSelector((state: RootState) => state.tournamentSlice.isSingleTeamView)
    
    const rigthTabBtns:PanelBtnProps[] = useMemo(() =>
        [
            {
                icon: <NewsIcon className={activeTeamDetailInfoTab === 'news' ? 'text-[#A266F4]'  : 'text-[#FFFFFF]'}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('news')),
                disabled: false,
                isActive: activeTeamDetailInfoTab === 'news',
                tooltipText: 'Новости',
                tooltipSide: 'left'
            },
            {
                icon: <AboutTeamIcon className={activeTeamDetailInfoTab === 'about-team' ? 'text-[#A266F4]'  : 'text-[#FFFFFF]'}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('about-team')),
                disabled: !isAnyTeamSelected,
                isActive: activeTeamDetailInfoTab === 'about-team',
                tooltipText: 'О команде',
                tooltipSide: 'left'
            },
            {
                icon: <ChampionshipsPerformanceIcon className={activeTeamDetailInfoTab === 'championships-performance' ? 'text-[#A266F4]'  : 'text-[#FFFFFF]'}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('championships-performance')),
                disabled: !isAnyTeamSelected,
                isActive: activeTeamDetailInfoTab === 'championships-performance',
                tooltipText: 'Выступление',
                tooltipSide: 'left'
            },
            {
                icon: <TeamStatsIcon className={activeTeamDetailInfoTab === 'team-stats' ? 'text-[#A266F4]'  : 'text-[#FFFFFF]'}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('team-stats')),
                disabled: !isAnyTeamSelected,
                isActive: activeTeamDetailInfoTab === 'team-stats',
                tooltipText: 'Статистика команды',
                tooltipSide: 'left'
            },
            {
                icon: <PlayerStatIcon fill={activeTeamDetailInfoTab === 'player-stat' ? activeColor : ''}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('player-stat')),
                disabled: true,
                isActive: activeTeamDetailInfoTab === 'player-stat',
                tooltipText: 'Статистика игрока',
                tooltipSide: 'left'
            },
            {
                icon: <FootballFieldIcon fill={activeTeamDetailInfoTab === 'football-field' ? activeColor : ''}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('football-field')),
                disabled: true,
                isActive: activeTeamDetailInfoTab === 'football-field',
                tooltipText: 'Футбольное поле',
                tooltipSide: 'left'
            },
            {
                icon: <CalendarIcon className={activeTeamDetailInfoTab === 'calendar' ? 'text-[#A266F4]'  : 'text-[#FFFFFF]'}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('calendar')),
                disabled: !isAnyTeamSelected,
                isActive: activeTeamDetailInfoTab === 'calendar',
                tooltipText: 'Календарь',
                tooltipSide: 'left'
            }
        ]
    , [activeTeamDetailInfoTab, isAnyTeamSelected, dispatch])
    
    return (
        <div className="flex flex-col gap-[5px] p-[7px]">
            {rigthTabBtns.map(({ id, ...btnProps }) => (
                <PanelBtn key={id} {...btnProps} />
            ))}
        </div>
    )
}

export {TeamTabPanel} 
