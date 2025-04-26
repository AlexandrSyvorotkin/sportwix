import { createSlice } from "@reduxjs/toolkit";

interface TeamStatsControls {
    isVisible: boolean
}

const initialState: TeamStatsControls = {
    isVisible: false
}

const teamStatsControls = createSlice({
    name: 'teamStatsControls',
    initialState,
    reducers: {
        changeTeamStatsControlsVisibleToTrue(state) {
            state.isVisible = true
        },
        changeTeamStatsControlsVisibleToFalse(state) {
            state.isVisible = false
        }
    }
})

export const {changeTeamStatsControlsVisibleToTrue, changeTeamStatsControlsVisibleToFalse} = teamStatsControls.actions
export default teamStatsControls.reducer