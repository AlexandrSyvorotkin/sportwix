import { GoalkeeperZone } from '@shared/field'
import { Corner } from '@shared/field'

const Attack = ({
  attackParameters,
  attackGateParameters
}: {
  attackParameters: React.ReactNode,
  attackGateParameters: React.ReactNode
}) => {

  return (
    <div className="w-1/3 h-full">
      <div className="w-full h-full flex items-center relative justify-end gap-8">
        <div className="flex flex-col gap-2.5 items-center justify-center">
          {attackParameters}
        </div>
        <div className="flex flex-col justify-between items-end h-full relative h-full">
          <Corner side="right-top" />
          <GoalkeeperZone side="right">
            {attackGateParameters}
          </GoalkeeperZone>
          <Corner side="right-bottom" />
        </div>

      </div>
    </div>
  )
}

export { Attack } 