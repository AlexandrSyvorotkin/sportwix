import { useState } from 'react';
import styles from './championship-table.module.scss'
import ChampionShipTableTeam from '../championship-table-team/championship-table-team';
import { useAppSelector } from '@hooks/hooks';
import { RootState } from '@store/store';

const ChampionShipTable = () => {


    // const {championshipId, season} = useAppSelector(state => state.tournamentSlice)

    // const { data, isLoading, error, isFetching } = useFetchChampionshipInfoQuery({ championshipId, season })


    // const teams = data?.teams?.filter((team: ITeam) => !team.is_event)
    const teams = useAppSelector((state: RootState) => state.tournamentSlice.tournament?.teams)
    const [teamReverseStatus] = useState<boolean>(false)
    const [selectedTeamUuid, setSelectedTeamUuid] = useState<string>('')
    const maxPts = teams ? Math.max(...teams.map(team => team.score)) : 0;





    // const championshipTableControls = [
    //     { id: 1, img: championship_table, imgActive: championship_table_active, onClick: () => setTeamReverseStatus(!teamReverseStatus), active: teamReverseStatus, visible: true, imgDisabled: '', position: 'left', tooltipDescription: control_btns_tooltips.inver_table },
    //     { id: 2, img: championship_coaches_table, imgActive: championship_coaches_table_active, onClick: () => null, active: null, visible: true, imgDisabled: championship_coaches_table_disabled, disabled: true, position: 'left', tooltipDescription: control_btns_tooltips.inver_table },
    //     { id: 3, img: compare_players, imgActive: compare_players_active, onClick: () => null, active: null, visible: true, disabled: true, imgDisabled: compare_players_disabled, position: 'left', tooltipDescription: control_btns_tooltips.inver_table },
    //     { id: 4, img: favorite_list, imgActive: favorite_list_active, onClick: () => null, active: null, visible: true, imgDisabled: favorite_list_disabled, disabled: true, position: 'left', tooltipDescription: control_btns_tooltips.inver_table },
    //     { id: 5, img: switchToSparkline, imgActive: switchToSparkline, onClick: () => null, active: null, visible: deviceWidth < 768, imgDisabled: switchToSparkline, disabled: false, position: 'left', tooltipDescription: control_btns_tooltips.inver_table },
    // ]

    // const { language } = useContext(LanguageContext)

    // const { theme } = useContext(ThemeContext)

    // const theme = 'dark'
    const language = 'Eng'

    // const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'



    return (
        <div className={styles.championship_table} >
            <div className={styles.table} id='championship-table'>
                <div className={styles.table_tabs}>
                    <div className={styles.info_panel}>
                        <span>№</span>
                        <span>{language === 'Eng' ? "Teams" : "Команды"}</span>
                    </div>
                    <ul className={styles.param_list}>
                        {/* <li className={styles.tab_item} style={{display: `${displayTeamGames}`}}>games</li> */}
                        <li className={styles.tab_item}>{language === 'Eng' ? "points" : "очки"}</li>
                    </ul>
                </div>
                <div className={styles.table_teams}>
                    {teams?.map((team, id) => {

                        if (team.team_name === 'Liverpool') {
                            return (
                                <ChampionShipTableTeam
                                    key={team.team_uuid}
                                    place={!teamReverseStatus ? id + 1 : teams.length - id}
                                    maxPts={maxPts}
                                    team={team}
                                    selectedTeamUuid={selectedTeamUuid}
                                    setSelectedTeamUuid={setSelectedTeamUuid}
                                />
                            )
                        }

                        return (
                            <div className='w-full opacity-50 pointer-events-none'>
                                <ChampionShipTableTeam
                                    key={team.team_uuid}
                                    place={!teamReverseStatus ? id + 1 : teams.length - id}
                                    maxPts={maxPts}
                                    team={team}
                                    selectedTeamUuid={selectedTeamUuid}
                                    setSelectedTeamUuid={setSelectedTeamUuid}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ChampionShipTable;