import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/tooltip'

interface CalendarGameItemGoal {
  type: 'selected-team' | 'versus-team'
  goal_player: string
  goal_minute: number
  player_img: string
}

const CalendarGameGoal = ({ type, goal_player, goal_minute, player_img }: CalendarGameItemGoal) => {
  const goalStyles = `w-3 h-3 rounded-full relative cursor-pointer hover:border hover:border-white ${
    type === 'versus-team' ? 'bg-[#ED392F]' : 'bg-[#469A1F]'
  }`

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={goalStyles} />
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-2 items-center">
            {player_img && (
              <div className="w-14 h-14">
                <img src={player_img} alt={goal_player} className="w-full h-full object-cover" />
              </div>
            )}
            <p>
              {goal_player} {goal_minute}'
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { CalendarGameGoal }
