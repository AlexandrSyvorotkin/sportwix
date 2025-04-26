// import styles from "./Chart.module.scss";
// import React, { FC, useContext, useEffect, useState, useRef } from "react";
// import ChampionshipTable from "../../components/ChampionshipTable/ChampionshipTable";
// import ChampionshipChart from "../../components/ChampionshipChart/ChampionshipChart";

// import publish_post from "../../assets/control_panels_logos/championshipSchedulePanel/PublishPost/publishPost.svg";
// import publish_post_active from "../../assets/control_panels_logos/championshipSchedulePanel/PublishPost/publishPostActive.svg";
// import publish_post_light from "../../assets/control_panels_logos/championshipSchedulePanel/PublishPost/PublishPostLight.svg";
// import publish_post_disabled from '../../assets/control_panels_logos/championshipSchedulePanel/PublishPost/publishPostDisabled.svg'
// import label_selection from "../../assets/control_panels_logos/championshipSchedulePanel/LabelSelection/LabelSelection.svg";
// import label_selection_active from "../../assets/control_panels_logos/championshipSchedulePanel/LabelSelection/LabelSelectionActive.svg";
// import label_selection_light from "../../assets/control_panels_logos/championshipSchedulePanel/LabelSelection/LabelSelectionLight.svg";
// import label_selection_disabled from "../../assets/control_panels_logos/championshipSchedulePanel/LabelSelection/LabelSelectionDisabled.svg";

// import Nuler from '../../assets/control_panels_logos/championshipSchedulePanel/Nuler/Nuler.svg'
// import Nuler_active from '../../assets/control_panels_logos/championshipSchedulePanel/Nuler/Nuler_active.svg'
// import NulerLight from '../../assets/control_panels_logos/championshipSchedulePanel/Nuler/NulerLight.svg'
// import nuler_disabled from '../../assets/control_panels_logos/championshipSchedulePanel/Nuler/nuler_disabled.svg'

// import diagonal_levels from '../../assets/control_panels_logos/championshipSchedulePanel/diagonalLevels/diagonalLevels.svg';
// import diagonal_levels_active from '../../assets/control_panels_logos/championshipSchedulePanel/diagonalLevels/diagonalLevelsActive.svg';
// import diagonal_levels_light from '../../assets/control_panels_logos/championshipSchedulePanel/diagonalLevels/DiagonalLevelsLight.svg';

// import put_your_labels from '../../assets/control_panels_logos/championshipSchedulePanel/PutYourLabels/PutYourLabels.svg'
// import put_your_labels_active from '../../assets/control_panels_logos/championshipSchedulePanel/PutYourLabels/PutYourLabelsActive.svg'
// import put_your_labels_light from '../../assets/control_panels_logos/championshipSchedulePanel/PutYourLabels/PutYourLabelsLight.svg'
// import put_your_labels_disabled from '../../assets/control_panels_logos/championshipSchedulePanel/PutYourLabels/put_your_labels_disabled.svg'

// import ControlPanelBtn from "../../ui/Buttons/ControlPanelBtn/ControlPanelBtn";
// import SparkLineSection from "../../components/SparkLineSection/SparkLineSection";
// import expand from "../../assets/control_panels_logos/championship_table_right_panel/Expand/Expand.svg";
// import expand_active from "../../assets/control_panels_logos/championship_table_right_panel/Expand/ExpandActive.svg";
// import expand_light from '../../assets/control_panels_logos/championship_table_right_panel/Expand/ExpandLight.svg'
// import xPTS from "../../assets/control_panels_logos/championship_table_right_panel/xPTS/xPTS.svg";
// import xPTS_active from "../../assets/control_panels_logos/championship_table_right_panel/xPTS/xPTSActive.svg";
// import chart_parameters
//     from "../../assets/control_panels_logos/championship_table_right_panel/ChartParameters/ChartParameters.svg";
// import chart_parameters_active
//     from "../../assets/control_panels_logos/championship_table_right_panel/ChartParameters/ChartParametersActive.svg";

// import chart_parameters_disabled from '../../assets/control_panels_logos/championship_table_right_panel/ChartParameters/ChartParametersDisabled.svg'

// import switchToChampionshipChart from '../../assets/control_panels_logos/common/SwitchToChampionshipChartIcon.svg'
// import switchToSparkline from '../../assets/control_panels_logos/common/SwitchToSparklineIcon.svg'
// import switch_to_sparkline_light from '../../assets/control_panels_logos/common/SwitchToSparklineIconLight.svg'

