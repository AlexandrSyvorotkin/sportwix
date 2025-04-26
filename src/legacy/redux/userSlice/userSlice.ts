import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    username?: string,
    accessToken?: string,
    refreshToken?: string
    isAuth: boolean,
    userAvatar?: string
}

const initialState: UserState = {
    username: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    isAuth: false,
    userAvatar: undefined
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{username: string, accessToken: string, refreshToken: string}>) {
            state.username = action.payload.username;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken
            state.isAuth = true;
        },
        setUserAvatar(state, action) {
            state.userAvatar = action.payload
        },
        removeUser(state) {
            state.username = '';
            state.accessToken = '';
            state.refreshToken = ''
            state.isAuth = false;
        },
    },
});

export const { setUser, removeUser, setUserAvatar } = userSlice.actions;
export default userSlice.reducer;
