import { ITeam } from '../../models/ITeam';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import MainBtn from '../../ui/Buttons/MainBtn/MainBtn';
import TabBtn from '../../ui/Buttons/TabBtn/TabBtn';
import styles from './GuideLineRoadmap.module.scss';
import { FC, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_VARIABLES } from '../../api/variables'; import { switchActiveSingleTeamInfoTab, switchActiveTeamDetailInfoTab, switchActiveTeamDetailInfoTabMobile } from '../../redux/TeamTabsSlice/TeamTabsSlice';
import { RootState } from '../../redux/store';
import { candleChart } from '../../Charts/CandleChart/candleChart';
import { lineChart } from '../../Charts/LineChart/LineChart';
import { setLoadingTrue, addCandlesNew, addSeasons, setLoadingFalse } from '../../redux/candle-slice/candle-slice';
import GuidelineRoadmapTipElement from '../GuildelineRoadmapTipElement/GuidelineRoadmapTipElement';
import lozalizationText from '../../localization/guide-roadmap/guide-roadmap-text.json'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { nextStep, prevStep, skipAll, setCurrentStepText, disableGuidelineMode, disableRoadmap, setMobileCurrentStepText } from '../../redux/GuidelineRoadmapSlice/GuidelineRoadmapSlice';
import stepsTextLocalization from '../../localization/guide-roadmap/guideline-roadmap.json'
import InteractiveRoadmapOption from '../InteractiveRoadmapOption/InteractiveRoadmapOption';
import GuidelineModal from '../../ui/modals/GuidelineModal/GuidelineModal';
import DesktopRoadmapSteps from './DesktopRoadmap';
import MobileRoadmapSteps from './MobileRoadmap'
import { useFetchChampionshipInfoQuery } from '../../services/championships-api/championship-api';
import { switchPageToStartPostition, switchToSingleCandleChart, switchToDoubleCandleCharts, chooseFirstTeam, chooseSecondTeam } from '../../redux/tournament-slice/tournament-slice';


interface GuidleRoadmapProps {
    setIsShowGuideline: any,
    isShowGuideline: boolean

}

interface GuidelineStep {
    component: JSX.Element;
}

