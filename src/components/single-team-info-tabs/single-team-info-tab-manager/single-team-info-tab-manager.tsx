import classNames from 'classnames'
import { TabBtn } from '@shared/buttons'
import styles from './single-team-info-tab-manager.module.scss'
import singleTeamInfoTabs from '../../../localization/team_detail_info_section/SingleTeamInfoTabs/singleTeamInfoTabs.json';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { RootState } from '../../../store/store';
import { singleTeamInfoTabsTypes } from 'src/types/types';
import { onSwitchActiveSingleTeamInfoTab } from '../../../store/InterfaceSlice/InterfaceSlice';

type Tab = {
    id: number,
    engTitle: string,
    ruTitle: string
}

const tabs = [
    {id: 1, engTitle: singleTeamInfoTabs.achievements.eng, ruTitle: singleTeamInfoTabs.achievements.ru},
    {id: 2, engTitle: singleTeamInfoTabs.kits.eng, ruTitle:singleTeamInfoTabs.kits.ru},
    {id: 3, engTitle: singleTeamInfoTabs.sponsors.eng, ruTitle: singleTeamInfoTabs.sponsors.ru},
    {id: 4, engTitle: singleTeamInfoTabs.club_records.eng, ruTitle: singleTeamInfoTabs.club_records.ru},
    {id: 5, engTitle: singleTeamInfoTabs.player_records.eng, ruTitle: singleTeamInfoTabs.player_records.ru},
    {id: 6, engTitle: singleTeamInfoTabs.facts.eng, ruTitle: singleTeamInfoTabs.facts.ru},
]

const SingleTeamInfoTabManager = ({ }) => {
    const activeSingleTeamInfoTab = useAppSelector((state: RootState) => state.interfaceState.single_team_info_tabs.active_single_team_info_tab)
    // const { theme } = useContext(ThemeContext)
    // const { language } = useContext(LanguageContext)
    const language = 'Eng'
    const theme = 'dark'
    const tabsHeader = classNames({
        [styles.tabs_header]: true,
        [styles.tabs_header_border_dark]: theme === 'dark',
        // [styles.tabs_header_border_light]: theme === 'light'
    })

    const dispatch = useAppDispatch()

    function activeTabHandler(activeTab: singleTeamInfoTabsTypes) {
        dispatch(onSwitchActiveSingleTeamInfoTab(activeTab))
    }

    return (
        <div className={tabsHeader} id='single_team-info-tabs-header'>
            {tabs.map((tab: Tab) =>
                <TabBtn key={tab.id} onClick={() => activeTabHandler(tab.engTitle as singleTeamInfoTabsTypes)} isActive={activeSingleTeamInfoTab === tab.engTitle}>{language === 'Eng' ? tab.engTitle : tab.ruTitle}</TabBtn>
            )}
        </div>
    )
}

export {SingleTeamInfoTabManager} 