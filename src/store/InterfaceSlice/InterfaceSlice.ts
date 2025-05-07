import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { interfaceState } from "../../types/types";

export type expandTypes = "sparkline" | "newsAndLastGames" | "candleChart" | "tabsInfo" | 'none';
export type teamTabsTypes = "news" | "about-team" | "championships-performance" | "team-stats" | "player-stat" | "football-field" | "calendar";

const initialState: interfaceState = {
    desktop: {
        isDesktop: undefined,
        expandSections: {
            sparkline: false
        }
    },
    mobile: {
        isMobile: undefined,
        orientation: {
            portrait: undefined,
            landscape: undefined
        },
        expandSections: {
            sparklineSection: false,
            newsAndLastGamesSection: false,
            chartSection: false,
            tabsInfoSection:false,
        }
    },
    team_tabs: {
        active_team_tab: 'news'
    },
    expanded_section: 'none'
}

const interfaceSlice = createSlice({
    name: 'interface',
    initialState,
    reducers: {
        switchMobileOrientation(state, action: PayloadAction<string>) {
            const isLandscape = action.payload === 'landscape';
            state.mobile.orientation.portrait = !isLandscape;
            state.mobile.orientation.landscape = isLandscape;
        },
        expandDesktopSection (state) {
                state.desktop.expandSections.sparkline = !state.desktop.expandSections
        },
        expandSection(state, action: PayloadAction<expandTypes>) {
            switch (action.payload) {
                case 'sparkline':
                    state.mobile.expandSections.sparklineSection = !state.mobile.expandSections.sparklineSection;
                    break;
                case 'newsAndLastGames':
                    state.mobile.expandSections.newsAndLastGamesSection = !state.mobile.expandSections.newsAndLastGamesSection;
                    break;
                case 'candleChart':
                    state.mobile.expandSections.chartSection = !state.mobile.expandSections.chartSection;
                    break;
                case 'tabsInfo':
                    state.mobile.expandSections.tabsInfoSection = !state.mobile.expandSections.tabsInfoSection;
                    break;
            }
        },
        switchVersion (state, action: PayloadAction<'mobile' | 'desktop'>) {
            if (action.payload === 'mobile') {
                state.mobile.isMobile = true
            } else state.desktop.isDesktop = true
        },
        onSwitchActiveTeamTab (state, action: PayloadAction<teamTabsTypes>) {
            state.team_tabs.active_team_tab = action.payload
        },
        onExpandSection(state, action: PayloadAction<expandTypes>) {
            state.expanded_section = action.payload
        }
    }
})

export const { switchMobileOrientation, expandSection, switchVersion, expandDesktopSection, onSwitchActiveTeamTab, onExpandSection } = interfaceSlice.actions
export default interfaceSlice.reducer