import React, {FC, useContext, useCallback} from 'react';
import styles from './SingleTeamInfo.module.scss';
import TabBtn from '../../ui/Buttons/TabBtn/TabBtn';
import {useAppSelector, useAppDispatch} from "../../types/hooks";
import { RootState } from '../../redux/store';
import { switchActiveSingleTeamInfoTab } from '../../redux/TeamTabsSlice/TeamTabsSlice';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import classNames from 'classnames';
import singleTeamInfoTabs from '../../localization/team_detail_info_section/SingleTeamInfoTabs/singleTeamInfoTabs.json';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';

type Tab = {
    id: number,
    engTitle: string,
    ruTitle: string
};

const tabs = [
    {id: 1, engTitle: singleTeamInfoTabs.achievements.eng, ruTitle: singleTeamInfoTabs.achievements.ru},
    {id: 2, engTitle: singleTeamInfoTabs.kits.eng, ruTitle: singleTeamInfoTabs.kits.ru},
    {id: 3, engTitle: singleTeamInfoTabs.sponsors.eng, ruTitle: singleTeamInfoTabs.sponsors.ru},
    {id: 4, engTitle: singleTeamInfoTabs.club_records.eng, ruTitle: singleTeamInfoTabs.club_records.ru},
    {id: 5, engTitle: singleTeamInfoTabs.player_records.eng, ruTitle: singleTeamInfoTabs.player_records.ru},
    {id: 6, engTitle: singleTeamInfoTabs.facts.eng, ruTitle: singleTeamInfoTabs.facts.ru},
];

const Tabs: FC = () => {
    const activeSingleTeamInfoTab = useAppSelector((state: RootState) => state.teamTabs.activeTabs.activeSingleTeamInfoTab);
    const dispatch = useAppDispatch();

    const activeTabHandler = useCallback((id: number) => {
        dispatch(switchActiveSingleTeamInfoTab(id));
    }, [dispatch]);

    const { language } = useContext(LanguageContext);
    const { theme } = useContext(ThemeContext);

    const tabsHeader = classNames({
        [styles.tabs_header]: true,
        [styles.tabs_header_border_dark]: theme === 'dark',
        [styles.tabs_header_border_light]: theme === 'light'
    });

    return (
        <div className={tabsHeader} id='single_team-info-tabs-header'>
            {tabs.map((tab: Tab) =>
                <TabBtn key={tab.id} onClick={() => activeTabHandler(tab.id)} activeTab={activeSingleTeamInfoTab === tab.id}>
                    {language === 'Eng' ? tab.engTitle : tab.ruTitle}
                </TabBtn>
            )}
        </div>
    );
};

export default Tabs;
