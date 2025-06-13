

import { Corner, GoalkeeperZone } from '@shared/field'

const Defence = ({
  firstSelectedTeam,
  secondSelectedTeam,
  goalkeeperParameters,
  defenceParameters
}: {
  firstSelectedTeam: React.ReactNode,
  secondSelectedTeam: React.ReactNode,
  goalkeeperParameters: React.ReactNode,
  defenceParameters: React.ReactNode
}) => {

  return (
    <div className="w-1/3 h-full">
      <div className="w-full h-full flex gap-8 items-center relative">
        <div className="flex flex-col justify-between h-full relative">
          <Corner side="left-top" />
          {firstSelectedTeam}
          {secondSelectedTeam}
          <GoalkeeperZone side="left">
            {goalkeeperParameters}
          </GoalkeeperZone>
          <Corner side="left-bottom" />
        </div>
        <div className="flex flex-col gap-2.5 items-center justify-center">
          {defenceParameters}
        </div>
      </div>
    </div>
  )
}

export { Defence }