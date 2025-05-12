
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "../../types/hooks";
import styles from './championship-table-team.module.scss'
import { useState } from "react";
import { ITeam } from "src/models/ITeam";
import { chooseFirstTeam, switchToSingleCandleChart } from "../../store/tournament-slice/tournament-slice";

interface ChampionShipTableTeamProps {
    maxPts: number,
    team: any,
    place: number,
    selectedTeamUuid: string,
    setSelectedTeamUuid: (id: string) => void,
}

const ChampionShipTableTeam = ({maxPts, team, place}: ChampionShipTableTeamProps) => {

    const dispatch = useAppDispatch()


    // const {BASE_PATH, API, V1, EVENT, TEAM} = API_VARIABLES


    const progressBarWidth = Math.round(((team.score/maxPts) * 100))  
    const firstSelectedTeamUuid = useAppSelector(state => state.tournamentSlice.firstSelectedTeamUuid)   


    // const {theme} = useContext(ThemeContext)
    // const {language} = useContext(LanguageContext)
    const theme = 'dark'
    const language = 'Eng'

    const placeStyles = classNames({
        [styles.place_main]: true,
        [styles.place_champions_league]: place <= 4 && theme === 'dark',
        [styles.place_champions_league_light]: place <= 4,
        [styles.place_europe_league]: place === 5,
        [styles.place_conference_league]: place > 5 && place <=7,
        [styles.place_conference_league_light]: place > 5 && place <=7,
        [styles.place_etc]: place >= 8,
        [styles.place_leave]: place >= 18,
        [styles.place_leave_light]:  place >= 18,
        // [styles.place_main_light] : theme === 'light'
    })


    const tableTeamStyles = classNames({
        [styles.championship_table_team]: true,
        [styles.team_selected]: team.team_uuid === firstSelectedTeamUuid,
        // [styles.championship_table_team_light]: theme === 'light',
        [styles.championship_table_team_dark]: theme === 'dark'
    })

    const progressBarStyles = classNames({
        [styles.progress_bar]: true,
        [styles.progress_bar_dark]: true,
        // [styles.progress_bar_light]: theme === 'light'
    })

    const [progressBarDisplay] = useState<string>('block')



    // const loadingCandles = useAppSelector((state: RootState) => state.candleSliceNew.loading)

   

    // function fetchSingleTeamInfoData(id:string ,team: ITeam) {
    //     dispatch(setCurrentSeasonsAmount(3))
    //     dispatch(setSpliteType(false))
    //     dispatch(setFirstSelectedTeamUuid(id))
    //     dispatch(switchToSingleCandleChart())
    //     dispatch(chooseFirstTeam(team))
    //     dispatch(clearFilters())
    // }

    const onSelectTeam = (team: ITeam) => {
        dispatch(chooseFirstTeam(team))
        dispatch(switchToSingleCandleChart())
    }
    return (
        <div className={tableTeamStyles} onClick={() => onSelectTeam(team)} id={`selected_team+${team.team_name}`}>
            <div className={styles.team_name}>
                <div className={placeStyles}>{place}</div>
                <div className={styles.name}>{language === 'Eng' ? team.team_name : team.team_name_ru}</div>
            </div>
            <div className={styles.progress_wrapper}>
                <div className={progressBarStyles} style={{ width: `${progressBarWidth}%`, display: `${progressBarDisplay}` }}/>
            </div>
            <div className={styles.team_parameters}>
                <div className={styles.metrics}>
                    <span>{team.score}</span>
                </div>
            </div>
        </div>
    );
};

export default ChampionShipTableTeam;