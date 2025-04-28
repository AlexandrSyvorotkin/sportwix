import { FC } from 'react';
import styles from './SparklineTable.module.scss'
// import { ITeam } from "../../legacy/models/ITeam";
import sparklineCap from '../../localization/sparkline/sparkline-cap.json'
import { RootState } from '../../store/store';
import classNames from 'classnames';
// import { useFetchChampionshipInfoQuery } from '../../services/championships-api/championship-api';
// import TeamSparkLine from '../../legacy/components/TeamSparkLine/TeamSparkLine';

interface SparkLineSectionProps {
    sectionWidth: number,
}

const SparkLineSection: FC<SparkLineSectionProps> = ({  }) => {

    // const interfaceState = useAppSelector((state: RootState) => state.interfaceState)

    // const {championshipId, season} = useAppSelector(state => state.tournamentSlice)
    // const { data, isLoading, error, isFetching } = useFetchChampionshipInfoQuery({ championshipId, season })


    // const teams = data?.teams?.filter((team: ITeam) => !team.is_event)


    const sparklineHeaderColors = classNames({
        [styles.header]: true,
        // [styles.bkg_light]: theme === 'light',
        // [styles.bkg_dark]: theme === 'dark'
    })

    const theme = 'dark'

    const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'
    // const [isFutureGame, setIsFutureGame] = useState(true)

    // const championshipTeams = useAppSelector(state => state.tournamentSlice.tournament?.teams.filter(((team:ITeam) => !team.is_event)))

    return (
            <div className={styles.sparkline_wrapper} id='sparkline'>
                <div className={sparklineHeaderColors} style={{borderBottom: border}}>
                    <div className={styles.header_items} >
                        <div className={styles.team_pos}>{sparklineCap[0].ru}</div>
                        <div className={styles.team_img}>{sparklineCap[1].ru}</div>
                        <div className={styles.team_coach}>{sparklineCap[2].ru}</div>
                        <div className={styles.team_name}>{sparklineCap[3].ru}</div>
                        <div className={styles.season_bar}>{sparklineCap[4].ru}</div>
                        <div className={styles.line_chart}>{sparklineCap[5].ru}</div>
                        {/* {interfaceState.mobile.expandSections.sparklineSection ? <div className={styles.medals}>{language === 'Eng' ? sparklineCap[6].eng : sparklineCap[6].ru}</div> : null} */}
                        <div className={styles.last_games}>{sparklineCap[7].ru}</div>
                        {/* {isFutureGame ?
                            <div className={styles.next_game}>{language === 'Eng' ? sparklineCap[8].eng : sparklineCap[8].ru}</div>
                        :  null
                        } */}
                        <div className={styles.next_game}>{sparklineCap[8].ru}</div>
                    </div>
                </div>
                {/* {isFetching ? <span>Loading...</span> :    
                    <div>
                    {teams?.map((team: ITeam, id: number) =>
                        <TeamSparkLine section_width={sectionWidth} team={team} id={id} uuid={team.team_uuid} key={id} setIsFutureGame={setIsFutureGame}/>
                    )}
                </div>
                } */}
            </div>
    );
};

export default SparkLineSection;
