import { ITeam } from '../../models/ITeam'
import { ILastMatch } from '../../models/ILastMatch'

export type Championship = {
  last_matches: ILastMatch[]
  teams: ITeam[]
}
