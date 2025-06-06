import { CalendarGameGoal } from '../calendar-game-goal'
import { formattedDate } from '../../lib'
import { CalendarOddsBar } from '../calendar-odds-bar'
import { ILastMatch } from 'src/models/ILastMatch'

export type Goal = {
  munite: number
  player: string
  player_img: string
  assist_player: string
  assist_player_img: string
}

interface CalendarGameItemProps {
  team?: ILastMatch
  team_img?: string
  date?: string
  season?: string
  goals_selected?: Goal[]
  goals_versus?: Goal[]
  team_target_odds_procents: number
  draw_odds_procents: number
  team_opponent_odds_procents: number
  status: 'finished' | 'notstarted' | 'inprogress'
}

const CalendarGame = ({
  team_img,
  date,
  goals_selected,
  goals_versus,
  team_opponent_odds_procents,
  draw_odds_procents,
  team_target_odds_procents,
}: CalendarGameItemProps) => {
  const goalsSelectedTeam =
    goals_selected &&
    goals_selected.map((goal: Goal, i: number) => {
      return (
        <CalendarGameGoal
          key={i}
          type="selected-team"
          goal_player={goal.player}
          goal_minute={goal.munite}
          player_img={goal.player_img}
        />
      )
    })

  const goalsVersusTeam =
    goals_versus &&
    goals_versus.map((goal: Goal, i: number) => (
      <CalendarGameGoal
        key={i}
        type="versus-team"
        goal_player={goal.player}
        goal_minute={goal.munite}
        player_img={goal.player_img}
      />
    ))

  // const firstSelectedTeamUuid = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.team_uuid)
  // const { championshipId, season } = useAppSelector(state => state.tournamentSlice)
  // const { data } = useFetchChampionshipInfoQuery({ championshipId, season })

  // const filterSelectedTeams = (selectedTeam: any) => {
  //     if (status === 'notstarted') {
  //         const filteredTeam = data?.teams.filter(it => it.team_uuid === selectedTeam.home_team.uuid || it.team_uuid === selectedTeam.away_team.uuid)
  //         const newTeam = filteredTeam?.filter(it => it.team_uuid != firstSelectedTeamUuid)
  //         if (newTeam) {
  //             setSecondTeamForceIndex(newTeam[0])
  //         }
  //     } else {
  //         return null
  //     }
  // }

  return (
    <div className="flex flex-col justify-between items-center gap-[5px] h-full p-[2px]">
      <CalendarOddsBar
        team_target_odds_procents={team_target_odds_procents}
        team_opponent_odds_procents={team_opponent_odds_procents}
        draw_odds_procents={draw_odds_procents}
      />
      <div className="w-10 h-10">
        <img src={`${team_img}`} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex gap-[5px] min-h-[80px] relative items-start">
        <div className="flex flex-col gap-[5px]">{goalsSelectedTeam}</div>
        <div className="flex flex-col gap-[5px]">{goalsVersusTeam}</div>
      </div>
      <div className="flex flex-col gap-[10px] font-normal text-[12px] leading-3 text-[#EEEEEE]">
        <span>{formattedDate(date || '')}</span>
      </div>
    </div>
  )
}

export { CalendarGame }
