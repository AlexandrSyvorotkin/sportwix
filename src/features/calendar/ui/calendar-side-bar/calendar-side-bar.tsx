import { useAppSelector } from '@hooks/hooks'
import { RootState } from '@store/store'

interface CalendarSideBarProps {
  secondTeamImg?: string
  secondTeamForceIndex?: number
}

const CalendarSideBar = ({ secondTeamImg, secondTeamForceIndex }: CalendarSideBarProps) => {
  const firstSelectedTeamForceIndex = useAppSelector(
    (state: RootState) => state.tournamentSlice.firstSelectedTeam?.odd_score_procent
  )
  const firstSelectedTeamImg = useAppSelector(
    (state: RootState) => state.tournamentSlice.firstSelectedTeam?.team_img
  )

  // const [spacing, setSpacing] = useState<number>(-12); // Разница в процентах, при которой начнутся отступы

  return (
    <div className="w-full h-full flex justify-center p-[10px]">
      <div className="flex flex-col gap-[10px] items-center justify-center">
        <span className="text-xs">100</span>
        <div className="w-3 h-full rounded-xl bg-[#181818] border border-[#5C5C5C] relative">
          <div
            className="absolute rounded-xl w-5 left-[-5px] h-[5px] bg-[#A266F4] cursor-pointer"
            style={{ bottom: `${firstSelectedTeamForceIndex}%` }}
          >
            <div className="absolute left-[-40px] top-[-15px] w-[35px] h-[35px] z-[3]">
              <img src={`${firstSelectedTeamImg}`} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs absolute left-[23px] top-[-3px]">
              {firstSelectedTeamForceIndex?.toFixed(1)}
            </span>
          </div>
          {secondTeamImg && (
            <div
              className="absolute rounded-xl w-5 left-[-5px] h-[5px] bg-[#DC7700]"
              style={{ bottom: `${secondTeamForceIndex}%` }}
            >
              <div className="absolute left-[23px] top-[-15px] w-[35px] h-[35px] z-[3]">
                <img src={`${secondTeamImg}`} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs absolute left-[-33px] top-[-3px]">
                {secondTeamForceIndex?.toFixed(1)}
              </span>
            </div>
          )}

          {/* { 
                    <div className={styles.img} style={{bottom: `${secondTeamForceIndex}%`, left: `${spacing}px`}}>
                        <img src={`${IMG_PATH}${secondTeamImg}`} alt="" />
                    </div>
                    } */}
        </div>
        <span className="text-xs">0</span>
      </div>
    </div>
  )
}

export { CalendarSideBar }
