import React, { FC, useEffect, useState } from 'react';
import styles from './Field.module.scss'
import FootballField from "../FootballField/FootballField";
import CustomCheckboxInput from '../../ui/CustomInputs/CustomCheckboxInput/CustomCheckboxInput'
import FootballFieldSelection from '../../ui/Selections/FootballFieldSelection/FootballFieldSelection';
import FieldTimes from '../FieldTimes/FieldTimes';
import FieldLastGames from '../FieldLastGames/FieldLastGames';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { ITeam } from '../../models/ITeam';
import { useDispatch } from 'react-redux';
import FootballFieldMobile from '../FootballFieldMobile/FootballFieldMobile';
import { Time } from '../../types/gameFrameTimeTypes';
import axios from 'axios';
import { RootState } from '../../redux/store';
import LoaderAlt from '../Loader2/LoaderAlt';
import { h2h } from '../../types/ResponseTypes/h2h/h2h';
import { useFetchChampionshipInfoQuery } from '../../services/championships-api/championship-api';
import { h2hTogle, setH2hData } from '../../redux/tournament-slice/tournament-slice';


const Field: FC = ({ }) => {


    const [selectedGamesTimeFrame, setSelectedGamesTimeFrame] = useState(1)

    const [activeTimeFrame, setActiveTimeFrame] = useState({
        gametimeframe_1: Time.FT,
        gametimeframe_3: Time.FT,
        gametimeframe_5: Time.FT,
        gametimeframe_10: Time.FT,
        gametimeframe_15: Time.FT,
        gametimeframe_all: Time.FT
    })

    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState<boolean>(false)

    const teams = useAppSelector(state => state.tournamentSlice)
    const h2hHandler = () => {
        dispatch(h2hTogle('field'))
        if (teams.firstSelectedTeam && teams.secondSelectedTeam) {
            getH2Hdata(teams.firstSelectedTeam?.team_uuid, teams.secondSelectedTeam?.team_uuid)
        }
    }

    function getH2Hdata(firstTeamUuid: string, secondTeamUuid: string) {
        setLoading(true)
        axios.get<h2h>(`https://dev.chart-sports.com/api/v1/h2h/?uuid_team_1=${firstTeamUuid}&uuid_team_2=${secondTeamUuid}&uuid_event=2694d35e-c157-4497-9957-56f4e93ab7bb&league_season=2023-2024`)
            .then(response => {
                dispatch(setH2hData({ firstTeamH2hParams: response.data.result[0].field, secondTeamH2hParams: response.data.result[1].field }))
                console.log(response)

            })
        setLoading(false)
    }

    


    return (
        <div className={styles.field}>
            <div className={styles.field_desktop}>
                <FieldTimes activeTimeFrame={activeTimeFrame} setActiveTimeFrame={setActiveTimeFrame} />
                <FieldLastGames
                    selectedGamesCount={selectedGamesTimeFrame}
                    setSelectedGamesCount={setSelectedGamesTimeFrame}
                    h2hHandler={h2hHandler}
                // filterMidfieldByTimeFrame={() => null}
                />
                {loading ? <LoaderAlt /> :
                    <FootballField
                        selectedGamesCount={selectedGamesTimeFrame}
                        activeTimeFrame={activeTimeFrame}
                    />
                }
            </div>
            <div className={styles.field_mobile}>
                <FootballFieldMobile />
            </div>
        </div>
    );
};

export default Field;


