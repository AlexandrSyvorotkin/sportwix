import styles from './calendar-side-bar.module.scss'
import { useAppSelector } from '../../../../types/hooks'
import { RootState } from '../../../../store/store'


interface CalendarSideBarProps {
    secondTeamImg?: string,
    secondTeamForceIndex? : number
}

const CalendarSideBar = ({secondTeamImg, secondTeamForceIndex}: CalendarSideBarProps) => {

    const firstSelectedTeamForceIndex = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.odd_score_procent)
    const firstSelectedTeamImg = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.team_img)

    // const [spacing, setSpacing] = useState<number>(-12); // Разница в процентах, при которой начнутся отступы
  

    return (
        <div className={styles.calendar_sidebar}>
            <div className={styles.scale_wrapper}>
                <span>100</span>
                <div className={styles.scale}>
                    <div className={styles.first_team_force_inder} style={{bottom: `${firstSelectedTeamForceIndex}%`}}>
                        <div className={styles.img}>
                                <img src={`${firstSelectedTeamImg}`} alt="" />
                        </div>
                        <span className={styles.first_procents}>{firstSelectedTeamForceIndex?.toFixed(1)}</span>
                    </div>
                    {secondTeamImg && <div className={styles.second_team_force_inder} style={{bottom: `${secondTeamForceIndex}%`}}>
                        <div className={styles.img_second}>
                                <img src={`${secondTeamImg}`} alt="" />
                        </div>
                        <span className={styles.second_procents}>{secondTeamForceIndex?.toFixed(1)}</span>
                    </div>}
                        
                    {/* { 
                    <div className={styles.img} style={{bottom: `${secondTeamForceIndex}%`, left: `${spacing}px`}}>
                        <img src={`${IMG_PATH}${secondTeamImg}`} alt="" />
                    </div>
                    } */}
                </div>
                <span>0</span>
            </div>
        </div>
    )
}

export {CalendarSideBar};