const GuidleRoadmap: FC<GuidleRoadmapProps> = ({ setIsShowGuideline, isShowGuideline }) => {
    const dispatch = useAppDispatch()

    const guidelineRoadmap = useAppSelector((state: RootState) => state.guidelineRoadmap)

    const {championshipId, season} = useAppSelector(state => state.tournamentSlice)
    const {data} = useFetchChampionshipInfoQuery({championshipId, season})

    const teams = data?.teams
    const { BASE_PATH, API, V1, EVENT, TEAM } = API_VARIABLES
    const filterTeams = teams?.filter((team: ITeam) => !team.is_event)
    const selectedTeam = filterTeams?.find((team: ITeam) => team.team_name === 'Manchester United')
    const selectedMobileTeam = filterTeams?.find((team: ITeam) => team.team_name === 'Liverpool')
    const orientation = useAppSelector((state: RootState) => state.interfaceState.mobile)

    const [isInteractive, setIsInteractive] = useState<boolean>(false)

    const handleSkipAll = () => {
        dispatch(switchActiveTeamDetailInfoTab(1))
        dispatch(switchActiveSingleTeamInfoTab(1))
        dispatch(switchPageToStartPostition())
        dispatch(disableGuidelineMode())
        dispatch(disableRoadmap())
        dispatch(skipAll('desktop'))// Переходим к последнему шагу (пропускаем все)

    };
    const { language } = useContext(LanguageContext)


    useEffect(() => {
        switch (guidelineRoadmap.currentDesktopStep) {
            case 13: if (selectedTeam) fetchSingleTeamInfoData(selectedTeam)
                break;
            case 35: fetchDoubeTeamInfoData()
                break;;
            case 39: setCurrentStepText('')
                break
            case 41: handleSkipAll()
        }
    }, [guidelineRoadmap.currentDesktopStep])




    useEffect(() => {
        switch (guidelineRoadmap.currentMobileStep) {
            case 0:
                dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 1 / 7`))
                dispatch(switchActiveTeamDetailInfoTab(1))
                dispatch(switchPageToStartPostition())
                dispatch(skipAll('mobile'))
                break;
            
            case 7: if (selectedMobileTeam) fetchSingleTeamInfoData(selectedMobileTeam)
                break;
            case 27: fetchDoubeTeamInfoData()
                break;
            case 32: handleSkipAll()
                break;
        }
    }, [guidelineRoadmap.currentMobileStep])


    const selectTeamHandler = () => {
        if (selectedTeam) fetchSingleTeamInfoData(selectedTeam)
    }

    function fetchSingleTeamInfoData(team: ITeam) {

        dispatch(setLoadingTrue())
        dispatch(switchToSingleCandleChart())
        dispatch(chooseFirstTeam(team))

        axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${team.team_uuid}/${EVENT}/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=false`).then((response => {
            // dispatch(filterByTimesRedux('Полный матч'))  
            dispatch(addCandlesNew({ type: 'firstSelectedTeam', candles: response.data.candles }))
            dispatch(addSeasons({ type: 'firstSelectedTeam', saeasons: response.data.seasons }))
            // console.log(response)

        })).finally(() => {
            dispatch(setLoadingFalse())
        })
    }



    // 
    const homeTeam = data?.teams.find((team: ITeam) => team.team_name === 'Tottenham Hotspur')
    const awayTeam = data?.teams.find((team: ITeam) => team.team_name === 'West Ham United')

    // console.log(awayTeam)

    async function fetchDoubeTeamInfoData() {
        // const filteredTeams = teams.teams.filter((team:ITeam) => !team.is_event)
        dispatch(setLoadingTrue())
        // const filteredFirstTeam = filteredTeams?.find((team:ITeam) => team.team_uuid === teamPair?.home_team.uuid)
        // const filteredSecondTeam = filteredTeams?.find((team:ITeam) => team.team_uuid === teamPair?.away_team.uuid)
        if (homeTeam) dispatch(chooseFirstTeam(homeTeam))
        if (awayTeam) dispatch(chooseSecondTeam(awayTeam))
        
        try {
            const fisrtTeam = await axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${homeTeam?.team_uuid}/event/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=false`)
            const secondTeam = await axios.get(`${BASE_PATH}/${API}/${V1}/${TEAM}/${awayTeam?.team_uuid}/event/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=3&splited=false`)
            dispatch(addCandlesNew({ type: 'firstSelectedTeam', candles: fisrtTeam.data.candles }))
            dispatch(addCandlesNew({ type: 'secondSelectedTeam', candles: secondTeam.data.candles }))
            dispatch(addSeasons({ type: 'firstSelectedTeam', saeasons: fisrtTeam.data.seasons }))
            dispatch(addSeasons({ type: 'secondSelectedTeam', saeasons: secondTeam.data.seasons }))
            dispatch(switchToDoubleCandleCharts())
            dispatch(switchActiveTeamDetailInfoTab(1))
        } catch {
            // setError(true)
        } finally {
            dispatch(setLoadingFalse())
        }

    }


    const mobileGuidelineRoadmapSteps = MobileRoadmapSteps(dispatch, language)
    const desctopGuidelineRoadmapSteps = DesktopRoadmapSteps(dispatch, language)

    const mobileGuidelineSteps = mobileGuidelineRoadmapSteps.map(step => <GuidelineRoadmapTipElement
       
        position={step.position} content={step.content} element={step.element} textPos={step.textPos} callback={step.callback} test={true}
    />)

    const desctopGuidelineSteps = desctopGuidelineRoadmapSteps.map(step => <GuidelineRoadmapTipElement
        position={step.position} content={step.content} element={step.element} lastEl={step.lastEl} textPos={step.textPos} callback={step.callback} test={true}
    />)

    const desctopGuidelineStepsSpotlights = desctopGuidelineRoadmapSteps.map(step => <GuidelineRoadmapTipElement
        position={step.position} content={step.content} element={step.element} lastEl={step.lastEl} textPos={step.textPos} callback={step.callback} test={false}
    />)

    const mobileGuidelineStepsSpotlights = mobileGuidelineRoadmapSteps.map(step => <GuidelineRoadmapTipElement
        position={step.position} content={step.content} element={step.element}  textPos={step.textPos} callback={step.callback} test={false}
    />)

    // mix-blend-mode: hard-light;

    const mixBlenModeOverlayColor = guidelineRoadmap.isStartRoadmap ? 'hard-light' : 'normal'

    return (
        <>
            {guidelineRoadmap.isActive ?
                <>
                    <div className={styles.overlay} style={{ mixBlendMode: mixBlenModeOverlayColor }}>
                        {guidelineRoadmap.isStartRoadmap ?
                            <>
                                {orientation.isMobile ? <>{mobileGuidelineStepsSpotlights[guidelineRoadmap.currentMobileStep]}</> : <>{desctopGuidelineStepsSpotlights[guidelineRoadmap.currentDesktopStep]}</>}
                            </>
                            : null
                        }
                        {/* <div style={{ left: banner?.left, top: banner?.top, width: banner?.width, height: banner?.height}}>
                    </div> */}
                        {!guidelineRoadmap.isStartRoadmap ? <GuidelineModal /> : null}
                        {!guidelineRoadmap.isStartRoadmap || !guidelineRoadmap.isActive || guidelineRoadmap.currentDesktopStep === 40
                            ?
                            <>
                                {/* <div className={styles.guide_element} style={{top: tips?.top,left: tips?.left,width: tips?.width,height: tips?.height,}}>
                            <div className={styles.little_text} style={{left: '-55px'}}>{language === 'Eng' ? "Tips" : "Подсказки"}</div>
                            <div className={styles.triangle_right_little} />
                        </div> */}
                                {/* <div className={styles.guide_element} style={{ top: roadmap?.top, left: roadmap?.left, width: roadmap?.width, height: roadmap?.height, }}>
                                <div className={styles.little_text} style={{ left: '-93px' }}>{language === 'Eng' ? "Education" : "Обучение"}</div>
                                <div className={styles.triangle_right_little} />
                            </div> */}
                            </>
                            : null
                        }
                    </div>
                    {guidelineRoadmap.isStartRoadmap ?
                        <>
                            {orientation.isMobile ? <>{mobileGuidelineSteps[guidelineRoadmap.currentMobileStep]}</> : <>{desctopGuidelineSteps[guidelineRoadmap.currentDesktopStep]}</>}
                        </>
                        : null
                    }
                </>

                // <div className={styles.overlay} style={{mixBlendMode: 'hard-light'}}>
                //     <InteractiveRoadmapOption/>
                // </div>

                : null}
        </>
    )
}

export default GuidleRoadmap