import {Goal, LastMatchTeam} from "../types/types";

export interface ILastMatch {
    accurate_passes_realized_away: number
    accurate_passes_realized_home: number
    accurate_passes_unsuccessull_away: number
    accurate_passes_unsuccessull_home: number
    away_team: LastMatchTeam,
    ball_possesion_away: number,
    ball_possesion_home: number,
    bch_away: number,
    bch_home: number,
    bchm_away: number,
    bchm_home: number,
    corners_away: number,
    corners_home: number,
    date: string,
    status: "finished" | "notstarted" | "inprogress",
    home_team: LastMatchTeam,
    offsides_away: number,
    offsides_home: number,
    score: {
        short_score: {
            full_time: number[] | []
        },
        goals_away: Goal[] | []
        goals_home: Goal[] | []
    },
    total_shots_away: number,
    total_shots_home: number,
    uuid: string
    x_g_away: string
    x_g_home: string,
    is_home?: boolean,
    match_result?: string,
    odds: {
        draw_odds: number,
        draw_odds_procents: number, 
        team_opponent_img: string,
        team_opponent_name: string,
        team_opponent_odds: number,
        team_opponent_odds_procents: number
        team_target_odds: number
        team_target_odds_procents: number
    }
}