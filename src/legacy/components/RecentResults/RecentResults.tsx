import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './RecentResults.module.scss'
import RecentResultItem from "../RecentResultItem/RecentResultItem";
import { useAppSelector } from "../../types/hooks";
import { ILastMatch } from "../../models/ILastMatch";
import { RootState } from '../../redux/store';
import recent_games_caps from '../../localization/recent-games/recent-games.json'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import LoaderAlt from '../Loader2/LoaderAlt';
import { useFetchChampionshipInfoQuery } from '../../services/championships-api/championship-api';

interface RecentResultsProps {
}

type recentGames = {
    finished?: ILastMatch[],
    notstarted?: ILastMatch[],
    inprogress?: ILastMatch[]

}

const RecentResults: FC<RecentResultsProps> = ({ }) => {

    const RecentGames = useAppSelector((state) => state.tournamentSlice.tournament?.last_matches)


    const {isSingleTeamView, isDoubleTeamView} = useAppSelector((state: RootState) => state.tournamentSlice)

    const recentFirstSelectedTeamResults = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.last_matches)

    const {championshipId, season} = useAppSelector(state => state.tournamentSlice)
    const { data, isLoading, error, isFetching } = useFetchChampionshipInfoQuery({ championshipId, season })

    const [recentGames, setRecentGames] = useState<recentGames>({
        finished: data?.last_matches?.filter((game: ILastMatch) => game.status === 'finished'),
        notstarted: data?.last_matches?.filter((game: ILastMatch) => game.status === 'notstarted'),
        inprogress: data?.last_matches?.filter((game: ILastMatch) => game.status === 'inprogress')
    })

    useEffect(() => {
        if (isSingleTeamView || isDoubleTeamView) {
            setRecentGames({
                finished: recentFirstSelectedTeamResults?.filter((game: ILastMatch) => game.status === 'finished').reverse(),
                notstarted: recentFirstSelectedTeamResults?.filter((game: ILastMatch) => game.status === 'notstarted').slice(0, 3).reverse(),
                inprogress: recentFirstSelectedTeamResults?.filter((game: ILastMatch) => game.status === 'inprogress').reverse()
            })
        } else {
            setRecentGames({
                finished: data?.last_matches?.filter((game: ILastMatch) => game.status === 'finished'),
                notstarted: data?.last_matches?.filter((game: ILastMatch) => game.status === 'notstarted'),
                inprogress: data?.last_matches?.filter((game: ILastMatch) => game.status === 'inprogress')
            })
        }
    }, [isSingleTeamView, isDoubleTeamView, recentFirstSelectedTeamResults, RecentGames, data])

    const { language } = useContext(LanguageContext)

    return (
        <div className={styles.recent_results}>
            {isFetching ? <LoaderAlt /> :
                <>
                    {recentGames.notstarted?.length === 0 ?
                        null
                        :
                        <div className={styles.results_wrapper}>
                            <div className={styles.result_header}>{language === 'Eng' ? recent_games_caps.next_games.eng : recent_games_caps.next_games.ru}</div>
                            <div className={styles.results_list}>
                                {recentGames.notstarted?.map((result: ILastMatch, id: number) =>
                                    <RecentResultItem
                                        key={result.uuid}
                                        result={result}
                                        match_id={id}
                                    />
                                )}
                            </div>
                        </div>
                    }
                    {recentGames.inprogress?.length === 0 ? null :
                        <div className={styles.results_wrapper}>
                            <div className={styles.result_header}>{language === 'Eng' ? recent_games_caps.live.eng : recent_games_caps.live.ru}</div>
                            <div className={styles.results_list}>
                                {recentGames.inprogress?.map((result: ILastMatch, id: number) =>
                                    <RecentResultItem
                                        key={result.uuid}
                                        result={result}
                                        match_id={id}
                                    />
                                )}
                            </div>
                        </div>
                    }
                    <div className={styles.results_wrapper}>
                        <div className={styles.result_header}>{language === 'Eng' ? recent_games_caps.completed_games.eng : recent_games_caps.completed_games.ru}</div>
                        <div className={styles.results_list}>
                            {recentGames.finished?.map((result: ILastMatch, id: number) =>
                                <RecentResultItem
                                    key={result.uuid}
                                    result={result}
                                    match_id={id}
                                />
                            )}
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default RecentResults;