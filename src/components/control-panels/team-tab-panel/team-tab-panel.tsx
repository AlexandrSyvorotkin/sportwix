import PanelBtn from "@ui/panel-btn/panel-btn"
import { onSwitchActiveTeamTab } from "../../../store/InterfaceSlice/InterfaceSlice"

import NewsIcon from '@assets/icons/news.svg?react'
import AboutTeamIcon from '@assets/icons/about-team.svg?react'
import ChampionshipsPerformanceIcon from '@assets/icons/championships-performance.svg?react'
import TeamStatsIcon from '@assets/icons/team-stats.svg?react'
import PlayerStatIcon from '@assets/icons/player-stat.svg?react'
import FootballFieldIcon from '@assets/icons/football-field.svg?react'
import CalendarIcon from '@assets/icons/calendar.svg?react'
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { useMemo } from "react"
import { RootState } from "../../../store/store"

const activeColor = '#A266F4'


const TeamTabPanel = () => {

    const dispatch = useAppDispatch()
    const activeTeamDetailInfoTab = useAppSelector((state: RootState) => state.interfaceState.team_tabs.active_team_tab)

    console.log(activeTeamDetailInfoTab)

    

    const rigthTabBtns = useMemo(() =>
        [
            {
                id: 1,
                icon: <NewsIcon fill={activeTeamDetailInfoTab === 'news' ? activeColor : ''}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('news')),
                disabled: false
            },
            {
                id: 2,
                icon: <AboutTeamIcon fill={activeTeamDetailInfoTab === 'about-team' ? activeColor : ''}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('about-team')),
                disabled: false
            },
            {
                id: 3,
                icon: <ChampionshipsPerformanceIcon fill={activeTeamDetailInfoTab === 'championships-performance' ? activeColor : ''}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('championships-performance')),
                disabled: false
            },
            {
                id: 4,
                icon: <TeamStatsIcon fill={activeTeamDetailInfoTab === 'team-stats' ? activeColor : ''}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('team-stats')),
                disabled: false
            },
            {
                id: 5,
                icon: <PlayerStatIcon fill={activeTeamDetailInfoTab === 'player-stat' ? activeColor : ''}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('player-stat')),
                disabled: false
            },
            {
                id: 6,
                icon: <FootballFieldIcon fill={activeTeamDetailInfoTab === 'football-field' ? activeColor : ''}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('football-field')),
                disabled: false
            },
            {
                id: 7,
                icon: <CalendarIcon fill={activeTeamDetailInfoTab === 'calendar' ? activeColor : ''}/>,
                onClick: () => dispatch(onSwitchActiveTeamTab('calendar')),
                disabled: false
            }
        ]
    , [activeTeamDetailInfoTab])
    
    return (
        <div className="flex flex-col gap-[5px] p-[7px]">
            {rigthTabBtns.map(({ id, ...btnProps }) => (
                <PanelBtn key={id} {...btnProps} />
            ))}
        </div>
    )
}

export {TeamTabPanel} 
