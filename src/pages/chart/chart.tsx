
import { FC, useState, useEffect, useMemo } from "react";

// import { useXSMAX, useSMMIN } from "../../legacy/media-queries";
import { switchVersion, switchMobileOrientation } from "../../store/InterfaceSlice/InterfaceSlice";
import styles from './chart.module.scss'
import { useAppDispatch } from "../../hooks/hooks";

//left btns
import DiagonalLevels from '../../assets/icons/diagonal-levels.svg?react'
import PublishPost from '../../assets/icons/publish-post.svg?react'
import LabelSelection from '../../assets/icons/label-selection.svg?react'
import Nuler from '../../assets/icons/nuler.svg?react'
import PutYourLables from '../../assets/icons/put-your-labels.svg?react'

//right btns
import Expand from '../../assets/icons/expand.svg?react'
import FilterByCups from '../../assets/icons/filter-by-cups.svg?react'
import ChartSettings from '../../assets/icons/chart-settings.svg?react'
import FilterByTimes from '../../assets/icons/filter-by-times.svg?react'
import FilterByGoals from '../../assets/icons/filter-by-goals.svg?react'
import FilterBySeasons from '../../assets/icons/filter-by-seasons.svg?react'
import FilterByHomeAwayGames from '../../assets/icons/filter-by-home-away-games.svg?react'


import PanelBtn from "../../ui/panel-btn/panel-btn";
import Banner from "../../components/banner/banner";
import SparkLineSection from "../../components/sparkline-table/sparkline-table";
import ChampionshipTable from "../../components/championship-table/championship-table";

import { TeamDetailInfoSection } from "@components/team-info-detail-section";

