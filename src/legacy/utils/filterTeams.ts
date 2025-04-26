import { ITeam } from "../models/ITeam";

export const filterTeams = (teams: ITeam[] | undefined) => {
    return teams?.filter(team => !team.is_event)
}