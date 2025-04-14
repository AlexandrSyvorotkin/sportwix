import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './Ticker.module.scss'
import {HorizontalTicker} from "react-infinite-ticker";
import {IMG_PATH} from "../../api/variables";
import {ILastMatch} from "../../models/ILastMatch";
import { useAppSelector } from '../../types/hooks';
import { useFetchChampionshipInfoQuery } from '../../services/championships-api/championship-api';

interface TickerProps {
}

const Ticker:FC<TickerProps> = ({}) => {

    const recentMathes = useAppSelector((state => state.tournamentSlice.tournament?.last_matches))

    const {championshipId, season} = useAppSelector(state => state.tournamentSlice)

    const { data, isLoading, error, isFetching } = useFetchChampionshipInfoQuery({ championshipId, season })

    return (
        <div className={styles.ticker_wrapper}>
            <HorizontalTicker duration={45000}>
                <div className={styles.ticker}>
                    {data?.last_matches?.map(result =>
                        <div className={styles.recent_game} key={result.uuid}
                        >
                            <div>
                                <span>{result.home_team.name}</span>
                            </div>
                            <div className={styles.img_wrapper}>
                                <img src={`${IMG_PATH}/${result.home_team.img}`} alt=""/>
                            </div>
                            <div>
                                <span>{result.score.short_score.full_time[0]}</span>
                                <span>:</span>
                                <span>{result.score.short_score.full_time[1]}</span>
                            </div>
                            <div className={styles.img_wrapper}>
                                <img src={`${IMG_PATH}/${result.away_team.img}`} alt=""/>
                            </div>
                            <div>
                                <span>{result.away_team.name}</span>
                            </div>

                        </div>
                    )}
                </div>
            </HorizontalTicker>
        </div>
    );
};

export default Ticker;