const Chart: FC = () => {

    const dispatch = useAppDispatch()


    // const { season , championshipId } = useAppSelector(state => state.tournamentSlice)
    // const { data, isLoading, error } = useFetchChampionshipInfoQuery({ championshipId, season })

    // const xsMax = useXSMAX()
    // const smMin = useSMMIN()

    // const { BASE_PATH, API, V1, EVENT, TEAM } = API_VARIABLES
    const [leftPaneWidthPercentage, setLeftPaneWidthPercentage] = useState(65);
    // const [championshipTableHeightPercentage, setChampionshipTableHeightPercentage] = useState(50);
    const [chartPanelHeightPercentage, setChartPanelHeightPercentage] = useState(50)
    // const [sparkLineActive, setSparklineActive] = useState<boolean>(true)
    const [expandSections] = useState<boolean>(false)
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
    const windowWidth = window.innerWidth
    // const isDoubleTeamView = useAppSelector(state => state.tournamentSlice.isDoubleTeamView)
    // const [isTeamSectionMobileExpanded, setIsTeamSectionMobileExpanded] = useState<boolean>(false)
    // const [chartMobileWidth, setChartMobileWidth] = useState(100)
    // const expandMobileType = isSingleTeamView ? 'candleChart' : 'sparkline'
    // const filterCandleChartByTypeOfGames = useAppSelector((state: RootState) => state.candleSliceNew.filters.byHomeAwayGames)
    // const filterCandleChartByAmoutOfGoals = (useAppSelector((state: RootState) => state.candleSliceNew.filters.byAmountOfGoals))
    // const filterCandleChartByTypeOfTime = useAppSelector((state: RootState) => state.candleSliceNew.filters.byTypeOfTime)
    // const [isTipsModal, setIsTipsModal] = useState<boolean>(false)
    // const [isShowGuideline, setIsShowGuideline] = useState(false);

    useEffect(() => {
        if (windowWidth < 758) {
            dispatch(switchVersion('mobile'))
        } else if (windowWidth > 758) {
            dispatch(switchVersion('desktop'))
        }
    }, [windowWidth])


    useEffect(() => {
        if (expandSections) {
            setLeftPaneWidthPercentage(100)
            setChartPanelHeightPercentage(100)
        } else {
            setLeftPaneWidthPercentage(65)
            setChartPanelHeightPercentage(50)
        }
    }, [expandSections])

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



    // const chartControls = [
    //     //expand
    //     {
    //         id: 1,
    //         onClick: () => expandChartSectionHandler(expandMobileType),
    //         img: expand,
    //         imgActive: expand_active,
    //         active: expandSections,
    //         visible: interfaceState.mobile.orientation.portrait || interfaceState.desktop.isDesktop,
    //         imgLight: expand_light,
    //         position: 'left',
    //         tooltipDescription: control_btns_tooltips.expand,
    //         btnId: 'expand-btn'
    //     },
    //     // xPTS active
    //     {
    //         id: 2,
    //         onClick: () => setChartSelect(true),
    //         img: '',
    //         imgActive: '',
    //         active: false,
    //         visible: !sparkLineActive && !isSingleTeamView,
    //         imgLight: expand_light,
    //     },
    //     // chart parameters
    //     {
    //         id: 3,
    //         onClick: () => null,
    //         img: chart_parameters,
    //         imgActive: chart_parameters_active,
    //         active: false,
    //         visible: !isSingleTeamView && !isDoubleTeamView,
    //         imgLight: expand_light,
    //         position: 'left',
    //         tooltipDescription: control_btns_tooltips.expand,
    //         imgDisabled: chart_parameters_disabled,
    //         disabled: true
    //     },
    //     // switch to championship chart
    //     {
    //         id: 4,
    //         onClick: () => changeSparklineToChart('switchToSparkline'),
    //         img: '',
    //         imgActive: '',
    //         active: '',
    //         visible: false,
    //         imgLight: switch_to_sparkline_light,
    //         position: 'left',
    //         tooltipDescription: control_btns_tooltips.switch_sparkline,
    //     },
    //     // sparkline to chart
    //     {
    //         id: 5, onClick: () => changeSparklineToChart(''),
    //         img: switchToSparkline,
    //         imgActive: '',
    //         active: '',
    //         visible: isSingleTeamView || isDoubleTeamView,
    //         imgLight: switch_to_sparkline_light,
    //         position: 'left',
    //         tooltipDescription: control_btns_tooltips.switch_sparkline,
    //         btnId: 'reset-interface'
    //     },
    //     // filter by seasons
    //     {
    //         id: 6,
    //         btnId: 'filter-by-season',
    //         onClick: () => setFilterBySeasons(!filterBySeasons),
    //         img: filter_by_season,
    //         imgActive: filter_by_season_active,
    //         active: filterBySeasons,
    //         visible: isSingleTeamView || isDoubleTeamView,
    //         imgLight: filter_by_season_light,
    //         position: 'left',
    //         tooltipDescription: control_btns_tooltips.filter_by_seasons,
    //         hasSelection: true,
    //         selectItems: seasonFilterParams,
    //         currentFilter: candleFilters.filterBySeasons
    //     },
    //     // chart settings
    //     {
    //         id: 7, onClick: () => null,
    //         img: chart_settings,
    //         imgActive: chart_settings_active,
    //         active: '',
    //         visible: isSingleTeamView || isDoubleTeamView,
    //         disabled: true,
    //         imgDisabled: chart_settings_disabled,
    //         position: 'left',
    //         tooltipDescription: control_btns_tooltips.filter_by_seasons,
    //     },
    //     // filter by cups
    //     {
    //         id: 8, onClick: () => null,
    //         img: filter_by_cups,
    //         imgActive: filter_by_cups_active,
    //         active: '',
    //         visible: isSingleTeamView || isDoubleTeamView,
    //         disabled: true,
    //         imgDisabled: filter_by_cups_disabled,
    //         position: 'left',
    //         tooltipDescription: control_btns_tooltips.filter_by_seasons
    //     },
    //     // filter by home away games
    //     {
    //         id: 9,
    //         btnId: 'filter-by-homeaway-games',
    //         onClick: () => setFilterByHomeAwayGames(!filterByHomeAwayGames),
    //         img: filter_by_home_away,
    //         imgActive: filter_by_home_away_active,
    //         active: filterByHomeAwayGames,
    //         visible: isSingleTeamView || isDoubleTeamView,
    //         imgLight: filter_by_home_away_light,
    //         position: 'left',
    //         tooltipDescription: control_btns_tooltips.filter_by_games,
    //         hasSelection: true,
    //         selectItems: metricsByGames,
    //         currentFilter: candleFilters.byHomeAwayGames
    //     },
    //     // filter by times 
    //     {
    //         id: 10,
    //         btnId: 'filter-by-times',
    //         onClick: () => setFilterByTimes(!filterByTimes),
    //         img: filter_by_times,
    //         imgActive: filter_by_times_active,
    //         active: filterByTimes,
    //         visible: isSingleTeamView,
    //         imgLight: filter_by_times_light,
    //         position: 'left',
    //         tooltipDescription: control_btns_tooltips.filter_by_times,
    //         hasSelection: true,
    //         selectItems: metricsFilterByTime,
    //         currentFilter: candleFilters.byTypeOfTime
    //     },
    //     // filter by goals 
    //     {
    //         id: 11,
    //         btnId: 'filter-by-goals',
    //         onClick: () => setFilterByGoals(!filterByGoals),
    //         img: filter_by_goals,
    //         imgActive: filter_by_goals_active,
    //         active: filterByGoals,
    //         visible: isSingleTeamView || isDoubleTeamView,
    //         imgLight: filter_by_goals_light,
    //         position: 'left',
    //         tooltipDescription: control_btns_tooltips.filter_by_goals,
    //         hasSelection: true,
    //         selectItems: goalsFilterParams,
    //         currentFilter: candleFilters.byAmountOfGoals
    //     },
    // ]

    // const guidelineRoadmapActivate = () => {
    //     setIsShowGuideline(true)
    //     dispatch(activateGuidelineMode())
    //     dispatch(disableEducationOffer())
    // }


    // const mobile_controls = [
    //     // expand
    //     {
    //         id: 1,
    //         onClick: () => expandTeamSectionMobile('newsAndLastGames'),
    //         img: expand,
    //         imgActive: expand_active,
    //         active: interfaceState.mobile.expandSections.newsAndLastGamesSection,
    //         visible: interfaceState.mobile.orientation.portrait,
    //         imgLight: expand_light,
    //         position: 'left',
    //     },
    //     // open news
    //     {
    //         id: 2,
    //         img: open_news,
    //         imgActive: open_news_active,
    //         onClick: () => dispatch(switchActiveTeamDetailInfoTabMobile(1)),
    //         active: activeTeamDetailInfoTabMobile === 1,
    //         disabled: false,
    //         visible: true,
    //         imgLight: open_news_light,
    //         position: 'left',
    //     },
    //     // information matches table
    //     {
    //         id: 3,
    //         img: information_table,
    //         imgActive: information_table_active,
    //         onClick: () => dispatch(switchActiveTeamDetailInfoTabMobile(2)),
    //         active: activeTeamDetailInfoTabMobile === 2,
    //         visible: true,
    //         position: 'left',
    //     },
    //     // {
    //     //     id: 5,
    //     //     img: tips,
    //     //     imgActive: tech_support_active,
    //     //     onClick: () => setIsTipsModal(true),
    //     //     active: activeTabDetailTeam === 4,
    //     //     visible: true,
    //     //     position: 'left', 
    //     //     tooltipDescription: control_btns_tooltips.tips,
    //     //     btnId: 'tips'
    //     // },
    //     {
    //         id: 6,
    //         img: guide,
    //         imgActive: '',
    //         onClick: guidelineRoadmapActivate,
    //         active: activeTeamDetailInfoTabMobile === 4,
    //         visible: true,
    //         position: 'left',
    //         tooltipDescription: control_btns_tooltips.user_guide,
    //         btnId: 'user-guide'
    //     },
    // ]


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

    const theme = 'dark'
    const border = theme === 'dark' ? '1px solid #5C5C5C' : '1px solid #E1E3EA'

    // const tournamentType = useAppSelector((state => state.tournamentSlice.isNationalTournament))

    const leftChartBtns = useMemo(() => [
        {
            id: 1,
            icon: <PublishPost/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 2,
            icon: <DiagonalLevels/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 3,
            icon: <LabelSelection />,
            onClick: () => null,
            disabled: true
        },
        {
            id: 4,
            icon: <Nuler/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 5,
            icon: <PutYourLables/>,
            onClick: () => null,
            disabled: true
        }
    ], [])

    const rightChartBtns = useMemo(() => [
        {
            id: 1,
            icon: <Expand/>,
            onClick: () => null,
            disabled: false
        },
        {
            id: 2,
            icon: <FilterBySeasons/>,
            onClick: () => null,
            disabled: false
        },
        {
            id: 3,
            icon: <ChartSettings/>,
            onClick: () => null,
            disabled: false
        },
        {
            id: 4,
            icon: <FilterByCups/>,
            onClick: () => null,
            disabled: false
        },
        {
            id: 5,
            icon: <FilterByHomeAwayGames/>,
            onClick: () => null,
            disabled: false
        },
        {
            id: 6,
            icon: <FilterByTimes/>,
            onClick: () => null,
            disabled: false
        },
        {
            id: 7,
            icon: <FilterByGoals/>,
            onClick: () => null,
            disabled: false
        },
    ], [])

    const desktop = (
        <div className={`${styles.panels} ${styles[theme]}`}>
            <div className={styles.work_panel_left} style={{ position: 'relative', borderRight: border }}>
                <div className="flex flex-col gap-2">
                    {leftChartBtns.map(({ id, ...btnProps }) => (
                        <PanelBtn key={id} {...btnProps} />
                    ))}
                </div>
            </div>
            <div style={{ width: `${leftPaneWidthPercentage}%` }} className={styles.left_section}>
            <div className={styles.right_section_chart}>
                        <div style={{ height: `${chartPanelHeightPercentage}%` }} className={styles.chart} id='candle-chart'>
                        {/* {isSingleTeamView ?
                                            <CandleChart
                                                rulerActive={drawRulerActive}
                                                modifiedCandles={firstSelectedTeamCandles}
                                                team_img={firstSelectedTeam?.team_img}
                                                team_name={firstSelectedTeam?.team_name}
                                                two_candles={false}
                                                filterByHomeAwayGames={filterCandleChartByTypeOfGames}
                                                filterByAmoutOfGoals={filterCandleChartByAmoutOfGoals}
                                                filterCandleChartByTypeOfTime={filterCandleChartByTypeOfTime}
                                                seasons={firstSelectedTeamSeasons}
                                                chartId="single_chart"
                                                width={leftPaneWidthPercentage}
                                                height={championshipTableHeightPercentage}
                                            />                                            
                                        } */}
                            <SparkLineSection sectionWidth={leftPaneWidthPercentage} />
                            <div className={styles.panel_section} id='candle-chart-panel-section' style={{ borderLeft: border }}>
                            <div className="flex flex-col gap-2">
                                {rightChartBtns.map(({ id, ...btnProps }) => (
                                    <PanelBtn key={id} {...btnProps} />
                                ))}
                            </div>
                            </div>
                        </div>
                        <div className={styles.news_section} style={{ display: expandSections ? 'none' : 'flex' }}>
                            <Banner />
                            <div className={styles.news_section_inner}>
                                <TeamDetailInfoSection />
                            </div>
                        </div>
                    </div>
            </div>
            <div className={styles.championship_table_section} style={{ display: expandSections ? 'none' : 'flex' }}>
                {/* <div style={{ height: `${championshipTableHeightPercentage}%` }}> */}
                    <ChampionshipTable />
                {/* </div> */}
                <div className={styles.recent_games_section} >
                    {/* <RecentGamesSection leftPaneWidthPercentage={leftPaneWidthPercentage} setIsTipsModal={setIsTipsModal} setShowGuideline={setIsShowGuideline} /> */}
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




