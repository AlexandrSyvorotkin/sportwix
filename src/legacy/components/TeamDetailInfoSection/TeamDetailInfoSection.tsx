import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import NewsShort from "../NewsShort/NewsShort";
import SingleTeamInfo from "../SingleTeamInfo/SingleTeamInfo";
import TeamResultsTable from "../TeamResultsTable/TeamResultsTable";
import TeamStats from "../TeamStats/TeamStats";
import Field from "../Field/Field";
import Calendar from "../Calendar/Calendar";
import open_news from "../../assets/control_panels_logos/news_panel_logos/open_news/open_news.svg";
import open_news_active from "../../assets/control_panels_logos/news_panel_logos/open_news/open_news_active.svg";
import open_news_light from "../../assets/control_panels_logos/news_panel_logos/open_news/openNewsLight.svg";
import about_team from "../../assets/control_panels_logos/news_panel_logos/about_team/about_team.svg";
import about_team_active from "../../assets/control_panels_logos/news_panel_logos/about_team/about_team_active.svg";
import about_team_light from "../../assets/control_panels_logos/news_panel_logos/about_team/AboutTeamLight.svg";
import about_team_disabled from "../../assets/control_panels_logos/news_panel_logos/about_team/about_team_disabled.svg";

import expand from "../../assets/control_panels_logos/championship_table_right_panel/Expand/Expand.svg";
import expand_active from "../../assets/control_panels_logos/championship_table_right_panel/Expand/ExpandActive.svg";
import expand_light from '../../assets/control_panels_logos/championship_table_right_panel/Expand/ExpandLight.svg';

import championship_performance
    from "../../assets/control_panels_logos/news_panel_logos/championship_parformance/championship_performance.svg";
import championships_performance_active from '../../assets/control_panels_logos/news_panel_logos/championship_parformance/championship_performance_active.svg'
import championships_performance_light from '../../assets/control_panels_logos/news_panel_logos/championship_parformance/championshipPerformanceLight.svg'
import championships_performance_disabled from '../../assets/control_panels_logos/news_panel_logos/championship_parformance/championship_performance_disabled.svg'

import team_stats from "../../assets/control_panels_logos/news_panel_logos/team_stats/team_stats.svg";
import team_stats_active from "../../assets/control_panels_logos/news_panel_logos/team_stats/team_stats_active.svg";
import team_stats_light from "../../assets/control_panels_logos/news_panel_logos/team_stats/TeamStatsLight.svg";
import team_stat_disabled from "../../assets/control_panels_logos/news_panel_logos/team_stats/team_stats_disabled.svg";

import player_stat from "../../assets/control_panels_logos/news_panel_logos/player_stats/player_stats.svg";
import player_stat_active from "../../assets/control_panels_logos/news_panel_logos/player_stats/player_stats_active.svg";
import player_state_disabled from '../../assets/control_panels_logos/news_panel_logos/player_stats/player_stats_disabled.svg'

import football_field from "../../assets/control_panels_logos/news_panel_logos/football_field/football_field.svg";
import football_field_active from "../../assets/control_panels_logos/news_panel_logos/football_field/football_field_active.svg";
import football_field_light from "../../assets/control_panels_logos/news_panel_logos/football_field/footbalFieldLight.svg";
import football_field_disabled from "../../assets/control_panels_logos/news_panel_logos/football_field/football_field_disabled.svg";

import calendar from "../../assets/control_panels_logos/news_panel_logos/Calendar/Calendar.svg";
import calendar_active from "../../assets/control_panels_logos/news_panel_logos/Calendar/CalendarActive.svg";
import calendar_light from "../../assets/control_panels_logos/news_panel_logos/Calendar/CalendarLight.svg";
import calendar_disabled from "../../assets/control_panels_logos/news_panel_logos/Calendar/calendar_disabled.svg";

import information_table from '../../assets/control_panels_logos/matches_panel/InformationTable/InformationTable.svg'
import information_table_active from '../../assets/control_panels_logos/matches_panel/InformationTable/InformationTableActive.svg'

import { useAppDispatch } from '../../types/hooks';

import { changeTeamStatsControlsVisibleToFalse, changeTeamStatsControlsVisibleToTrue } from '../../redux/TeamStatsControls/TeamStatsControls';
import controls_btns_tooltips from '../../localization/control-buttons/control-buttons.json'



import styles from './TeamDetailInfoSection.module.scss'
import ControlPanelBtn from "../../ui/Buttons/ControlPanelBtn/ControlPanelBtn";
import { useAppSelector } from "../../types/hooks";
import { ITeam } from '../../models/ITeam';
import RecentResults from '../RecentResults/RecentResults';
import { ILastMatch } from '../../models/ILastMatch';
import { RootState } from '../../redux/store';
import { switchActiveSingleTeamInfoTab, switchActiveTeamDetailInfoTab } from '../../redux/TeamTabsSlice/TeamTabsSlice';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';




interface TeamDetailInfoSectionProps {
    expandTeamSectionMobile?: any
    isTeamSectionMobileExpanded?: boolean
}
 