// import filter_by_goals from '../../assets/control_panels_logos/championship_table_right_panel/FilterByGoals/FilterByGoals.svg'
// import filter_by_goals_active from '../../assets/control_panels_logos/championship_table_right_panel/FilterByGoals/FilterByGoalsActive.svg'
// import filter_by_goals_light from '../../assets/control_panels_logos/championship_table_right_panel/FilterByGoals/FilterByGoalsLight.svg'

// import filter_by_home_away from '../../assets/control_panels_logos/championship_table_right_panel/FilterByHomeAway/FilterByHomeAway.svg'
// import filter_by_home_away_active from '../../assets/control_panels_logos/championship_table_right_panel/FilterByHomeAway/FilterByHomeAwayActive.svg'
// import filter_by_home_away_light from '../../assets/control_panels_logos/championship_table_right_panel/FilterByHomeAway/FilterByHomeAwayLight.svg'

// import filter_by_season from '../../assets/control_panels_logos/championship_table_right_panel/FilterBySeason/FilterBySeason.svg'
// import filter_by_season_active from '../../assets/control_panels_logos/championship_table_right_panel/FilterBySeason/FilterBySeasonActive.svg'
// import filter_by_season_light from '../../assets/control_panels_logos/championship_table_right_panel/FilterBySeason/FilterBySeasonLight.svg'

// import filter_by_cups from '../../assets/control_panels_logos/championship_table_right_panel/FilterByCups/FilterByCups.svg'
// import filter_by_cups_active from '../../assets/control_panels_logos/championship_table_right_panel/FilterByCups/FilterByCupsActive.svg'
// import filter_by_cups_disabled from '../../assets/control_panels_logos/championship_table_right_panel/FilterByCups/filter_by_cups_disabled.svg'

// import filter_by_times from '../../assets/control_panels_logos/championship_table_right_panel/FilterByTimes/FilterByTimes.svg'
// import filter_by_times_active from '../../assets/control_panels_logos/championship_table_right_panel/FilterByTimes/FilterByTimesActive.svg'
// import filter_by_times_light from '../../assets/control_panels_logos/championship_table_right_panel/FilterByTimes/FilterByTimesLight.svg'

// import chart_settings from '../../assets/control_panels_logos/championship_table_right_panel/ChartSettings/ChartSettings.svg'
// import chart_settings_active from '../../assets/control_panels_logos/championship_table_right_panel/ChartSettings/ChartSettingsActive.svg'
// import chart_settings_disabled from '../../assets/control_panels_logos/championship_table_right_panel/ChartSettings/chart_settings_disabled.svg'

// import TeamDetailInfoSection from "../../components/TeamDetailInfoSection/TeamDetailInfoSection";
// import RecentGamesSection from "../../components/RecentGamesSection/RecentGamesSection";
// import { changeChartWidth } from "../../redux/ChartWidthSlice/ChartWidthSlice";
// import { useAppDispatch, useAppSelector } from "../../types/hooks";
// import ChartSelect from "../../ui/Selections/ChartSelect/ChartSelect";
// import { ITeam } from "../../models/ITeam";
// import { ILastMatch } from "../../models/ILastMatch";

// import { switchPageToChampionship } from '../../redux/SingleTeamInfoSlice/SingleTeamInfoSlice'

// import bannerLogo from '../../assets/logo and favicon/Favicon.svg'


// import ModeSwitcher from "../../components/ModeSwitcher/ModeSwitcher";
// import CandleChart from "../../components/CandleChart/CandleChart";
// import TwoCandlesWrapper from "../../components/TwoCandlesChartsWrapper/TwoCandlesWrapper";
// import { Candle } from "../../models/Candle";
// import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
// import CandleCHartSelect from "../../ui/Selections/candleChartSelect/candleChartSelect";
// import { currentSeasons, addCandles, filterByTimesRedux, filterCandlesBySeasons, setLoadingFalse, setLoadingTrue } from "../../redux/CandleSlice/CandleSlice";
// import axios from "axios";
// import classNames from "classnames";
// import { ResizableBorder } from "../../components/ResizableBorder/ResizableBorder";

// import { filterCandlesByHomeAwayGamesAndGoals, } from '../../redux/CandleSlice/CandleSlice'
// import { filterByTimesReduxTwo, addTwoCandles, currentSeasonsTwo, setLoadingTwoCandleTrue, setLoadingTwoCandleFalse } from '../../redux/TwoCandlesSlice/TwoCandlesSlice'
// import { useSelector } from "react-redux";
// import { stat } from "fs";
// import PublishPostModal from "../../ui/modals/PublishPostModal/PublishPostModal";
// import Loader from "../../components/Loader/Loader";
// import ChampionshipChartTooltip from "../../components/ControlButtonTooltip/ControlButtonTooltip";
// import { API_VARIABLES } from '../../api/variables'
// import Banner from "../../components/Banner/Banner";
// import TeamStatsControls from "../../components/TeamStatsControls/TeamStatsControls";
// import {twoCandleChartsOff} from '../../redux/TwoCandlesSlice/TwoCandlesSlice'
// import LoaderAlt from "../../components/Loader2/LoaderAlt";

