import { useMemo, useState } from 'react';
import styles from './team-detail-info-section.module.scss'
import PanelBtn from '@ui/panel-btn/panel-btn';

import NewsIcon from '@assets/icons/news.svg?react'
import AboutTeamIcon from '@assets/icons/about-team.svg?react'
import ChampionshipsPerformanceIcon from '@assets/icons/championships-performance.svg?react'
import TeamStatsIcon from '@assets/icons/team-stats.svg?react'
import PlayerStatIcon from '@assets/icons/player-stat.svg?react'
import FootballFieldIcon from '@assets/icons/football-field.svg?react'
import CalendarIcon from '@assets/icons/calendar.svg?react'

type Tab = 'news' | 'about-team' | 'championships-performance' | 'team-stats' | 'player-stat' | 'football-field' | 'calendar'

// interface TeamDetailInfoSectionProps {
//     expandTeamSectionMobile?: any
//     isTeamSectionMobileExpanded?: boolean
// }

const TeamDetailInfoSection = ({ }) => {

    // const dispatch = useAppDispatch()
    // const {isSingleTeamView, isDoubleTeamView} = useAppSelector((state: RootState) => state.tournamentSlice)
    // const interfaceState = useAppSelector((state: RootState) => state.interfaceState)
    // const activeTeamTab = useAppSelector((state: RootState) => state.teamTabs.activeTabs.activeTeamDetailInfoTab)

    // useEffect(() => {
    //     if (!isSingleTeamView && !isDoubleTeamView) {
    //         dispatch(switchActiveTeamDetailInfoTab(1))
    //         dispatch(switchActiveSingleTeamInfoTab(1))
    //     }
    // }, [isSingleTeamView])


    // useEffect(() => {
    //     if (activeTeamTab === 4) {
    //         dispatch(changeTeamStatsControlsVisibleToTrue())
    //     } else {
    //         dispatch(changeTeamStatsControlsVisibleToFalse())
    //     }
    // }, [activeTeamTab])

    // const detailInfoAboutTeamTabs =[
    //     { id: 1, component: <NewsShort /> },
    //     { id: 8, component: <RecentResults/>},
    //     { id: 2, component: <SingleTeamInfo /> },
    //     { id: 3, component: <TeamResultsTable /> },
    //     { id: 4, component: <TeamStats /> },
    //     { id: 5, component: <Field /> },
    //     { id: 6, component: <Calendar /> },
    // ]

    const detailInfoAboutTeamTabs =[
        { id: 'news', component: <div className='w-full'>Новости</div> },
        { id: 'about-team', component: <div className='w-full'>Последние результаты</div>},
        { id: 'championships-performance', component: <div className='w-full'>Информация о команде</div> },
        { id: 'team-stats', component: <div className='w-full'>Результаты команды</div> },
        { id: 'player-stat', component: <div className='w-full'>Статистика команды</div> },
        { id: 'football-field', component: <div className='w-full'>Игроки команды</div> },
        { id: 'calendar', component: <div className='w-full'>Футбольное поле</div> },
    ]

    const [tabs, setTabs] = useState<Tab>('news')

    const rigthTabBtns = useMemo(() =>
        [
            {
                id: 1,
                icon: <NewsIcon/>,
                onClick: () => setTabs('news'),
                disabled: false
            },
            {
                id: 2,
                icon: <AboutTeamIcon/>,
                onClick: () => setTabs('about-team'),
                disabled: false
            },
            {
                id: 3,
                icon: <ChampionshipsPerformanceIcon/>,
                onClick: () => setTabs('championships-performance'),
                disabled: false
            },
            {
                id: 4,
                icon: <TeamStatsIcon/>,
                onClick: () => setTabs('team-stats'),
                disabled: false
            },
            {
                id: 5,
                icon: <PlayerStatIcon/>,
                onClick: () => setTabs('player-stat'),
                disabled: false
            },
            {
                id: 6,
                icon: <FootballFieldIcon/>,
                onClick: () => setTabs('football-field'),
                disabled: false
            },
            {
                id: 7,
                icon: <CalendarIcon/>,
                onClick: () => setTabs('calendar'),
                disabled: false
            }
        ]
    , [])

    // const windowWidth = window.innerWidth

    // const ref = useRef<HTMLDivElement>(null)

    const theme = 'dark'


    // const tabActive = (id: number) => id === activeTeamTab ? 'block' : 'none'

    // const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    return (
        <div className={styles.team_defail_info_section} id='full-tabs'>
            {detailInfoAboutTeamTabs.find(tab => tab.id === tabs)?.component}
            <div className={styles.panel_section}>
                {rigthTabBtns.map(({ id, ...btnProps }) => (
                    <PanelBtn key={id} {...btnProps} />
                ))}
            </div>
        </div>
    );
};

export { TeamDetailInfoSection }