export type Candle = {
  all_goals?: number
  articles?: []
  away_team: string
  away_team_img: string
  away_team_uuid: string
  close: number
  date: string
  event: string
  event_uuid: string
  high: number
  home_team: string
  home_team_img: string
  is_first_match?: boolean
  is_home?: boolean
  league_img?: string
  league_season?: string
  match_uuid?: string
  missed_goals?: number
  on_time?: string
  open: number
  low: number
  place?: number
  tour: string
  home_team_uuid: string
  score?: number[]
}

export type CandleMini = {
  open: number
  high: number
  low: number
  close: number
}
