import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
    activeTabs: {
        activeTeamDetailInfoTab: number,
        activeSingleTeamInfoTab: number
    },
    activeMobileTabs: {
        activeTeamDetailInfoTab: number,
    }
    

}

const initialState: initialState = {
    activeTabs: {
        activeTeamDetailInfoTab: 1,
        activeSingleTeamInfoTab: 1
    },
    activeMobileTabs: {
        activeTeamDetailInfoTab: 1,
    }
}

const teamTabsSlice = createSlice({
    name: 'teamTabs',
    initialState,
    reducers: {
        switchActiveTeamDetailInfoTab (state, action: PayloadAction<number>) {
            state.activeTabs.activeTeamDetailInfoTab = action.payload
        },
        switchActiveSingleTeamInfoTab (state, action: PayloadAction<number>) {
            state.activeTabs.activeSingleTeamInfoTab = action.payload
        },
        switchActiveTeamDetailInfoTabMobile (state, action: PayloadAction<number>) {
            state.activeMobileTabs.activeTeamDetailInfoTab = action.payload
        }
}})

export const { switchActiveTeamDetailInfoTab, switchActiveSingleTeamInfoTab, switchActiveTeamDetailInfoTabMobile} = teamTabsSlice.actions
export default teamTabsSlice.reducer