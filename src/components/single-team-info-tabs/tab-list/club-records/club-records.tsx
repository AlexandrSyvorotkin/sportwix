import { useAppSelector } from '@hooks/hooks'
import { RootState } from 'src/store/store'
import { Separator } from '@shared/separator/separator'

const ClubRecords = () => {
  const club_records = useAppSelector(
    (state: RootState) => state.tournamentSlice.firstSelectedTeam?.tabs.team_records
  )
  const language = 'Eng'

  return (
    <div className="flex flex-col">
      {club_records?.longest_unbeaten_streak ? (
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-center items-center p-[10px] flex-col">
            <span>
              {language === 'Eng'
                ? 'Longest Unbeaten Streak'
                : 'Самая длинная беспроигрышная серия'}
            </span>
          </div>
          <Separator className="w-full h-[1px]" />
        </div>
      ) : null}
      {club_records?.longest_unbeaten_streak?.map((record, id: number) => (
        <div className="flex flex-col">
          <div key={id} className="flex justify-center items-center w-full">
            <span className="flex w-1/3 justify-center items-center">
              {record.value} {language === 'Eng' ? 'games' : 'Игр'}
            </span>
            <div className="flex w-2/3 h-[50px]">
              <span className="p-[10px] h-[50px] flex justify-center items-center w-1/2">
                {record.league}
              </span>
              <span className="p-[10px] h-[50px] flex justify-center items-center w-1/2">
                {record.period}
              </span>
            </div>
          </div>
          <Separator className="w-full h-[1px]" />
        </div>
      ))}
      {club_records?.treble ? (
        <div className="flex flex-col">
          <div className="w-full flex justify-center items-center p-[10px] flex-col">
            <span>{language === 'Eng' ? 'Treble' : 'Требл'}</span>
          </div>
          <Separator className="w-full h-[1px]" />
        </div>
      ) : null}
      {club_records?.treble?.map((record, id: number) => (
        <div className="flex flex-col">
          <div key={id} className="w-full flex justify-center items-center">
            <span className="p-[10px] h-[50px] flex justify-center items-center w-1/3">
              {record.value} {language === 'Eng' ? 'games' : 'Игр'}
            </span>
            <div className="flex w-2/3">
              <span className="p-[10px] h-[50px] flex justify-center items-center w-1/2">
                {record.league}
              </span>
              <span className="p-[10px] h-[50px] flex justify-center items-center w-1/2">
                {record.period}
              </span>
            </div>
          </div>
          <Separator className="w-full h-[1px]" />
        </div>
      ))}
    </div>
  )
}

export { ClubRecords }
