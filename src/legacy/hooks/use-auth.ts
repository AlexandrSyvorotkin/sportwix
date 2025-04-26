import { useAppSelector } from "../types/hooks";

export function useAuth() {
    const {accessToken, username, } = useAppSelector(state => state.user)
    return {
        username,
    }
}