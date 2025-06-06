import { PlayerRecord } from './PlayerRecord'

export type PlayerRecords = {
  most_goals: PlayerRecord[]
  most_assists: PlayerRecord[]
  most_yellow_cards: PlayerRecord[]
  most_red_cards: PlayerRecord[]
  most_clean_sheets: PlayerRecord[]
  most_goals_conceded: PlayerRecord[]
  most_saves: PlayerRecord[]
  most_shots_on_target: PlayerRecord[]
  most_shots_off_target: PlayerRecord[]
  most_shots_blocked: PlayerRecord[]
  most_fouls: PlayerRecord[]
  most_offsides: PlayerRecord[]
}
