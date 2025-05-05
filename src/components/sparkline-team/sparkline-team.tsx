import styles from './sparkline-team.module.scss'
// import SparklineArrowPoints from '../../legacy/components/SparklineArrowPoints/SparklineArrowPoints';


interface TeamSparkLineProps {
    team: any
}

const TeamSparkLine = ({ team }: TeamSparkLineProps) => {

    // const finishedLastGames = team.last_matches?.filter(game => game.status === 'finished').slice(-3)
    // const lastGame = team.last_matches?.filter(game => game.status === 'finished').slice(-1)
    // const futureGame = team.last_matches?.filter(game => game.status === 'notstarted').slice(0, 1)
    // const { BASE_PATH, API, V1, EVENT, TEAM } = API_VARIABLES

    // console.log(lastGame)

    // const [visiblePrevGames, setVisiblePrevGames] = useState<ILastMatch[]>(finishedLastGames)
    // const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    // const [displayAdditionalInfo, setDisplayAdditionalInfo] = useState<string>('none')
    // const [previousGames, setPreviousGames] = useState<ILastMatch[] | []>([])
    // const deviceWidth = window.innerWidth

    // const { theme } = useContext(ThemeContext)
    // const { language } = useContext(LanguageContext)
    const theme = 'dark'
    const language = 'Eng'

    // const handleResize = () => {
    //     setWindowWidth(window.innerWidth);
    // };

    // useEffect(() => {
    //     if (futureGame.length === 0) {
    //         setIsFutureGame(false)
    //     } else setIsFutureGame(true)
    // }, [])

    // const eplHistory = team.tabs?.achievements.filter(it => it.league_name === 'Premier League')

    // const [isResultsVisible, setIsResultsVisible] = useState<boolean>(false)
    // const [isCoachInfoVisible, setIsCoachInfoVisible] = useState<boolean>(false)

    // const [isVisibleSparklineInfo, setIsVisibleSparklineInfo] = useState<boolean>(false)


    // const candleCanvasRef = useRef<HTMLCanvasElement>(null)

    // function showCandlesMini(candles: any) {

    //     setIsVisibleSparklineInfo(true)
    //     const rect = candleCanvasRef.current?.getBoundingClientRect()

    //     if (rect) {
    //         const { top, left, width: offset } = rect;

    //         const e = new CustomEvent('show-candles-mini', {
    //             detail: {
    //                 candles,
    //                 msg: "show",
    //                 top,
    //                 left,
    //                 offset
    //             }
    //         });
    //         document.dispatchEvent(e);
    //     }
    // }

    // function hideCandlesMini() {
    //     setIsVisibleSparklineInfo(false)
    //     const e = new CustomEvent('hide-candles-mini', {
    //         detail: {
    //             msg: "hide"
    //         }
    //     });
    //     document.dispatchEvent(e);
    // }



    // function handleClick(e: any) {
    //     if (deviceWidth < WidthConstants.MOBILE_WIDTH) {
    //         const container = e.target.closest("#container");
    //         const collapsible = container?.querySelector("#collapsible");
    //         const hidden =
    //             collapsible.style.visibility === "hidden" ||
    //             collapsible.style.visibility === "";

    //         if (hidden) {
    //             collapsible.style.maxHeight = `${collapsible.scrollHeight}px`;
    //             collapsible.style.visibility = "visible";
    //             collapsible.setAttribute("aria-expanded", "true");
    //         } else {
    //             collapsible.style.maxHeight = "0";
    //             collapsible.style.visibility = "hidden";
    //             collapsible.setAttribute("aria-expanded", "false");
    //         }
    //     }
    // }
    // const dispatch = useAppDispatch()

    // const loadingCandles = useAppSelector((state: RootState) => state.candleSliceNew.loading)

    // function fetchSingleTeamInfoData(id: string, team: ITeam) {

    //     dispatch(setLoadingTrue())

    //     if (!loadingCandles) {
    //         dispatch(switchToSingleCandleChart())
    //         dispatch(chooseFirstTeam(team))
    //         dispatch(setFirstSelectedTeamUuid(id))

    //         axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${team.team_uuid}/${EVENT}/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=false`).then((response => {
    //             // dispatch(filterByTimesRedux('Полный матч'))  
    //             dispatch(addCandlesNew({ type: 'firstSelectedTeam', candles: response.data.candles }))
    //             dispatch(addSeasons({ type: 'firstSelectedTeam', saeasons: response.data.seasons }))
    //             // console.log(response)

    //         })).finally(() => {
    //             dispatch(setLoadingFalse())
    //         })
    //     }

    // }


    let pointsDifference
    let pointsDifferenceColor

    // switch (lastGame[0].match_result) {
    //     case 'win':
    //         pointsDifference = '+3';
    //         pointsDifferenceColor = '#51B136';
    //         break;
    //     case 'draw':
    //         pointsDifference = '+1';
    //         pointsDifferenceColor = '#B7A503';
    //         break;
    //     case 'loss':
    //         pointsDifference = '0';
    //         pointsDifferenceColor = '#C00000';
    //         break;
    //     default:
    //         break;
    // }

    const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'
    return (
        <div className={styles.team_sparkline_container} id='container' >
            <div className={styles.team_spark_line_wrapper} onClick={() => null} style={{borderBottom:border}}>
                <div className={`${styles.team_number} ${styles[theme]}`}>
                    {team.id + 1}
                </div>
                <div className={styles.team_logo_wrapper}>
                    <div className={styles.team_logo} id='team'>
                        <img src={`${team?.team_img}`} alt="" />
                    </div>
                </div>
                <div className={styles.td_coach_wrapper}>
                    <div className={styles.coach_wrapper} id='coach'>
                        <div className={styles.team_coach} >
                            <img src={team.team_coach?.img} alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.team_info} id='team-sparkline-name'>
                    <div className={`${styles?.team_name} ${styles[theme]}`}>{language === 'Eng' ? team?.team_short_name : team?.team_short_name_ru}</div>
                    <div className={styles.team_info_dop}>
                        <div className={`${styles.points} ${styles[theme]}`}>{team.score}(P)</div>
                        {/* {lastGame[0].match_result === 'win' || lastGame[0].match_result === 'draw' ? <SparklineArrowPoints isPositive={true}/> : <SparklineArrowPoints isPositive={false}/>} */}
                        <div style={{color: pointsDifferenceColor}}>{pointsDifference}</div>
                    </div>
                </div>
                {/* <SparkLineSeasonResultBar
                    wins={team.wins}
                    losses={team.losses}
                    draws={team.draws}
                    setIsAlternativeResultsVisible={setIsResultsVisible}
                    width={100}
                    isDopInfo={true}
                /> */}
                {/* <div id='line-chart' className={styles.line_chart_wrapper}>
                    <LineChart candles={team.candles} candleCanvasRef={candleCanvasRef} />
                    <LineChartLastCandlePos lastCandles={team.candles.slice(-2)}/>
                </div>
                {section_width === 100
                    ?
                    <div className={styles.cups_list}>
                        <SparkLineSingleCup borderColor='#B3891F' backgroudColor='#EBBB41'>{eplHistory[0]?.gold_of_league === 0 ? null : eplHistory[0]?.gold_of_league}</SparkLineSingleCup>
                        <SparkLineSingleCup borderColor='#867D7D' backgroudColor='#A8A8A8'>{eplHistory[0]?.silver_of_league === 0 ? null : eplHistory[0]?.silver_of_league}</SparkLineSingleCup>
                        <SparkLineSingleCup borderColor='#5C3E1F' backgroudColor='#92683C'>{eplHistory[0]?.bronse_of_league === 0 ? null : eplHistory[0]?.bronse_of_league}</SparkLineSingleCup>
                    </div>
                    :
                    null} */}
                <div className={styles.last_games} id='last-games'>
                <div className={styles.border} style={{height: '40px', border: border}}/>
                    {/* {finishedLastGames.map(game =>
                        !game?.is_home ?
                            <PreviousSparkLineGame
                                key={game.uuid}
                                rival_team_logo={game.home_team.img}
                                game_type={game.is_home}
                                team_goals={game.is_home ? game.score.short_score.full_time[0] : game.score.short_score.full_time[1]}
                                rival_team_goals={game.is_home ? game.score.short_score.full_time[1] : game.score.short_score.full_time[0]}
                                match_result={game.match_result}
                            />
                            :
                            <PreviousSparkLineGame
                                key={game.uuid}
                                rival_team_logo={game.away_team.img}
                                game_type={game.is_home}
                                team_goals={game.is_home ? game.score.short_score.full_time[0] : game.score.short_score.full_time[1]}
                                rival_team_goals={game.is_home ? game.score.short_score.full_time[1] : game.score.short_score.full_time[0]}
                                match_result={game.match_result}
                            />
                    )} */}
                <div className={styles.border} style={{height: '40px', border: border}}/>
                </div>
                {/* {futureGame.length === 0 ?
                null 
                :
                <div className={styles.next_game} id='next-game'>
                    <NextGameSparkLine
                        team_logo={futureGame[0]?.is_home ? futureGame[0]?.away_team.img : futureGame[0]?.home_team.img}
                        match_type={futureGame[0]?.is_home}
                        possible_winning_percentage={futureGame[0]?.odds.team_target_odds_procents}
                    />
                </div>
                } */}
                {/* <div className={styles.next_game} id='next-game'>
                    <NextGameSparkLine
                        team_logo={futureGame[0]?.is_home ? futureGame[0]?.away_team.img : futureGame[0]?.home_team.img}
                        match_type={futureGame[0]?.is_home}
                        possible_winning_percentage={futureGame[0]?.odds.team_target_odds_procents}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default TeamSparkLine;