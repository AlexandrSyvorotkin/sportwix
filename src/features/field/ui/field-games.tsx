import { Dispatch, SetStateAction, useState } from 'react';
import { useAppSelector } from '@hooks/hooks';
import { RootState } from '@store/store';
import { Separator } from '@shared/separator';


interface FiledLastGamesProps {
  selectedGamesCount: number,
  setSelectedGamesCount: Dispatch<SetStateAction<number>>,
}

const FieldGames = ({ selectedGamesCount, setSelectedGamesCount }: FiledLastGamesProps) => {


  const isH2hStatus = useAppSelector((state: RootState) => state.tournamentSlice.h2h.isH2h.field)





  const [activeTimeFrameEl, setActiveTimeFrameEl] = useState(1)


  const gameTimeFrames = [
    { id: 1, timeFrame: "1 game", timeFrameIndex: 1 },
    { id: 2, timeFrame: '3 games', timeFrameIndex: 3 },
    { id: 3, timeFrame: '5 games', timeFrameIndex: 5 },
    { id: 4, timeFrame: '10 games', timeFrameIndex: 10 },
    { id: 5, timeFrame: '15 games', timeFrameIndex: 15 },
    { id: 6, timeFrame: 'season', timeFrameIndex: 38 },
  ]

  const clickHandler = (id: number, timeFrameIndex: number) => {
    // filterMidfieldByTimeFrame(timeFrameIndex)
    if (!isH2hStatus) {
      setSelectedGamesCount(timeFrameIndex)
      setActiveTimeFrameEl(id)
    } else return null

  }

  return (
    <div className='w-[15%] h-full flex'>
      <div className="flex flex-col w-full h-full">
        <div className="p-2.5 flex flex-col justify-between h-[20%] text-sm">
          <div className="">Games</div>
        </div>
        <Separator className='w-full h-[1px]' />
        <div className="h-[80%] flex justify-between flex-col">
          {gameTimeFrames.map(it => {
            const isActive = activeTimeFrameEl === it.id ? 'bg-gray-900 text-white' : 'text-gray-400'
            return (
              <div className='w-full flex flex-col h-[calc(100%/6)]'>
                <div
                  className={`h-full flex justify-center items-center cursor-pointer ${isActive}`}
                  key={it.id}
                  onClick={() => clickHandler(it.id, it.timeFrameIndex)}
                >
                  {it.timeFrame}
                </div>
                <Separator className='w-full h-[1px]' />
              </div>
            )
          }
          )}
        </div>
      </div>
      <Separator className='w-[1px] h-full' />
    </div>
  )
}

export { FieldGames }