// interface ChartProps {
//     championshipTableData: ITeam[];
//     recentChampionshipMatches: ILastMatch[]
// }

// const Chart: FC<ChartProps> = ({ championshipTableData, recentChampionshipMatches }) => {

//     const dispatch = useAppDispatch()

//     const { BASE_PATH, API, V1, EVENT, TEAM } = API_VARIABLES

//     const [isResizing, setIsResizing] = useState(false);
//     const [initialX, setInitialX] = useState<number | undefined>(undefined);
//     const [initialY, setInitialY] = useState<number | undefined>(undefined);
//     const [direction, setDirection] = useState<string>('')

//     const [leftPaneWidthPercentage, setLeftPaneWidthPercentage] = useState(65);
//     const [championshipTableHeightPercentage, setChampionshipTableHeightPercentage] = useState(50);
//     const [chartPanelHeightPercentage, setChartPanelHeightPercentage] = useState(50)

//     const twoCandleActive = useAppSelector(state => state.twoCandles.status)

//     const [publishPost, setPublishPost] = useState<boolean>(false)
//     const [sparkLineActive, setSparklineActive] = useState<boolean>(true)

//     const [expandSections, setExpandSections] = useState<boolean>(true)
//     const [bordersResizableActive, setBorderResizableActive] = useState<boolean>(true)
//     const [sectionDisplay, setSectionDisplay] = useState<string>('flex')
//     const borderResizableStatus = bordersResizableActive
//     const expandSectionsStatus = expandSections

//     const [disableControlPanelItem, setDisableControlPanelItem] = useState<boolean>(true)


//     const [metric, setMetric] = useState('score')
//     const [chartSelect, setChartSelect] = useState<boolean>(false)


//     const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
//         setIsResizing(true);
//         setInitialX(e.clientX);
//         setInitialY(e.clientY);
//         setDirection(direction);
//     };

//     const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
//         setDirection('')
//         setIsResizing(false);
//     };


//     const newHandleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//         if (!isResizing || initialX === undefined || initialY === undefined) return;

//         const deltaX = e.clientX - initialX;
//         const deltaY = e.clientY - initialY;

//         const containerWidth = e.currentTarget.clientWidth || 0;
//         const containerHeight = e.currentTarget.clientHeight || 0;

//         switch (direction) {
//             case "horizontal":
//                 return horizontal();
//             case "vertical":
//                 return vertical();
//             case "chart":
//                 return chart();
//         }

//         function horizontal() {

//             let newWidthPercentage = leftPaneWidthPercentage + (deltaX / containerWidth) * 100;
//             if (newWidthPercentage === 78) newWidthPercentage = 78
//             if (newWidthPercentage < 45) newWidthPercentage = 45;
//             setLeftPaneWidthPercentage(newWidthPercentage);
//             setInitialX(e.clientX);
//             dispatch(changeChartWidth(newWidthPercentage))
//         }

//         function vertical() {

//             let newHeightPercentage = championshipTableHeightPercentage + (deltaY / containerHeight) * 100;
//             if (newHeightPercentage < 25) newHeightPercentage = 25
//             if (newHeightPercentage > 70) newHeightPercentage = 70
//             setChampionshipTableHeightPercentage(newHeightPercentage);
//             setInitialY(e.clientY);

//         }

//         function chart() {
//             let newChartHeightPercentage = chartPanelHeightPercentage + (deltaY / containerHeight) * 100;
//             if (newChartHeightPercentage < 20) newChartHeightPercentage = 20
//             if (newChartHeightPercentage > 65) newChartHeightPercentage = 65
//             setChartPanelHeightPercentage(newChartHeightPercentage);
//             setInitialY(e.clientY);
//         }
//     };


//     useEffect(() => {
//         if (!expandSections && !bordersResizableActive) {
//             setLeftPaneWidthPercentage(100)
//             setChartPanelHeightPercentage(100)
//             setSectionDisplay('none')
//         } else {
//             setLeftPaneWidthPercentage(65)
//             setChartPanelHeightPercentage(50)
//             setSectionDisplay('flex')
//         }
//     }, [expandSections, bordersResizableActive])