const TeamDetailInfoSection: FC<TeamDetailInfoSectionProps> = ({expandTeamSectionMobile, isTeamSectionMobileExpanded}) => {

    const dispatch = useAppDispatch()
    const {isSingleTeamView, isDoubleTeamView} = useAppSelector((state: RootState) => state.tournamentSlice)
    const interfaceState = useAppSelector((state: RootState) => state.interfaceState)
    const activeTeamTab = useAppSelector((state: RootState) => state.teamTabs.activeTabs.activeTeamDetailInfoTab)

    useEffect(() => {
        if (!isSingleTeamView && !isDoubleTeamView) {
            dispatch(switchActiveTeamDetailInfoTab(1))
            dispatch(switchActiveSingleTeamInfoTab(1))
        }
    }, [isSingleTeamView])


    useEffect(() => {
        if (activeTeamTab === 4) {
            dispatch(changeTeamStatsControlsVisibleToTrue())
        } else {
            dispatch(changeTeamStatsControlsVisibleToFalse())
        }
    }, [activeTeamTab])

    const detailInfoAboutTeamTabs =[
        { id: 1, component: <NewsShort /> },
        { id: 8, component: <RecentResults/>},
        { id: 2, component: <SingleTeamInfo /> },
        { id: 3, component: <TeamResultsTable /> },
        { id: 4, component: <TeamStats /> },
        { id: 5, component: <Field /> },
        { id: 6, component: <Calendar /> },
    ]

    const detailInfoAboutTeamTabsControls = [
        { 
            id: 12, 
            onClick: () => null, 
            img: expand, 
            imgActive: expand_active, 
            active: interfaceState.mobile.expandSections.tabsInfoSection, 
            visible: !interfaceState.mobile.orientation.landscape && !interfaceState.desktop.isDesktop, 
            imgLight: expand_light, 
            position: 'left', 
            tooltipDescription: controls_btns_tooltips.expand
        },
        {
            id: 1,
            img: open_news,
            imgActive: open_news_active,
            onClick: () => dispatch(switchActiveTeamDetailInfoTab(1)),
            active: activeTeamTab === 1,
            disabled: false,
            visible: true,
            imgLight: open_news_light,
            position: 'left',
            tooltipDescription: controls_btns_tooltips.news,
        },
        {
            id: 10,
            img: information_table,
            imgActive: information_table_active,
            onClick: () => dispatch(switchActiveTeamDetailInfoTab(8)),
            active: activeTeamTab === 8,
            disabled: false,
            visible: false,
            imgLight: open_news_light,
            position: 'left',
            tooltipDescription: controls_btns_tooltips.information_table
        },
        {
            id: 2,
            img: about_team,
            imgActive: about_team_active,
            onClick: () => dispatch(switchActiveTeamDetailInfoTab(2)),
            active: activeTeamTab === 2,
            disabled: !isSingleTeamView && !isDoubleTeamView,
            visible: true,
            imgLight: about_team_light,
            imgDisabled: about_team_disabled,
            position: 'left',
            tooltipDescription: controls_btns_tooltips.about_team
        },
        {
            id: 3,
            img: championship_performance,
            imgActive: championships_performance_active,
            onClick: () => dispatch(switchActiveTeamDetailInfoTab(3)),
            active: activeTeamTab === 3,
            disabled: !isSingleTeamView && !isDoubleTeamView,
            visible: true,
            imgLight: championships_performance_light,
            imgDisabled: championships_performance_disabled,
            position: 'left',
            tooltipDescription: controls_btns_tooltips.performance
        },
        {
            id: 4,
            img: team_stats,
            imgActive: team_stats_active,
            onClick: () => dispatch(switchActiveTeamDetailInfoTab(4)),
            active: activeTeamTab === 4,
            disabled: !isSingleTeamView && !isDoubleTeamView,
            // disabled: true,
            visible: true,
            imgLight: team_stats_light,
            imgDisabled: team_stat_disabled,
            position: 'left',
            tooltipDescription: controls_btns_tooltips.team_stats
        },
        {
            id: 5,
            img: player_stat,
            imgActive: player_stat_active,
            onClick: () => null,
            active: '',
            visible: true,
            disabled: true,
            imgLight: '',
            imgDisabled: player_state_disabled,
            position: 'left',
            tooltipDescription: controls_btns_tooltips.team_stats
        },
        {
            id: 6,
            img: football_field,
            imgActive: football_field_active,
            onClick: () => dispatch(switchActiveTeamDetailInfoTab(5)),
            active: activeTeamTab === 5,
            disabled: !isSingleTeamView && !isDoubleTeamView,
            // disabled: true,
            visible: true,
            imgLight: football_field_light,
            imgDisabled: football_field_disabled,
            position: 'left',
            tooltipDescription: controls_btns_tooltips.football_field,
        },
        {
            id: 7,
            img: calendar,
            imgActive: calendar_active,
            onClick: () => dispatch(switchActiveTeamDetailInfoTab(6)),
            active: activeTeamTab === 6,
            disabled: !isSingleTeamView && !isDoubleTeamView,
            visible: true,
            imgLight: calendar_light,
            imgDisabled: calendar_disabled,
            position: 'left',
            tooltipDescription: controls_btns_tooltips.calendar
        },
    ]
   
	

    const windowWidth = window.innerWidth

    const ref = useRef<HTMLDivElement>(null)


    

    const tabActive = (id: number) => id === activeTeamTab ? 'block' : 'none'
    const {theme} = useContext(ThemeContext)
    const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    return (
        <div className={styles.team_defail_info_section} id='full-tabs'>
            {detailInfoAboutTeamTabs.map(({ component, id }) =>
                <div key={id} style={{ display: `${tabActive(id)}`}} className={styles.components_content} id='tabs'>
                    {component}
                </div>
            )}
            <div className={styles.panel_section} ref={ref} style={{border: border}}>
                {detailInfoAboutTeamTabsControls.map(({ id, img, onClick, imgActive, active, disabled, visible, imgLight, imgDisabled, position, tooltipDescription }) =>
                    <ControlPanelBtn
                        key={id}
                        img={img}
                        onClick={onClick}
                        imgActive={imgActive}
                        active={active}
                        disabled={disabled}
                        visible={visible}
                        imgLight={imgLight}
                        imgDisabled={imgDisabled}
                        position={position}
                        tooltipDescription={tooltipDescription}
                    />
            )}
        </div>
        </div>
    );
};

export default TeamDetailInfoSection;