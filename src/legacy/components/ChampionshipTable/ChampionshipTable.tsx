import React, { Dispatch, FC, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import styles from './ChampionShipTable.module.scss'
import ChampionShipTableTeam from "../ChampionShipTableTeam/ChampionShipTableTeam";

import championship_coaches_table from "../../assets/control_panels_logos/championship_table_left_panel/Championship_table_left_panel/ChampionshipCoachesTable.svg";
import championship_coaches_table_active from "../../assets/control_panels_logos/championship_table_left_panel/Championship_table_left_panel/ChampionshipCoachesTableActive.svg";
import championship_coaches_table_disabled from "../../assets/control_panels_logos/championship_table_left_panel/Championship_table_left_panel/championship_coaches_table_disabled.svg";

import compare_players from "../../assets/control_panels_logos/championship_table_left_panel/ComparePlayers/ComparePlayers.svg";
import compare_players_active from "../../assets/control_panels_logos/championship_table_left_panel/ComparePlayers/ComparePlayersActive.svg";
import compare_players_disabled from "../../assets/control_panels_logos/championship_table_left_panel/ComparePlayers/compare_players_disabled.svg";


import favorite_list from "../../assets/control_panels_logos/championship_table_left_panel/FavoriteList/FavoriteList.svg";
import favorite_list_active from "../../assets/control_panels_logos/championship_table_left_panel/FavoriteList/FavoriteListActive.svg";
import favorite_list_disabled from "../../assets/control_panels_logos/championship_table_left_panel/FavoriteList/favourite_list_disabled.svg";



import championship_table from "../../assets/control_panels_logos/championship_table_left_panel/ChampionshipTable/ChampionshipTable.svg"
import championship_table_active from "../../assets/control_panels_logos/championship_table_left_panel/ChampionshipTable/ChampionshipTableActive.svg"
import ControlPanelBtn from "../../ui/Buttons/ControlPanelBtn/ControlPanelBtn";
import { ITeam } from "../../models/ITeam";
import { useAppSelector } from "../../types/hooks";
import control_btns_tooltips from '../../localization/control-buttons/control-buttons.json'


import switchToSparkline from '../../assets/control_panels_logos/common/SwitchToSparklineIcon.svg'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import LoaderAlt from '../Loader2/LoaderAlt';
import { useFetchChampionshipInfoQuery } from '../../services/championships-api/championship-api';

interface championshipTableProps {

}

const ChampionShipTable: FC<championshipTableProps> = () => {

    
    const {championshipId, season} = useAppSelector(state => state.tournamentSlice)

    const { data, isLoading, error, isFetching } = useFetchChampionshipInfoQuery({ championshipId, season })


    const teams = data?.teams?.filter((team: ITeam) => !team.is_event)

    const [teamReverseStatus, setTeamReverseStatus] = useState<boolean>(false)
    const [selectedTeamUuid, setSelectedTeamUuid] = useState<string>('')
    const maxPts = teams ? Math.max(...teams.map(team => team.score)) : 0;

  
    

    //доработать чтобы работала в реальном времени
    const deviceWidth = window.innerWidth


    const championshipTableControls = [
        { id: 1, img: championship_table, imgActive: championship_table_active, onClick: () => setTeamReverseStatus(!teamReverseStatus), active: teamReverseStatus, visible: true, imgDisabled: '', position: 'left', tooltipDescription: control_btns_tooltips.inver_table },
        { id: 2, img: championship_coaches_table, imgActive: championship_coaches_table_active, onClick: () => null, active: null, visible: true, imgDisabled: championship_coaches_table_disabled, disabled: true, position: 'left', tooltipDescription: control_btns_tooltips.inver_table },
        { id: 3, img: compare_players, imgActive: compare_players_active, onClick: () => null, active: null, visible: true, disabled: true, imgDisabled: compare_players_disabled, position: 'left', tooltipDescription: control_btns_tooltips.inver_table },
        { id: 4, img: favorite_list, imgActive: favorite_list_active, onClick: () => null, active: null, visible: true, imgDisabled: favorite_list_disabled, disabled: true, position: 'left', tooltipDescription: control_btns_tooltips.inver_table },
        { id: 5, img: switchToSparkline, imgActive: switchToSparkline, onClick: () => null, active: null, visible: deviceWidth < 768, imgDisabled: switchToSparkline, disabled: false, position: 'left', tooltipDescription: control_btns_tooltips.inver_table },
    ]

    const { language } = useContext(LanguageContext)

    const { theme } = useContext(ThemeContext)

    const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    

    return (
        <div className={styles.championship_table} >
            {isFetching ?
                <LoaderAlt />
                :
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
            }
            <div className={styles.panel_section} style={{ borderLeft: border }}>
                {championshipTableControls.map(control => <ControlPanelBtn
                    key={control.id}
                    img={control.img}
                    onClick={control.onClick}
                    imgActive={control.imgActive}
                    active={control.active}
                    visible={control.visible}
                    imgDisabled={control.imgDisabled}
                    disabled={control.disabled}
                    position={control.position}
                    tooltipDescription={control.tooltipDescription}
                />
                )}
            </div>
        </div>
    );
};

export default ChampionShipTable;