//     function expandChartSectionHandler() {
//         setExpandSections(!expandSections)
//         setBorderResizableActive(!bordersResizableActive)
//     }


//     const metrics = [
//         { metric: 'score' },
//         { metric: 'xG' },
//         // {metric: 'xGA'},
//         // {metric: 'xPts'},
//         // {metric: 'goals_scored'},
//         // {metric: 'goal_conceded'},
//     ]


//     function changeSparklineToChart(type: string) {
//         if (type === "switchToSparkline") {
//             setSparklineActive(!sparkLineActive)
//             setDisableControlPanelItem(!disableControlPanelItem)
//             dispatch(switchPageToChampionship())
//         } else {
//             setSparklineActive(true)
//             dispatch(switchPageToChampionship())
//             dispatch(twoCandleChartsOff())
//         }
//     }


//     const pageInfoAboutSingleTeam = useAppSelector(state => state.singleTeamInfo.pageInfoAboutSingleTeam)


//     function filterByParamHandler(param: string) {
//         setMetric(param)
//         setChartSelect(!chartSelect)
//     }

//     const [drawRulerActive, setDrawRulerActive] = useState<boolean>(false)

//     const chartCandleFunctions = [
//         { id: 1, onClick: () => null, img: publish_post, imgActive: publish_post_active, active: null, disabled: true, visible: true, imgLight: publish_post_light, imgDisabled: publish_post_disabled, position: 'right', tooltipDescription: 'publish post' },
//         { id: 2, onClick: () => null, img: label_selection, imgActive: label_selection_active, active: null, visible: pageInfoAboutSingleTeam, imgLight: label_selection_light, position: 'right', tooltipDescription: 'label selection', disabled: true, imgDisabled: label_selection_disabled },
//         { id: 3, onClick: () => null, img: Nuler, imgActive: Nuler_active, active: null, visible: pageInfoAboutSingleTeam, imgLight: NulerLight, disabled: true, imgDisabled: nuler_disabled, position: 'right', tooltipDescription: 'nuler' },
//         { id: 4, onClick: () => setDrawRulerActive(!drawRulerActive), img: diagonal_levels, imgActive: diagonal_levels_active, active: drawRulerActive, visible: pageInfoAboutSingleTeam, imgLight: diagonal_levels_light, position: 'right', tooltipDescription: 'diagonal levels' },
//         { id: 5, onClick: () => null, img: put_your_labels, imgActive: put_your_labels_active, active: '', visible: pageInfoAboutSingleTeam, imgLight: put_your_labels_light, disabled: true, imgDisabled: put_your_labels_disabled, position: 'right', tooltipDescription: 'put your labels' },
//     ]

//     const { theme, setTheme } = useContext(ThemeContext)



//     const twoCandleCharts = useAppSelector(state => state.twoCandles.status)
//     const singleTeamUuid = useAppSelector(state => state.singleTeamInfo?.team?.team_uuid)

//     const singleTeamInfo = useAppSelector(state => state?.singleTeamInfo?.team)


//     const [filterBySeasons, setFilterBySeasons] = useState<boolean>(false)
//     const [filterByGoals, setFilterByGoals] = useState<boolean>(false)
//     const [filterByTimes, setFilterByTimes] = useState<boolean>(false)
//     const [filterByHomeAwayGames, setFilterByHomeAwayGames] = useState<boolean>(false)

