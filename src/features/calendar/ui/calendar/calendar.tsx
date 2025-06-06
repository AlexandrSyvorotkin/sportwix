import { useEffect, useMemo, useState } from 'react'
import ball from '@assets/icons/ball.svg'
import percent from '@assets/icons/precent.png'
import { useAppSelector } from '../../../../types/hooks'
import { RootState } from '@store/store'
import { ILastMatch } from '../../../../models/ILastMatch'
import { CalendarGame } from '../calendar-game'
import { Separator } from '@shared/separator'
import { CalendarSideBar } from '../calendar-side-bar'

const Calendar = () => {
  const isSingleTeamView = useAppSelector(
    (state: RootState) => state.tournamentSlice.isSingleTeamView
  )
  const isDoubleTeamView = useAppSelector(
    (state: RootState) => state.tournamentSlice.isDoubleTeamView
  )

  const recentFirstTeamMatches = useAppSelector(
    (state: RootState) => state.tournamentSlice.firstSelectedTeam?.last_matches
  )

  const finishedLastMatches = recentFirstTeamMatches?.filter(game => game.status === 'finished')
  // const futureMatches = recentFirstTeamMatches?.filter(game => game.status === 'notstarted')

  const [activeLastMatches, setActiveLastMatches] = useState<ILastMatch[]>([])

  let lastGamesCopy = useMemo<ILastMatch[]>(() => {
    if (Array.isArray(finishedLastMatches)) {
      return [...finishedLastMatches]
    } else {
      return []
    }
  }, [finishedLastMatches])

  if (Array.isArray(finishedLastMatches)) {
    lastGamesCopy = [...finishedLastMatches]
  } else {
    // Обработка случая, когда recentSingleTeamMatches не является массивом
    lastGamesCopy = []
  }

  useEffect(() => {
    if (isSingleTeamView || isDoubleTeamView) {
      setActiveLastMatches(lastGamesCopy)
    } else {
      setActiveLastMatches([])
    }
  }, [isSingleTeamView, recentFirstTeamMatches, isDoubleTeamView, lastGamesCopy])

  const [secondTeamForceIndex, setSecondTeamForceIndex] = useState<
    { team_img: string; odd_score_procent: number } | undefined
  >(undefined)

  useEffect(() => {
    setSecondTeamForceIndex(undefined)
  }, [recentFirstTeamMatches])

  return (
    <div className="flex w-full h-full">
      <div className="w-[13%] h-full border-r border-[#5C5C5C] max-sm:w-[20%]">
        <CalendarSideBar
          secondTeamImg={secondTeamForceIndex?.team_img}
          secondTeamForceIndex={secondTeamForceIndex?.odd_score_procent}
        />
      </div>
      <div className="w-full h-full p-[10px] flex gap-5 overflow-x-auto">
        <div className="flex flex-col gap-[90px] h-full justify-center">
          <div className="w-5 h-5">
            <img src={percent} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-5 h-5">
            <img src={ball} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex gap-[30px]">
          {activeLastMatches?.map(single_match => (
            <CalendarGame
              key={single_match.uuid}
              team_img={
                single_match.is_home ? single_match.away_team.img : single_match.home_team.img
              }
              goals_selected={
                single_match.is_home
                  ? single_match?.score.goals_home
                  : single_match.score.goals_away
              }
              goals_versus={
                single_match.is_home
                  ? single_match?.score.goals_away
                  : single_match.score.goals_home
              }
              date={single_match.is_home ? single_match.date : single_match.date}
              team_opponent_odds_procents={single_match.odds.team_opponent_odds_procents}
              draw_odds_procents={single_match.odds.draw_odds_procents}
              team_target_odds_procents={single_match.odds.team_target_odds_procents}
              team={single_match}
              status={single_match.status}
            />
          ))}
          <Separator className="h-full w-[1px]" />
          {/*{futureMatches?.slice(0,3).map(single_match =>
                        <CalendarGameItem
                            key={single_match.uuid}
                            team_img={single_match.is_home ? single_match.away_team.img : single_match.home_team.img}
                            goals_selected={single_match.is_home ? single_match?.score.goals_home : single_match.score.goals_away}
                            goals_versus={single_match.is_home ? single_match?.score.goals_away : single_match.score.goals_home}
                            date={single_match.is_home ? single_match.date : single_match.date}
                            team_opponent_odds_procents={single_match.odds.team_opponent_odds_procents}
                            draw_odds_procents={single_match.odds.draw_odds_procents}
                            team_target_odds_procents={single_match.odds.team_target_odds_procents}
                            team={single_match}
                            setSecondTeamForceIndex={setSecondTeamForceIndex}
                            status={single_match.status}
                        />
                    )} */}
        </div>
      </div>
    </div>
  )
}

export { Calendar }
