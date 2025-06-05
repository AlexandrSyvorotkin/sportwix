import { expandTypes, teamTabsTypes } from "src/store/InterfaceSlice/InterfaceSlice";
import { candleSeasons } from "./candleSeason";

export type Coach = {
    age: number,
    country: string,
    first_name: string,
    img: string,
    last_name: string
};

export type LastMatchTeam = {
    img: string,
    name: string,
    uuid: string,
    name_ru: string,
    short_name_ru: string
}

// export type Goal = {
//     munite: number,
//     player: string,
//     player_img: string,
//     assist_player: string,
//     assist_player_img: string
// }

export type Candle = {
    away_team: string,
    away_team_img: string,
    away_team_uuid: string,
    open: number,
    high: number,
    close: number,
    low: number,
    date: string,
    event: string,
    event_uuid: string,
    tour: string,
    home_team: string,
    home_team_img: string,
    home_team_uuid: string
}

export type singleNews = {
    uuid: number,
    header_title: string,
    header_img: string,
    header_date: string,
    header_text: string,
    body_text: string,
    source_link: string
    team: string | null,
    player: string | null,
    source: string
    tags: string[]
    slug: string
}

export type News = {
    count:number, 
    results: singleNews[],
    related_tags: string[]
}


export type TimeFrameMetrics = {
    accurate_passes: number, 
    avg_coeff: number, 
    ball_possession: number, 
    bch: number,
    bchm: number
    corners: number
    delta_goals: number
    goals_conceded: number
    goals_scored: number,
    inaccurate_passes: number
    offsides: number,
    total_shots: number,
    xG_sum: number
}

export type TeamStatsMetrics = {
    accurate_passes: number, 
    avg_coeff: number, 
    ball_possession: number, 
    bch: number,
    bchm: number
    corners: number
    delta_goals: number
    goals_conceded: number
    goals_scored: number,
    inaccurate_passes: number
    offsides: number,
    total_shots: number,
    xG_sum: number
}

export type singleTeamInfoTabsTypes = 'Achievements' | 'Kits' | 'Sponsors' | 'ClubRecords' | 'PlayerRecords' | 'Facts'

export type interfaceState = {
    desktop: {
        isDesktop?: boolean,
        expandSections: {
            sparkline: boolean
        },
    },
    mobile: {
        isMobile?: boolean
        orientation: {
            portrait?: boolean,
            landscape?: boolean
        },
        expandSections: {
            sparklineSection: boolean,
            newsAndLastGamesSection: boolean,
            chartSection: boolean,
            tabsInfoSection:boolean,
        }
    },
    team_tabs: {
        active_team_tab: teamTabsTypes
    },
    single_team_info_tabs: {
        active_single_team_info_tab: singleTeamInfoTabsTypes
    },
    expanded_section: expandTypes
}

type TipParams = {
    img: string,
    text: string,
    title: string,
    video: string
}

export type Tip = {
    eng: TipParams
    ru: TipParams
}


export type candleRequest = {
    candles: Candle[],
    seasons: candleSeasons[]
}