//     const chartControls = [
//         { id: 1, onClick: expandChartSectionHandler, img: expand, imgActive: expand_active, active: !expandSections, visible: true, imgLight: expand_light, position: 'left', tooltipDescription: 'expand' },
//         // {id: 2, onClick: () => setChartSelect(true), img: xPTS, imgActive: xPTS_active, active: chartSelect , visible: !sparkLineActive && !pageInfoAboutSingleTeam, imgLight: expand_light},
//         { id: 3, onClick: () => null, img: chart_parameters, imgActive: chart_parameters_active, active: false, visible: !pageInfoAboutSingleTeam && !twoCandleActive, imgLight: expand_light, position: 'left', tooltipDescription: 'chart parameters', imgDisabled: chart_parameters_disabled, disabled: true },
//         // { id: 4, onClick: () => changeSparklineToChart('switchToSparkline'), img: sparkLineActive ? switchToChampionshipChart : switchToSparkline, imgActive: '', active: '', visible: !pageInfoAboutSingleTeam && !twoCandleActive, imgLight: switch_to_sparkline_light, position: 'left', tooltipDescription: 'sparkline / championship chart' },
//         { id: 5, onClick: () => changeSparklineToChart(''), img: switchToSparkline, imgActive: '', active: '', visible: pageInfoAboutSingleTeam || twoCandleActive, imgLight: switch_to_sparkline_light, position: 'left', tooltipDescription: 'sparkline / championship chart' },
//         { id: 6, btnId: 'filterBySeasons', onClick: () => setFilterBySeasons(!filterBySeasons), img: filter_by_season, imgActive: filter_by_season_active, active: filterBySeasons, visible: pageInfoAboutSingleTeam || twoCandleActive, imgLight: filter_by_season_light, position: 'left', tooltipDescription: 'filter by seasons' },
//         { id: 7,  onClick: () => null, img: chart_settings, imgActive: chart_settings_active, active: '', visible: pageInfoAboutSingleTeam || twoCandleActive, disabled: true, imgDisabled: chart_settings_disabled, position: 'left', tooltipDescription: 'chart settings' },
//         { id: 8, onClick: () => null, img: filter_by_cups, imgActive: filter_by_cups_active, active: '', visible: pageInfoAboutSingleTeam || twoCandleActive, disabled: true, imgDisabled: filter_by_cups_disabled, position: 'left', tooltipDescription: 'filter by cups' },
//         { id: 9, btnId: 'filterByHomeAwayGames', onClick: () => setFilterByHomeAwayGames(!filterByHomeAwayGames), img: filter_by_home_away, imgActive: filter_by_home_away_active, active: filterByHomeAwayGames, visible: pageInfoAboutSingleTeam || twoCandleActive, imgLight: filter_by_home_away_light, position: 'left', tooltipDescription: 'filter by games' },
//         { id: 10, btnId: 'filterByTimes', onClick: () => setFilterByTimes(!filterByTimes), img: filter_by_times, imgActive: filter_by_times_active, active: filterByTimes, visible: pageInfoAboutSingleTeam, imgLight: filter_by_times_light, position: 'left', tooltipDescription: 'filter by times' },
//         { id: 11, btnId: 'filterByGoals', onClick: () => setFilterByGoals(!filterByGoals), img: filter_by_goals, imgActive: filter_by_goals_active, active: filterByGoals, visible: pageInfoAboutSingleTeam || twoCandleActive, imgLight: filter_by_goals_light, position: 'left', tooltipDescription: 'filter by goals' },
//     ]

//     const [activeParamsSelect, setActiveParamsSelect] = useState({
//         filterByGames: 1,
//         filterByTimes: 1,
//         filterByGoals: 1,
//         filterBySeasons: 2
//     })

//     const metricsByGames = [
//         { id: 1, param: 'All games', filterFunc: () => filterByHomeAwayGamesHandler('Все игры', 1) },
//         { id: 2, param: 'Home games', filterFunc: () => filterByHomeAwayGamesHandler('Дома', 2) },
//         { id: 3, param: 'Away games', filterFunc: () => filterByHomeAwayGamesHandler('В гостях', 3) },
//     ]
//     const metricsFilterByTime = [
//         { id: 1, param: 'FT', filterFunc: () => newFilterByTimeHandler('Полный матч', 1) },
//         { id: 2, param: '1T + 2T', filterFunc: () => newFilterByTimeHandler('1+2', 2) },
//         { id: 3, param: '1T', filterFunc: () => newFilterByTimeHandler('1T', 3) },
//         { id: 4, param: '2T', filterFunc: () => newFilterByTimeHandler('2T', 4) },
//     ]
//     const seasonFilterParams = [
//         { id: 1, param: 'All seasons', filterFunc: () => filterSeasons(11, 1) },
//         { id: 2, param: '3 Last seasons', filterFunc: () => filterSeasons(3, 2) },
//         { id: 3, param: '5 ast seasons', filterFunc: () => filterSeasons(5, 3) },
//     ]

//     const goalsFilterParams = [
//         { id: 1, param: 'All goals', filterFunc: () => filterByGoalsHandler('', 1) },
//         { id: 2, param: 'Total > 2.5', filterFunc: () => filterByGoalsHandler('1', 2) },
//         { id: 3, param: 'Total < 2.5', filterFunc: () => filterByGoalsHandler('2', 3) },
//     ]

//     //rebased to redux and adaptive to two-candles-charts
//     const filterByHomeAwayGamesHandler = (type: string, id: number) => {
//         setFilterByHomeAwayGames(false)
//         setActiveParamsSelect({
//             filterByGames: id,
//             filterByTimes: activeParamsSelect.filterByTimes,
//             filterByGoals: activeParamsSelect.filterByGoals,
//             filterBySeasons: activeParamsSelect.filterBySeasons
//         })
//         dispatch(filterCandlesByHomeAwayGamesAndGoals(type))
//     }

