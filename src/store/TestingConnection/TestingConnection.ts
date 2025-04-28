import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type matchUuid = {
    matchUuid?: string 
}

const initialState: matchUuid = {
    matchUuid: undefined
}

const testingSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        currentMatchUuid(state, action: PayloadAction<string>) {
            state.matchUuid = action.payload
        }
    }
})

export const {currentMatchUuid} = testingSlice.actions
export default testingSlice.reducer