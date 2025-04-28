import { Coach, TimeFrameMetrics } from "../types/types"
import { ILastMatch } from "./ILastMatch"
import { Candle } from "../types/types"
import { FootballMetricTimeFrame } from "../types/FootballField/FootballMetricTimeFrame/FootbalMetricTimeFrame"
import { Fact } from "../types/InformationTabs/SingleTeamInfo/Fact"
import { Form } from "../types/InformationTabs/SingleTeamInfo/Form"
import { TeamSeasonResult } from "../types/InformationTabs/TeamSeasonsResults/TeamSeasonResults"
import { TeamRecords } from "../types/InformationTabs/SingleTeamInfo/Records/ClubRecords/ClubRecords"
import { PlayerRecords } from "../types/InformationTabs/SingleTeamInfo/Records/PlayerRecords/PlayerRecords"
import { Achievement } from "../types/InformationTabs/Achievement/Achievement"
import { Stadion } from "../types/InformationTabs/Stadium/Stadion"
import { Sponsor } from "../types/InformationTabs/SingleTeamInfo/Sponsor"

export interface ITeam {
    category_name?: string, 
    is_event?: boolean
    candles: Candle[],
    draws: number,
    field: {
        timeframe_1: FootballMetricTimeFrame,
        timeframe_3: FootballMetricTimeFrame,
        timeframe_5: FootballMetricTimeFrame,
        timeframe_10: FootballMetricTimeFrame,
        timeframe_15: FootballMetricTimeFrame,
        timeframe_all: FootballMetricTimeFrame
    },
    games: number,
    last_matches: ILastMatch[],
    losses: number,
    metrics?: {
        timeframe_1: {
            full_time: TimeFrameMetrics,
            time_1: TimeFrameMetrics,
            time_2: TimeFrameMetrics
        },
        timeframe_3: {
            full_time: TimeFrameMetrics,
            time_1: TimeFrameMetrics,
            time_2: TimeFrameMetrics
        },
        timeframe_5: {
            full_time: TimeFrameMetrics,
            time_1: TimeFrameMetrics,
            time_2: TimeFrameMetrics
        },
        timeframe_10: {
            full_time: TimeFrameMetrics,
            time_1: TimeFrameMetrics,
            time_2: TimeFrameMetrics
        },
        timeframe_15: {
            full_time: TimeFrameMetrics,
            time_1: TimeFrameMetrics,
            time_2: TimeFrameMetrics
        },
        timeframe_all: {
            full_time: TimeFrameMetrics,
            time_1: TimeFrameMetrics,
            time_2: TimeFrameMetrics
        },

    },
    odd_score?: number,
    odd_score_procent?: number,
    score: number,
    spread: number,
    tabs: {
        achievements: Achievement[],
        facts: Fact[],
        form: Form,
        players_records: PlayerRecords
        seasons: TeamSeasonResult[]
        sponsors: Sponsor[],
        stadion: Stadion,
        team_alter_name: string,
        team_alter_name_ru: string,
        team_found_date: string,
        team_records: TeamRecords,
        team_short_name: string
    },
    team_coach: Coach,
    team_img: string,
    team_name: string,
    team_uuid: string,
    team_short_name: string,
    team_name_ru: string,
    team_short_name_ru: string,
    wins: number,
    xG: number,
    team_svg_img: string
}