//     //rebased to redux and adaptive to two-candles-charts
//     const filterByGoalsHandler = (type: string, id: number) => {
//         setFilterByGoals(false)
//         setActiveParamsSelect({
//             filterByGames: activeParamsSelect.filterByGames,
//             filterByTimes: activeParamsSelect.filterByTimes,
//             filterByGoals: id,
//             filterBySeasons: activeParamsSelect.filterBySeasons
//         })
//         dispatch(filterCandlesByHomeAwayGamesAndGoals(type))
//     }

//     //rebased to redux
//     async function newFilterByTimeHandler(type: string, id: number) {

//         if (!loading) {
//             if (id === 1) {
//                 dispatch(setLoadingTrue())
//                 try {
    
//                     const { data } = await axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${singleTeamUuid}/${EVENT}/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=false`)
//                     dispatch(addCandles(data.candles))
//                     dispatch(currentSeasons(data.seasons))
//                     setFilterByTimes(false)
    
    
    
//                     setActiveParamsSelect({
//                         filterByGames: activeParamsSelect.filterByGames,
//                         filterByTimes: id,
//                         filterByGoals: activeParamsSelect.filterByGoals,
//                         filterBySeasons: activeParamsSelect.filterBySeasons
//                     })
//                 } catch {
//                 } finally {
//                     dispatch(setLoadingFalse())
    
//                 }
//             }
    
//             if (id === 2) {
//                 dispatch(setLoadingTrue())
//                 try {
    
//                     const { data } = await axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${singleTeamUuid}/${EVENT}/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=true`)
//                     dispatch(addCandles(data.candles))
//                     dispatch(currentSeasons(data.seasons))
//                     dispatch(filterCandlesByHomeAwayGamesAndGoals(type))
//                     setFilterByTimes(false)
    
    
//                     setActiveParamsSelect({
//                         filterByGames: activeParamsSelect.filterByGames,
//                         filterByTimes: id,
//                         filterByGoals: activeParamsSelect.filterByGoals,
//                         filterBySeasons: activeParamsSelect.filterBySeasons
//                     })
//                 } catch {
//                 } finally {
//                     dispatch(setLoadingFalse())
    
//                 }
//             }
    
    
//             if (id === 3) {
//                 dispatch(setLoadingTrue())
//                 try {
    
//                     const { data } = await axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${singleTeamUuid}/${EVENT}/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=true`)
//                     dispatch(addCandles(data.candles))
//                     dispatch(currentSeasons(data.seasons))
//                     dispatch(filterCandlesByHomeAwayGamesAndGoals(type))
//                     setFilterByTimes(false)
    
//                     setActiveParamsSelect({
//                         filterByGames: activeParamsSelect.filterByGames,
//                         filterByTimes: id,
//                         filterByGoals: activeParamsSelect.filterByGoals,
//                         filterBySeasons: activeParamsSelect.filterBySeasons
//                     })
//                 } catch {
//                 } finally {
//                     dispatch(setLoadingFalse())
//                     setFilterByTimes(false)
//                 }
//             }
    
//             if (id === 4) {
//                 dispatch(setLoadingTrue())
//                 try {
    
//                     const { data } = await axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${singleTeamUuid}/${EVENT}/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=true`)
//                     dispatch(addCandles(data.candles))
//                     dispatch(currentSeasons(data.seasons))
//                     dispatch(filterCandlesByHomeAwayGamesAndGoals(type))
//                     setFilterByTimes(false)
    
//                     setActiveParamsSelect({
//                         filterByGames: activeParamsSelect.filterByGames,
//                         filterByTimes: id,
//                         filterByGoals: activeParamsSelect.filterByGoals,
//                         filterBySeasons: activeParamsSelect.filterBySeasons
//                     })
//                 } catch {
//                 } finally {
//                     dispatch(setLoadingFalse())
    
//                 }
//             }
//         }


//     }



//     const twoCandles = useAppSelector(state => state.twoCandles)


//     //rebased to redux
//     async function filterSeasons(seasons: number, id: number) {

//         // dispatch(setLoadingTwoCandleTrue())

//         if (!loading) {
//             dispatch(setLoadingTrue())
//            try {
            
//             setFilterBySeasons(false)

//             const { data } = await axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${singleTeamUuid}/event/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=${seasons}&splited=false`)

//             console.log(data)

//             dispatch(addCandles(data.candles))
//             dispatch(currentSeasons(data.seasons))
            

