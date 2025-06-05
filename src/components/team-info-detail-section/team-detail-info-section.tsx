import styles from './team-detail-info-section.module.scss'

import { NewsTab } from '@components/news-tab';
import { useAppSelector } from '../../hooks/hooks';
import { RootState } from '../../store/store';
import { SingleTeamInfo } from '@components/single-team-info';
import { TeamResultsTable } from '@components/team-results-table';
import { TeamStats } from '@components/team-stats';
import { Calendar } from '@features/calendar/';
// import Calendar from '../../legacy/components/Calendar/Calendar';

// interface TeamDetailInfoSectionProps {
//     expandTeamSectionMobile?: any
//     isTeamSectionMobileExpanded?: boolean
// }

const TeamDetailInfoSection = () => {

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
        { id: 'news', component: <NewsTab /> },
        { id: 'about-team', component: <SingleTeamInfo />},
        { id: 'championships-performance', component: <TeamResultsTable /> },
        { id: 'team-stats', component: <TeamStats /> },
        { id: 'player-stat', component: <div >Статистика команды</div> },
        { id: 'football-field', component: <div >Игроки команды</div> },
        { id: 'calendar', component: <Calendar/> },
    ]



    const activeTeamTab = useAppSelector((state: RootState) => state.interfaceState.team_tabs.active_team_tab)

    // const windowWidth = window.innerWidth

    // const ref = useRef<HTMLDivElement>(null)

    // const theme = 'dark'


    // const tabActive = (id: number) => id === activeTeamTab ? 'block' : 'none'

    // const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    return (
        <div className={styles.team_defail_info_section} id='full-tabs'>
            <div className='w-full'>
                {detailInfoAboutTeamTabs.find(tab => tab.id === activeTeamTab)?.component}
            </div>
        </div>
    );
};

export { TeamDetailInfoSection }