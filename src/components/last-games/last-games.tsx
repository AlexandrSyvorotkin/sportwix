
import { LastGameItem } from '@components/last-game-item/last-game-item';
import styles from './last-games.module.scss'
import { useState } from 'react'
import { ILastMatch } from 'src/models/ILastMatch';
import lastGames from '../../mocks/last-games.json'
// import RecentResultItem from "../../legacy/components/RecentResultItem/RecentResultItem";

// interface RecentResultsProps {
// }

// type recentGames = {
//     finished?: ILastMatch[],
//     notstarted?: ILastMatch[],
//     inprogress?: ILastMatch[]
// }

const LastResultsSection = ({}) => {

    // const RecentGames = useAppSelector((state) => state.tournamentSlice.tournament?.last_matches)


    // const {isSingleTeamView, isDoubleTeamView} = useAppSelector((state: RootState) => state.tournamentSlice)

    // const recentFirstSelectedTeamResults = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.last_matches)

    // const {championshipId, season} = useAppSelector(state => state.tournamentSlice)
    // const { data, isLoading, error, isFetching } = useFetchChampionshipInfoQuery({ championshipId, season })

    const [recentGames, setRecentGames] = useState({
        finished: lastGames.filter((game: any) => game.status === 'finished'),
        notstarted: lastGames.filter((game: any) => game.status === 'notstarted'),
        inprogress: lastGames.filter((game: any) => game.status === 'inprogress')
    })

    // useEffect(() => {
    //     if (isSingleTeamView || isDoubleTeamView) {
    //         setRecentGames({
    //             finished: recentFirstSelectedTeamResults?.filter((game: ILastMatch) => game.status === 'finished').reverse(),
    //             notstarted: recentFirstSelectedTeamResults?.filter((game: ILastMatch) => game.status === 'notstarted').slice(0, 3).reverse(),
    //             inprogress: recentFirstSelectedTeamResults?.filter((game: ILastMatch) => game.status === 'inprogress').reverse()
    //         })
    //     } else {
    //         setRecentGames({
    //             finished: data?.last_matches?.filter((game: ILastMatch) => game.status === 'finished'),
    //             notstarted: data?.last_matches?.filter((game: ILastMatch) => game.status === 'notstarted'),
    //             inprogress: data?.last_matches?.filter((game: ILastMatch) => game.status === 'inprogress')
    //         })
    //     }
    // }, [isSingleTeamView, isDoubleTeamView, recentFirstSelectedTeamResults, RecentGames, data])

    // const { language } = useContext(LanguageContext)

    // const language = 'Ru'

    return (
        <div className={styles.recent_results}>
                <>
                    {recentGames.notstarted?.length === 0 ?
                        null
                        :
                        <div className={styles.results_wrapper}>
                            <div className={styles.result_header}>Следующие игры</div>
                            <div className={styles.results_list}>
                                {recentGames.notstarted?.map((result: any, id: number) =>
                                    <LastGameItem
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
                            <div className={styles.result_header}>Текущие игры</div>
                            <div className={styles.results_list}>
                                {recentGames.inprogress?.map((result: any, id: number) =>
                                    <LastGameItem
                                        key={result.uuid}
                                        result={result}
                                        match_id={id}
                                    />
                                )}
                            </div>
                        </div>
                    }
                    <div className={styles.results_wrapper}>
                        <div className={styles.result_header}>Последние игры</div>
                        <div className={styles.results_list}>
                            {recentGames.finished?.map((result: any, id: number) =>
                                <LastGameItem
                                    key={result.uuid}
                                    result={result}
                                    match_id={id}
                                />
                            )}
                        </div>
                    </div>
                </>
        </div>
    );
};

export {LastResultsSection};