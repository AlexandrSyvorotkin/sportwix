
import { FC, useEffect } from "react";

// import { useXSMAX, useSMMIN } from "../../legacy/media-queries";
import { switchMobileOrientation } from "../../store/InterfaceSlice/InterfaceSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Banner from "../../components/banner/banner";
import SparkLineSection from "../../components/sparkline-table/sparkline-table";
import ChampionshipTable from "../../components/championship-table/championship-table";

import { TeamDetailInfoSection } from "@components/team-info-detail-section";
import { CommonInfoSection } from "@components/common-info-section";
import { Separator } from "@shared/separator";

import { TeamTabPanel, ChartFunctionsPanel, ChartFiltersPanel, ChampionshipTablePanel } from "@components/control-panels";
import { CommonPanel } from "@components/control-panels/common-panel";
import { RootState } from "../../store/store";
import { CandleChart } from "@components/candle-chart-component";


const Chart: FC = () => {

    const dispatch = useAppDispatch()


    // const { season , championshipId } = useAppSelector(state => state.tournamentSlice)
    // const { data, isLoading, error } = useFetchChampionshipInfoQuery({ championshipId, season })

    // const xsMax = useXSMAX()
    // const smMin = useSMMIN()

    // const { BASE_PATH, API, V1, EVENT, TEAM } = API_VARIABLES
    // const [sparkLineActive, setSparklineActive] = useState<boolean>(true)

    // const [bordersResizableActive, setBorderResizableActive] = useState<boolean>(true)
    // const [sectionDisplay, setSectionDisplay] = useState<string>('flex')
    // const borderResizableStatus = bordersResizableActive
    // const expandSectionsStatus = expandSections
    // const [disableControlPanelItem, setDisableControlPanelItem] = useState<boolean>(true)
    // const [chartSelect, setChartSelect] = useState<boolean>(false)
    // const [isSparklineForMobile, setIsSparklineForMobile] = useState<boolean>(false)
    // const isSingleTeamView = useAppSelector(state => state.tournamentSlice.isSingleTeamView)
    // const [drawRulerActive, setDrawRulerActive] = useState<boolean>(false)

    // const firstSelectedTeam = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam)

    // const [filterBySeasons, setFilterBySeasons] = useState<boolean>(false)
    // const [filterByGoals, setFilterByGoals] = useState<boolean>(false)
    // const [filterByTimes, setFilterByTimes] = useState<boolean>(false)
    // const [filterByHomeAwayGames, setFilterByHomeAwayGames] = useState<boolean>(false)
    // const activeTeamDetailInfoTabMobile = useAppSelector((state: RootState) => state.teamTabs.activeMobileTabs.activeTeamDetailInfoTab)
    // const tabActive = (id: number) => id === activeTeamDetailInfoTabMobile ? 'block' : 'none'
    // const firstSelectedTeamCandles = useAppSelector((state: RootState) => state.candleSliceNew.firstSelectedTeam.candles)
    // const firstSelectedTeamSeasons = useAppSelector((state: RootState) => state.candleSliceNew.firstSelectedTeam.seasons)
    // const loading = useAppSelector(state => state.candleSliceNew.loading)
    // const isTeamStatsControlsVisible = useAppSelector(state => state.TeamStatsControls.isVisible)
    // const windowWidth = window.innerWidth
    // const isDoubleTeamView = useAppSelector(state => state.tournamentSlice.isDoubleTeamView)
    // const [isTeamSectionMobileExpanded, setIsTeamSectionMobileExpanded] = useState<boolean>(false)
    // const [chartMobileWidth, setChartMobileWidth] = useState(100)
    // const expandMobileType = isSingleTeamView ? 'candleChart' : 'sparkline'
    // const filterCandleChartByTypeOfGames = useAppSelector((state: RootState) => state.candleSliceNew.filters.byHomeAwayGames)
    // const filterCandleChartByAmoutOfGoals = (useAppSelector((state: RootState) => state.candleSliceNew.filters.byAmountOfGoals))
    // const filterCandleChartByTypeOfTime = useAppSelector((state: RootState) => state.candleSliceNew.filters.byTypeOfTime)
    // const [isTipsModal, setIsTipsModal] = useState<boolean>(false)
    // const [isShowGuideline, setIsShowGuideline] = useState(false);

    // useEffect(() => {
    //     if (windowWidth < 758) {
    //         dispatch(switchVersion('mobile'))
    //     } else if (windowWidth > 758) {
    //         dispatch(switchVersion('desktop'))
    //     }
    // }, [windowWidth])


    // useEffect(() => {
    //     if (expandSections) {
    //         setLeftPaneWidthPercentage(100)
    //         setChartPanelHeightPercentage(100)
    //     } else {
    //         setLeftPaneWidthPercentage(65)
    //         setChartPanelHeightPercentage(50)
    //     }
    // }, [expandSections])

    // const heightSection = interfaceState.mobile.orientation.landscape ? 93 : 100

    // const [sparklineMobileHeight, setSparklineMobile] = useState<number>(50)
    // const [newsAndLastGamesHeight, setNewsAndLastGamesHeight] = useState<number>(50)
    // const [chartMobileHeight, setChartMobileHeight] = useState<number>(50)
    // const [tabsMobileHeight, setTabsMobileHeight] = useState<number>(50)

    // useEffect(() => {
    //     // 1 экран
    //     // если открыт спакрлайн
    //     if (interfaceState.mobile.expandSections.sparklineSection || interfaceState.mobile.expandSections.chartSection) {
    //         setChartMobileHeight(93)
    //         setNewsAndLastGamesHeight(0)
    //         // если открыты новости
    //     } if (interfaceState.mobile.expandSections.newsAndLastGamesSection && !interfaceState.mobile.expandSections.sparklineSection) {
    //         setChartMobileHeight(0)
    //         setNewsAndLastGamesHeight(93)
    //         // если ничего не открыто
    //     } if (!interfaceState.mobile.expandSections.sparklineSection && !interfaceState.mobile.expandSections.newsAndLastGamesSection) {
    //         setSparklineMobile(50)
    //         setNewsAndLastGamesHeight(50)
    //     }
    //     // если ничего не открыто и мобилка перевернута
    //     if (!interfaceState.mobile.expandSections.sparklineSection && !interfaceState.mobile.expandSections.newsAndLastGamesSection && interfaceState.mobile.orientation.landscape) {
    //         setSparklineMobile(100)
    //         setNewsAndLastGamesHeight(0)
    //     }
    //     // 1 экран

    //     // 2 экран
    //     // если открыты табы
    //     if (interfaceState.mobile.expandSections.tabsInfoSection) {
    //         setChartMobileHeight(0)
    //         setNewsAndLastGamesHeight(100)
    //     }
    //     // // если открыт чарт
    //     if (interfaceState.mobile.expandSections.chartSection) {
    //         setChartMobileHeight(93)
    //         setTabsMobileHeight(0)
    //     }
    //     // // если ничего не открыто
    //     if (!interfaceState.mobile.expandSections.sparklineSection && !interfaceState.mobile.expandSections.newsAndLastGamesSection && !interfaceState.mobile.expandSections.tabsInfoSection && !interfaceState.mobile.expandSections.chartSection) {
    //         setChartMobileHeight(50)
    //         setNewsAndLastGamesHeight(50)
    //     }
    //     // // если ничего не открыто и мобилка перевернута на спраклайне
    //     if (!interfaceState.mobile.expandSections.chartSection && !interfaceState.mobile.expandSections.tabsInfoSection && !interfaceState.mobile.expandSections.newsAndLastGamesSection && interfaceState.mobile.orientation.landscape) {
    //         setChartMobileHeight(100)
    //         //++
    //     }
    //     // если ничего не открыто и мобилка перевернута на грачике
    //     if (!interfaceState.mobile.expandSections.chartSection && !interfaceState.mobile.expandSections.tabsInfoSection && !interfaceState.mobile.expandSections.newsAndLastGamesSection && interfaceState.mobile.orientation.landscape) {
    //         setChartMobileHeight(93)
    //         setNewsAndLastGamesHeight(0)
    //         //++
    //     }
    // }, [interfaceState])

    useEffect(() => {
        const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobileDevice) {
            const mq = window.matchMedia("(orientation: landscape)");

            const handleOrientationChange = (event: any) => {
                if (event.matches) {
                    dispatch(switchMobileOrientation('landscape'))
                } else {
                    dispatch(switchMobileOrientation('portrait'))
                }
            };

            handleOrientationChange(mq);
            mq.addListener(handleOrientationChange);

            return () => {
                mq.removeListener(handleOrientationChange);
            };
        }
    }, []);


    // useEffect(() => {
    //     if (data) {
    //         dispatch(chooseSecondTeam(data?.teams[0]))
    //     }
    // },[data])


    // function expandChartSectionHandler(type: expandTypes) {
    //     dispatch(expandSection(type))
    //     setExpandSections(!expandSections)
    //     setBorderResizableActive(!bordersResizableActive)
    // }

    // function expandTeamSectionMobile(type: expandTypes) {
    //     dispatch(expandSection(type))
    //     // setIsTeamSectionMobileExpanded(!isTeamSectionMobileExpanded)
    // }

    // function changeSparklineToChart(type: string) {
    //     if (type === "switchToSparkline") {
    //         setExpandSections(!expandSections)
    //         setSparklineActive(!sparkLineActive)
    //         setDisableControlPanelItem(!disableControlPanelItem)
    //         dispatch(switchPageToStartPostition())
    //     } else {
    //         setSparklineActive(true)
    //         dispatch(switchPageToStartPostition())
    //         dispatch(setFirstSelectedTeamUuid(''))
    //         // dispatch(switchToSingleCandleChart())
    //     }
    // }

    // const candleFilters = useAppSelector(state => state.candleSliceNew.filters)

    // const filterBySeasonsHandler = (seasonsAmout: number, currentSeasonType: any) => {
    //     dispatch(setCurrentSeasonsAmount(seasonsAmout))
    //     dispatch(filterChartBySeasons(currentSeasonType))
    // }

    // console.log(interfaceState.mobile.expandSections)
    // const metricsByGames = [
    //     { id: 1, param: candle_chart_select_variants.filter_by_games.all_games, filterFunc: () => filterByHomeAwayGamesHandler('All games', 1) },
    //     { id: 2, param: candle_chart_select_variants.filter_by_games.home_games, filterFunc: () => filterByHomeAwayGamesHandler('Home games', 2) },
    //     { id: 3, param: candle_chart_select_variants.filter_by_games.away_games, filterFunc: () => filterByHomeAwayGamesHandler('Away games', 3) },
    // ]
    // const metricsFilterByTime = [
    //     { id: 1, param: candle_chart_select_variants.filter_by_times.full_time, filterFunc: () => newFilterByTimeHandler('FT', 1) },
    //     { id: 2, param: candle_chart_select_variants.filter_by_times["1t+2T"], filterFunc: () => newFilterByTimeHandler('1T + 2T', 2) },
    //     { id: 3, param: candle_chart_select_variants.filter_by_times["1T"], filterFunc: () => newFilterByTimeHandler('1T', 3) },
    //     { id: 4, param: candle_chart_select_variants.filter_by_times["2T"], filterFunc: () => newFilterByTimeHandler('2T', 4) },
    // ]
    // const seasonFilterParams = [
    //     { id: 1, param: candle_chart_select_variants.filter_by_season.all_seasons, filterFunc: () => filterBySeasonsHandler(11, 'All seasons') },
    //     { id: 2, param: candle_chart_select_variants.filter_by_season["3_last_seasons"], filterFunc: () => filterBySeasonsHandler(3, '3 last seasons') },
    //     { id: 3, param: candle_chart_select_variants.filter_by_season["5_last_seasons"], filterFunc: () => filterBySeasonsHandler(5, '5 last seasons') },
    // ]
    // const goalsFilterParams = [
    //     { id: 1, param: candle_chart_select_variants.filter_by_goals.all_goals, filterFunc: () => filterByGoalsHandler('All goals', 1) },
    //     { id: 2, param: candle_chart_select_variants.filter_by_goals["total>2.5"], filterFunc: () => filterByGoalsHandler('Total > 2.5', 2) },
    //     { id: 3, param: candle_chart_select_variants.filter_by_goals["total<2.5"], filterFunc: () => filterByGoalsHandler('Total < 2.5', 3) },
    // ]



    // const guidelineRoadmapActivate = () => {
    //     setIsShowGuideline(true)
    //     dispatch(activateGuidelineMode())
    //     dispatch(disableEducationOffer())
    // }




    // const bottomMobileComponents = [
    //     // { id: 1, component: <NewsShort /> },
    //     // { id: 2, component: <RecentResults /> },
    //     { id: 1, component: <div>Новости</div> },
    //     { id: 2, component: <div>Результаты</div> },

    // ]

    // const filterByHomeAwayGamesHandler = (type: filterByHomeAwayGamesVariants, id: number) => {
    //     setFilterByHomeAwayGames(false)
    //     dispatch(filterChartByHomeOrAwayGames(type))
    // }

    // const filterByGoalsHandler = (type: filterByAmountOfGoalsVarians, id: number) => {
    //     setFilterByGoals(false)
    //     dispatch(filterChartByAmountOfGoals(type))
    // }


    // async function newFilterByTimeHandler(type: filterByTypeOfTimeVariants, id: number) {

    //     const apiConfig = {
    //         'FT': { offset: 3, splited: false },
    //         '1T + 2T': { offset: 3, splited: true },
    //         '1T': { offset: 3, splited: true },
    //         '2T': { offset: 3, splited: true }
    //     };

    //     const { offset, splited } = apiConfig[type];

    //     dispatch(setCurrentSeasonsAmount(offset))
    //     dispatch(setSpliteType(splited))
    //     dispatch(filterChartByTypeOfTime(type));

    // }

    // const theme = 'dark'
    // const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    // const tournamentType = useAppSelector((state => state.tournamentSlice.isNationalTournament))

    const expandSection = useAppSelector((state: RootState) => state.interfaceState.expanded_section)
    const isSingleTeamView = useAppSelector((state: RootState) => state.tournamentSlice.isSingleTeamView)
    const firstSelectedTeam = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam)


    const desktop = (
        <div className="w-full h-[calc(100vh-50px)] flex">
            <div className="w-[53px] flex h-full">
                <div className="flex h-full">
                    <ChartFunctionsPanel />
                    <Separator className="w-[1px] h-full" />
                </div>
            </div>
            <div className={`${expandSection === 'sparkline' ? 'w-full' : 'w-2/3'}`}>
                <div className='h-full flex flex-col'>
                    <div className={`flex w-full ${expandSection === 'sparkline' ? 'h-[calc(100vh-100px)]' : 'h-1/2'} `} id='candle-chart'>
                        {isSingleTeamView ?
                            <CandleChart
                                rulerActive={false}
                                modifiedCandles={[]}
                                team_img={firstSelectedTeam?.team_img}
                                team_name={firstSelectedTeam?.team_name}
                                two_candles={false}
                                filterByHomeAwayGames={''}
                                filterByAmoutOfGoals={''}
                                filterCandleChartByTypeOfTime={''}
                                seasons={[]}
                                chartId="single_chart"
                                width={100}
                                height={100}
                            /> : <div className="w-[calc(100%-53px)] flex">
                                <SparkLineSection />
                            </div>
                        }
                        <div className="w-[55px] flex h-full" id='candle-chart-panel-section'>
                            <Separator className="w-[10px] h-full" />
                            <ChartFiltersPanel />
                        </div>
                    </div>
                    <div className='flex h-1/2 flex-col overflow-y-hidden'>
                        <Banner />
                        <div className={`${expandSection === 'sparkline' ? 'hidden' : 'flex'} overflow-y-hidden h-full`}>
                            <div className="flex h-full w-full">
                                <div className="w-full h-full">
                                    <TeamDetailInfoSection />
                                </div>
                                <div className="flex h-full">
                                    <Separator className="w-[1px] h-full" />
                                    <TeamTabPanel />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Separator className="w-[1px] h-full" />
            <div className={`w-1/3 flex-col ${expandSection === 'sparkline' ? 'hidden' : 'flex'}`}>
                <div className="w-full flex flex-col h-1/2">
                    <div className="h-full flex flex w-full">
                        <div className="w-full">
                            <ChampionshipTable />
                        </div>
                        <Separator className="w-[1px] h-full" />
                        <ChampionshipTablePanel />
                    </div>
                </div>
                <Separator className="w-full h-[1px]" />
                <div className="h-[49%] flex w-full justify-end">
                    <div className="w-full h-full">
                        <CommonInfoSection />
                    </div>
                    <Separator className="w-[1px] h-full" />
                    <CommonPanel />
                </div>
            </div>
        </div>
    )

    // const mobile = (
    //     <div className={styles.mobile}>
    //         <div style={{ height: `${chartMobileHeight}%`, display: interfaceState.mobile.expandSections.tabsInfoSection ? 'none' : 'flex' }} id='candle-chart-and-sparkline-container'>
    //             {loading ? <div className={styles.loader_wrapper}><LoaderAlt /></div> :
    //                 <>
    //                     {isSingleTeamView || isDoubleTeamView
    //                         ?
    //                         <>
    //                             <div className={styles.panel_section_mobile} style={{ height: "100%" }}>
    //                                 {chartControls.map(btn =>
    //                                     <ControlPanelBtn
    //                                         key={btn.id}
    //                                         imgLight={btn.imgLight}
    //                                         img={btn.img}
    //                                         onClick={btn.onClick}
    //                                         active={btn.active}
    //                                         imgActive={btn.imgActive}
    //                                         visible={btn.visible}
    //                                         disabled={btn.disabled}
    //                                         imgDisabled={btn.imgDisabled}
    //                                         tooltipDescription={btn.tooltipDescription}
    //                                         position={btn.position}
    //                                         btnId={btn.btnId}
    //                                     />
    //                                 )}
    //                             </div>
    //                             <>
    //                                 {isDoubleTeamView ?
    //                                     <MobileTwoCandlesChartsWrapper
    //                                         drawRulerActive={drawRulerActive}
    //                                         width={100}
    //                                         height={chartMobileHeight}
    //                                     />
    //                                     :
    //                                     <>
    //                                         {windowWidth > 768 ? null :
    //                                             <CandleChartMobile
    //                                                 rulerActive={drawRulerActive}
    //                                                 width={100}
    //                                                 height={chartMobileHeight}
    //                                                 modifiedCandles={firstSelectedTeamCandles}
    //                                                 filterByHomeAwayGames={filterCandleChartByTypeOfGames}
    //                                                 filterByAmoutOfGoals={filterCandleChartByAmoutOfGoals}
    //                                                 filterCandleChartByTypeOfTime={filterCandleChartByTypeOfTime}
    //                                                 team_img={firstSelectedTeam?.team_img}
    //                                                 team_name={firstSelectedTeam?.team_name}
    //                                                 two_candles={false}
    //                                                 filter={''}
    //                                                 seasons={firstSelectedTeamSeasons}
    //                                                 chartId="single_chart"
    //                                                 twoCandlesStatus={false}
    //                                             />
    //                                         }
    //                                     </>
    //                                 }
    //                             </>
    //                         </>
    //                         :
    //                         <div className={styles.sparkline_mobile}>
    //                             <div className={styles.panel_section_mobile}>
    //                                 {chartControls.map(btn =>
    //                                     <ControlPanelBtn
    //                                         key={btn.id}
    //                                         imgLight={btn.imgLight}
    //                                         img={btn.img}
    //                                         onClick={btn.onClick}
    //                                         active={btn.active}
    //                                         imgActive={btn.imgActive}
    //                                         visible={btn.visible}
    //                                         disabled={btn.disabled}
    //                                         imgDisabled={btn.imgDisabled}
    //                                         tooltipDescription={btn.tooltipDescription}
    //                                         position={btn.position}
    //                                         btnId={btn.btnId}
    //                                     />
    //                                 )}
    //                             </div>
    //                             <section className={styles.sparkline_section_mobile} id='mobile_sparkline'>
    //                                 <TeamSparklineMobile />
    //                             </section>
    //                         </div>
    //                     }
    //                 </>
    //             }
    //         </div>
    //         <div className={styles.border_banner}>
    //             <ResizableBorder
    //                 display={'block'}
    //                 cursor='row-resize'
    //                 resize={() => null}
    //             />
    //             <Banner />
    //         </div>
    //         <div className={styles.mobile_bottom_section} style={{ height: `${newsAndLastGamesHeight}%`, display: interfaceState.mobile.expandSections.sparklineSection ? 'none' : 'flex', position: 'relative' }} id='mobile_bottom_section'>
    //             {isSingleTeamView || isDoubleTeamView ?
    //                 <TeamDetailInfoSection expandTeamSectionMobile={expandTeamSectionMobile} isTeamSectionMobileExpanded={isTeamSectionMobileExpanded} />
    //                 :
    //                 <>
    //                     <div className={styles.mobile_controls}>
    //                         {mobile_controls.map(({ id, img, onClick, imgActive, active, disabled, visible, imgLight, position, tooltipDescription }) =>
    //                             <ControlPanelBtn
    //                                 key={id}
    //                                 img={img}
    //                                 onClick={onClick}
    //                                 imgActive={imgActive}
    //                                 active={active}
    //                                 disabled={disabled}
    //                                 visible={visible}
    //                                 imgLight={imgLight}
    //                                 position={position}
    //                                 tooltipDescription={tooltipDescription}
    //                             />
    //                         )}
    //                     </div>
    //                     {bottomMobileComponents.map(({ id, component }) =>
    //                         <div key={id} style={{ display: `${tabActive(id)}`, width: 'calc(100% - 51px' }}>
    //                             {component}
    //                         </div>
    //                     )}
    //                 </>
    //             }
    //             <EducationOffer />
    //         </div>
    //     </div>
    // )

    return (
        <>
            {/* DESKTOP > 768px */}


            {/* DESKTOP > 768px */}

            {/* {smMin ? desktop : mobile} */}
            {desktop}

            {/* MOBILE < 768px */}

            {/* {xsMax ? mobile : null} */}

            {/* {isTipsModal ? <TipsModal onClose={() => setIsTipsModal(false)} /> : null}
            {isShowGuideline ? <GuidleRoadmap setIsShowGuideline={setIsShowGuideline} isShowGuideline={isShowGuideline} /> : null} */}

            {/* MOBILE < 768px */}
        </>
    );
};

export default Chart;