//             setActiveParamsSelect({
//                 filterByGames: activeParamsSelect.filterByGames,
//                 filterByTimes: activeParamsSelect.filterByTimes,
//                 filterByGoals: activeParamsSelect.filterByGoals,
//                 filterBySeasons: id
//             }) 
//            } catch {

//            } finally {
//                 dispatch(setLoadingFalse())
//         }
//         }

//         if (twoCandleActive) {

//             dispatch(setLoadingTwoCandleTrue())
                
//                 if (!loadingTwo) {
//                     try {
//                         const fisrtTeam = await axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${twoCandles.fisrt_team_uuid}/event/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=${seasons}&splited=false`)
//                         const secondTeam = await axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${twoCandles.second_team_uuid}/event/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=${seasons}&splited=false`)
            
//                         const firstTeamCandles = fisrtTeam.data.candles
//                         const secondTeamCandles = secondTeam.data.candles
            
//                         setFilterBySeasons(false)
            
//                         const firstTeamSeasons = fisrtTeam.data.seasons
//                         const secondTeamSeasons = secondTeam.data.seasons
            
//                         setActiveParamsSelect({
//                             filterByGames: activeParamsSelect.filterByGames,
//                             filterByTimes: activeParamsSelect.filterByTimes,
//                             filterByGoals: activeParamsSelect.filterByGoals,
//                             filterBySeasons: id
//                         })
//                         dispatch(addTwoCandles({ first: firstTeamCandles, second: secondTeamCandles }))
//                         dispatch(filterByTimesReduxTwo('Полный матч'))
//                         dispatch(currentSeasonsTwo({ first: firstTeamSeasons, second: secondTeamSeasons }))
//                     } catch {
//                         // setError(true)
//                     } finally {
//                         dispatch(setLoadingTwoCandleFalse())
//                     }
//                 }
//         } 
        
//     }

//     const filterType = useAppSelector<any>(state => state.candles.filterByHomeAwayGamesAndGoals)

//     const seasons = useAppSelector(state => state.candles.seasons)

//     const candles = useAppSelector(state => state.candles.candles)

//     const loading = useAppSelector(state => state.candles.loading)

//     const loadingTwo = useAppSelector(state => state.twoCandles.loadingTwo)

//     const isTeamStatsControlsVisible = useAppSelector(state => state.TeamStatsControls.isVisible)

//     // console.log(loading)

//     return (
//         <div className={`${styles.panels} ${styles[theme]}`} onMouseMove={newHandleMouseMove} onMouseUp={handleMouseUp}>
//             <div className={styles.work_panel_left} style={{ position: 'relative' }}>
//                 {chartCandleFunctions.map(btn =>
//                     <ControlPanelBtn
//                         key={btn.id}
//                         imgLight={btn.imgLight}
//                         img={btn.img}
//                         onClick={btn.onClick}
//                         active={btn.active}
//                         imgActive={btn.imgActive}
//                         disabled={btn.disabled}
//                         visible={btn.visible}
//                         imgDisabled={btn.imgDisabled}
//                         position={btn.position}
//                         tooltipDescription={btn.tooltipDescription}
//                     />
//                 )}
//                 {isTeamStatsControlsVisible ? <TeamStatsControls /> : null}
//             </div>
//             {/* <div style={{ width: `${leftPaneWidthPercentage}%` }} className={styles.left_section}> */}
//             <div className={styles.left_section}>
//                 <div className={styles.right_section_chart}>
//                 <div style={{ height: `${chartPanelHeightPercentage}%` }} className={styles.chart}>
//                         {loading || loadingTwo ? <LoaderAlt/> :
//                             <>
//                                 {twoCandleCharts ?
//                                     <>
//                                         <TwoCandlesWrapper
//                                             drawRulerActive={drawRulerActive}/>
//                                     </>
//                                     :
//                                     <>
//                                         {pageInfoAboutSingleTeam ?
//                                             <>
//                                                 <CandleChart
//                                                     rulerActive={drawRulerActive}
//                                                     modifiedCandles={candles}
//                                                     team_img={singleTeamInfo?.team_img}
//                                                     team_name={singleTeamInfo?.team_name}
//                                                     two_candles={false}
//                                                     filter={filterType}
//                                                     seasons={seasons}
//                                                     chartId="single_chart"
//                                                     />
//                                             </>
//                                             :
//                                             <>  
//                                                 <SparkLineSection sectionWidth={leftPaneWidthPercentage} sparklineData={championshipTableData.slice(1)} />

//                                                 {/* <ChampionshipChart
//                                                         metric={metric}
//                                                         chartHeight={chartPanelHeightPercentage}
//                                                         chartWidth={leftPaneWidthPercentage}
//                                                         championshipChartData={championshipTableData.slice(1)}
//                                                 /> */}

