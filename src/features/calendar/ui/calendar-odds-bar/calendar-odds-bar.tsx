interface CalendarOddsBarProps {
  team_target_odds_procents: number
  team_opponent_odds_procents: number
  draw_odds_procents: number
}

export function CalendarOddsBar({
  team_target_odds_procents,
  team_opponent_odds_procents,
  draw_odds_procents,
}: CalendarOddsBarProps) {
  const greenDisplay = Math.round(team_target_odds_procents) < 5 ? 'none' : 'block'
  const redDisplay = Math.round(team_opponent_odds_procents) < 5 ? 'none' : 'block'
  const topBorder = greenDisplay === 'none' ? '5px' : ' '
  const bottomBorder = redDisplay === 'none' ? '5px' : ' '

  const yellowHeight = (() => {
    let height = draw_odds_procents
    if (Math.round(team_target_odds_procents) < 5) {
      height += team_target_odds_procents
    } else if (Math.round(team_opponent_odds_procents) < 5) {
      height += team_opponent_odds_procents
    }
    return height
  })()

  return (
    <div className="min-h-[35%] flex flex-col">
      <div
        className="bg-[#469A1F] w-3 rounded-t-[5px]"
        style={{ height: `${team_target_odds_procents}%`, display: greenDisplay }}
      ></div>
      <div
        className="bg-[#B7A503] w-3"
        style={{
          height: `${yellowHeight}%`,
          borderTopLeftRadius: topBorder,
          borderTopRightRadius: topBorder,
          borderBottomLeftRadius: bottomBorder,
          borderBottomRightRadius: bottomBorder,
        }}
      />
      <div
        className="bg-[#ED392F] w-3 rounded-b-[5px]"
        style={{ height: `${team_opponent_odds_procents}%`, display: redDisplay }}
      ></div>
    </div>
  )
}
