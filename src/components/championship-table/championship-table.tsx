import { useMemo, useState } from 'react';
import styles from './championship-table.module.scss'

// import { useAppSelector } from "../../legacy/types/hooks";

import teamsMock from '../../mocks/teams-mock.json'
import ChampionShipTableTeam from '../championship-table-team/championship-table-team';
import PanelBtn from '../../ui/panel-btn/panel-btn';

import ChampionshipTableIcon from '../../assets/icons/championship-table.svg?react'
import ChampionshipTableCoachesIcon from '../../assets/icons/championmship-table-coaches.svg?react'
import ComparePlayersIcon from '../../assets/icons/compare-players.svg?react'
import FavouriteListIcon from '../../assets/icons/favourite-list.svg?react'

interface ChampionshipTableProps {
    // Add your props here
}

const ChampionShipTable = ({}: ChampionshipTableProps) => {

    
    // const {championshipId, season} = useAppSelector(state => state.tournamentSlice)

    // const { data, isLoading, error, isFetching } = useFetchChampionshipInfoQuery({ championshipId, season })


    // const teams = data?.teams?.filter((team: ITeam) => !team.is_event)
    const teams = teamsMock
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

    const theme = 'dark'
    const language = 'Eng'

    // const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    const rightTableBtns = useMemo(() => [
        {
            id: 1,
            icon: <ChampionshipTableIcon/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 2,
            icon: <ChampionshipTableCoachesIcon/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 3,
            icon: <ComparePlayersIcon/>,
            onClick: () => null,
            disabled: true
        },{
            id: 4,
            icon: <FavouriteListIcon/>,
            onClick: () => null,
            disabled: true
        }
    ], [])

    
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
                        {teams?.map((team, id) =>
                                <ChampionShipTableTeam
                                    key={team.team_uuid}
                                    place={!teamReverseStatus ? id + 1 : teams.length - id}
                                    maxPts={maxPts}
                                    team={team}
                                    selectedTeamUuid={selectedTeamUuid}
                                    setSelectedTeamUuid={setSelectedTeamUuid}
                                />
                        )}
                    </div>
                </div>
            <div className={styles.panel_section}>
                {rightTableBtns.map(({ id, ...btnProps }) => (
                        <PanelBtn key={id} {...btnProps} />
                    ))}
            </div>
        </div>
    );
};

export default ChampionShipTable;