//                                                 {/* {sparkLineActive ?
//                                                     <SparkLineSection sectionWidth={leftPaneWidthPercentage} sparklineData={championshipTableData.slice(1)} /> :
//                                                     <ChampionshipChart
//                                                         metric={metric}
//                                                         chartHeight={chartPanelHeightPercentage}
//                                                         chartWidth={leftPaneWidthPercentage}
//                                                         championshipChartData={championshipTableData.slice(1)}
//                                                     />
//                                                 } */}
//                                             </>
//                                         }
//                                     </>
//                                 }
//                             </>

//                         }
//                         <div className={styles.panel_section}>
//                             {chartControls.map(btn =>
//                                 <ControlPanelBtn
//                                     key={btn.id}
//                                     imgLight={btn.imgLight}
//                                     img={btn.img}
//                                     onClick={btn.onClick}
//                                     active={btn.active}
//                                     imgActive={btn.imgActive}
//                                     visible={btn.visible}
//                                     disabled={btn.disabled}
//                                     imgDisabled={btn.imgDisabled}
//                                     tooltipDescription={btn.tooltipDescription}
//                                     position={btn.position}
//                                     btnId={btn.btnId}
//                                 />
//                             )}
//                             {chartSelect ?
//                                 <ChartSelect
//                                     metrics={metrics}
//                                     filterChart={filterByParamHandler}
//                                     onClose={() => setChartSelect(false)}
//                                     topPosition={50}
//                                 /> :
//                                 null}
//                             {filterBySeasons ?
//                                 <CandleCHartSelect
//                                     candleMetrics={seasonFilterParams}
//                                     onClose={() => setFilterBySeasons(false)}
//                                     topPosition={90}
//                                     rightPosition={50}
//                                     activeParam={activeParamsSelect.filterBySeasons}
//                                     isOpen={filterBySeasons}
//                                     btnId="filterBySeasons"
//                                 />
//                                 :
//                                 null}
//                             {filterByHomeAwayGames ?
//                                 <CandleCHartSelect
//                                     candleMetrics={metricsByGames}
//                                     onClose={() => setFilterByHomeAwayGames(false)}
//                                     topPosition={150}
//                                     rightPosition={50}
//                                     activeParam={activeParamsSelect.filterByGames}
//                                     isOpen={filterByHomeAwayGames}
//                                     btnId="filterByHomeAwayGames"
//                                 /> :
//                                 null}
//                             {filterByTimes ?
//                                 <CandleCHartSelect
//                                     candleMetrics={metricsFilterByTime}
//                                     onClose={() => setFilterByTimes(false)}
//                                     topPosition={200}
//                                     rightPosition={50}
//                                     activeParam={activeParamsSelect.filterByTimes}
//                                     isOpen={filterByTimes}
//                                     btnId="filterByTimes"
//                                 /> :
//                                 null}
//                             {filterByGoals ?
//                                 <CandleCHartSelect
//                                     candleMetrics={goalsFilterParams}
//                                     onClose={() => setFilterByGoals(false)}
//                                     topPosition={250}
//                                     rightPosition={50}
//                                     activeParam={activeParamsSelect.filterByGoals}
//                                     isOpen={filterByGoals}
//                                     btnId="filterByGoals"
//                                 /> :
//                                 null}
//                         </div>
//                     </div>
//                     <ResizableBorder
//                         display={sectionDisplay}
//                         cursor='row-resize'
//                         resize={(e) => handleMouseDown(e, "chart")}
//                     />
//                     <div className={styles.news_section} style={{ display: `${sectionDisplay}` }}>
//                         <Banner />
//                         <div className={styles.news_section_inner}>
//                             <TeamDetailInfoSection />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <ResizableBorder
//                 display={sectionDisplay}
//                 cursor='col-resize'
//                 resize={(e) => handleMouseDown(e, "horizontal")}
//             />
//             <div className={styles.championship_table_section} style={{ display: `${sectionDisplay}` }}>
//                 <div style={{ height: `${championshipTableHeightPercentage}%` }}>
//                     <ChampionshipTable championshipTableData={championshipTableData.slice(1)} />
//                 </div>
//                 <ResizableBorder
//                     display={sectionDisplay}
//                     cursor='row-resize'
//                     resize={(e) => handleMouseDown(e, "vertical")}
//                 />
//                 <div className={styles.recent_games_section}>
//                     <RecentGamesSection leftPaneWidthPercentage={leftPaneWidthPercentage} recentChampionshipMatches={recentChampionshipMatches} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Chart;
