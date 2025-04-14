import { FC, useContext, useEffect, useState } from 'react'
import styles from './InteractiveRoadmapOption.module.scss'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { setCurrentInteractivePath, setCurrentStepText, skipAll } from '../../redux/GuidelineRoadmapSlice/GuidelineRoadmapSlice'
import { switchActiveSingleTeamInfoTab, switchActiveTeamDetailInfoTab } from '../../redux/TeamTabsSlice/TeamTabsSlice'
import stepsTextLocalization from '../../localization/guide-roadmap/guideline-roadmap.json'
import lozalizationText from '../../localization/guide-roadmap/guide-roadmap-text.json'
import GuidelineRoadmapTipElement from '../GuildelineRoadmapTipElement/GuidelineRoadmapTipElement'
import axios from 'axios'
import { ITeam } from '../../models/ITeam'
import { setLoadingTrue, addCandlesNew, addSeasons, setLoadingFalse } from '../../redux/candle-slice/candle-slice'
import { API_VARIABLES } from '../../api/variables'
import { RootState } from '../../redux/store'
import { chooseFirstTeam, switchPageToStartPostition, switchToSingleCandleChart } from '../../redux/tournament-slice/tournament-slice'

interface InteractiveRoadmapOptionProps {

}

const InteractiveRoadmapOption: FC<InteractiveRoadmapOptionProps> = () => {

    const sparklineEl = document.getElementById('sparkline')?.getBoundingClientRect()
    const championshipTableEl = document.getElementById('championship-table')?.getBoundingClientRect()
    const fullTabs = document.getElementById('full-tabs')?.getBoundingClientRect()
    const recentGamesEL = document.getElementById('recent-games')?.getBoundingClientRect()

    const team = document.getElementById('team')?.getBoundingClientRect()
    const coach = document.getElementById('coach')?.getBoundingClientRect()
    const teamSparklineName = document.getElementById('team-sparkline-name')?.getBoundingClientRect()
    const seasonsBar = document.getElementById('season-bar')?.getBoundingClientRect()
    const lastGames = document.getElementById('last-games')?.getBoundingClientRect()
    const lineChart = document.getElementById('line-chart')?.getBoundingClientRect()
    const nextGame = document.getElementById('next-game')?.getBoundingClientRect()
    const selectTeam = document.getElementById('selected_team+Manchester United')?.getBoundingClientRect()

    const singleTeamInfo = document.getElementById('single-team-info')?.getBoundingClientRect()
    const newsTags = document.getElementById('news-tags')?.getBoundingClientRect()
    const teamCard = document.getElementById('team-card')?.getBoundingClientRect()
    const tabsEl = document.getElementById('tabs')?.getBoundingClientRect()


    const dispatch = useAppDispatch()

    const { language } = useContext(LanguageContext)


    const roadmapText = lozalizationText.roadmapText

    const [currentPath, setCurrentPath] = useState([])
    const [isGuideActive, setIsGuideActive] = useState<boolean>(false)

    console.log(isGuideActive)

    const chooseOptionPath = (path: string, pathElements: any) => {
        // setInteractiveRoadmap(prevState => ({ ...prevState, [path]: false }))
        setIsGuideActive(true)
        setCurrentPath(pathElements)
        //@ts-ignore
        dispatch(setCurrentInteractivePath(path))
    }

    const currentInteractiveStep = useAppSelector((state: RootState) => state.guidelineRoadmap.interactiveRoadpap.currentInteractivePathStep)

    // const teams = useAppSelector<ITeam[]>(state => state.teams.teams)
    const { BASE_PATH, API, V1, EVENT, TEAM } = API_VARIABLES 

    const sparklinePath = [
        // sparkline
        {
            element: sparklineEl,
            triangle: 'left',
            text: roadmapText.sparkline,
            position: {
                guideElement: {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                }
            },
            textPos: 'left',
            callback: () => {
                dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 1 / 12`))
                dispatch(switchActiveTeamDetailInfoTab(1))
                dispatch(switchPageToStartPostition())
                dispatch(skipAll('desktop'))
            }
        },
        // team
        {
            element: team,
            triangle: 'top',
            text: roadmapText.team,
            position: {
                guideElement: {
                    top: 5,
                    left: 5,
                    width: 10,
                    height: 10
                }
            },
            textPos: 'bottom',
            callback: () => {
                dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 2 / 12`))
            }
        },
        // coach
        {
            element: coach,
            triangle: 'top',
            text: roadmapText.coach,
            position: {
                guideElement: {
                    top: 5,
                    left: 5,
                    width: 10,
                    height: 10
                }
            },
            textPos: 'bottom',
            callback: () => {
                dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 3 / 12`))
            }
        },
        // team-name
        {
            element: teamSparklineName,
            triangle: 'top',
            text: roadmapText.teamName,
            position: {
                guideElement: {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                }
            },
            textPos: 'bottom',
            callback: () => {
                dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 4 / 12`))
            }
        },
        // season bar
        {
            element: seasonsBar,
            triangle: 'top',
            text: roadmapText.seasonDiagramm,
            position: {
                guideElement: {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                }
            },
            textPos: 'bottom',
            callback: () => {
                (dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 5 / 12`)))
            }
        },
        // line chart
        {
            element: lineChart,
            triangle: 'top',
            text: roadmapText.lineChart,
            position: {
                guideElement: {
                    top: 5,
                    left: 5,
                    width: 10,
                    height: 10
                }
            },
            textPos: 'bottom',
            callback: () => {
                dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 6 / 12`))
            }
        },
        // last games
        {
            element: lastGames,
            triangle: 'top',
            text: roadmapText.lastGames,
            position: {
                guideElement: {
                    top: 5,
                    left: 5,
                    width: 10,
                    height: 10
                }
            },
            textPos: 'bottom',
            callback: () => {
                dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 7 / 12`))
            }
        },
        // next games
        {
            element: nextGame,
            triangle: 'top',
            text: roadmapText.nextGame,
            position: {
                guideElement: {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                }
            },
            textPos: 'bottom',
            callback: () => {
                dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 8 / 12`))
            }
        },
        {
            element: nextGame,
            triangle: 'top',
            text: roadmapText.nextGame,
            position: {
                guideElement: {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                }
            },
            textPos: 'bottom',
            callback: () => {
                dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 8 / 12`))
                setIsGuideActive(false)
            }
        },
    ]

    const championshipPath = [
        // championship table
        {
            element: championshipTableEl,
            triangle: 'right',
            text: roadmapText.championshipTable,
            position: {
            },
            textPos: 'right',
            callback: () => {
                dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 12 / 12`))
            }

        },
        // select team
        {
            element: selectTeam,
            triangle: 'right',
            text: roadmapText.selectTeam,
            position: {
            },
            textPos: 'right',
            callback: () => {
                dispatch(setCurrentStepText(`${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 1 / 21`))
            }

        },
        {
            element: selectTeam,
            triangle: 'right',
            text: roadmapText.selectTeam,
            position: {
            },
            textPos: 'right',
            callback: () => {
                dispatch(setCurrentStepText(`${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 1 / 21`))
                setIsGuideActive(false)
            }

        },
    ]


    const informationTabs = [
        {
            element: fullTabs,
            triangle: 'left',
            text: roadmapText.tabs,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 9 / 12`))
            }
        },
        // news -tags
        {
            element: newsTags,
            triangle: 'left',
            text: roadmapText.newsTags,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 10 / 12`))
            }
        },
        {
            element: fullTabs,
            triangle: 'left',
            text: roadmapText.singleTeamInfo,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(switchActiveTeamDetailInfoTab(2))
                dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 11 / 21`))
            }
        },
        // {
        //     element: tabsEl,
        //     triangle: 'left',
        //     text: roadmapText.clubAndStadiumDescription,
        //     position: {
        //     },
        //     textPos: 'left',
        //     callback: () => {
        //         dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 12 / 21`))
        //     }
        // },
        // achievements
        {
            element: tabsEl,
            triangle: 'left',
            text: roadmapText.achievements,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(switchActiveSingleTeamInfoTab(1))
                dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 13 / 21`))
            }
        },
        // kits
        {
            element: tabsEl,
            triangle: 'left',
            text: roadmapText.kits,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(switchActiveSingleTeamInfoTab(2))
                dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 14 / 21`))
            }
        },
        // sponsors
        {
            element: tabsEl,
            triangle: 'left',
            text: roadmapText.sponsors,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(switchActiveSingleTeamInfoTab(3))
                dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 15 / 21`))
            }
        },
        // club records
        {
            element: tabsEl,
            triangle: 'left',
            text: roadmapText.clubRecords,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(switchActiveSingleTeamInfoTab(4))
                dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 16 / 21`))
            }
        },
        // player records
        {
            element: tabsEl,
            triangle: 'left',
            text: roadmapText.playerRecords,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(switchActiveSingleTeamInfoTab(5))
                dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 17 / 21`))
            }
        },
        // facts
        {
            element: tabsEl,
            triangle: 'left',
            text: roadmapText.facts,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(switchActiveTeamDetailInfoTab(2))
                dispatch(switchActiveSingleTeamInfoTab(6))
                dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 18 / 21`))
            }
        },
        // seasons table
        {
            element: tabsEl,
            triangle: 'left',
            text: roadmapText.teamSeasonsTable,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(switchActiveTeamDetailInfoTab(3))
                dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 19 / 21`))
            }
        },
        // team stats table
        {
            element: tabsEl,
            triangle: 'left',
            text: roadmapText.teamStatsTable,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(switchActiveTeamDetailInfoTab(4))
                dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 20 / 21`))
            }
        },
        // field
        {
            element: fullTabs,
            triangle: 'left',
            text: roadmapText.footballFieldStats,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(switchActiveTeamDetailInfoTab(5))
                dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 21 / 21`))
            }
        },
        // calendar
        {
            element: fullTabs,
            triangle: 'left',
            text: roadmapText.teamCalendar,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(switchActiveTeamDetailInfoTab(6))
                dispatch(setCurrentStepText(`3. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 1 / 6`))
            }
        },
        // calendar
        {
            element: fullTabs,
            triangle: 'left',
            text: roadmapText.teamCalendar,
            position: {
            },
            textPos: 'left',
            callback: () => {
                dispatch(switchActiveTeamDetailInfoTab(6))
                dispatch(setCurrentStepText(`3. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 1 / 6`))
                setIsGuideActive(false)
                dispatch(switchPageToStartPostition())
            }
        },
    ]

    const recentGames = [
        // select two teams
        {
            element: recentGamesEL,
            triangle: 'bottom',
            text: roadmapText.lastGamesSection,
            position: {
            },
            textPos: 'top',
            callback: () => {
                dispatch(setCurrentStepText(`3. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 2 / 6`))
            }
        },
        // select two teams
        {
            element: recentGamesEL,
            triangle: 'bottom',
            text: roadmapText.lastGamesSection,
            position: {
            },
            textPos: 'top',
            callback: () => {
                dispatch(setCurrentStepText(`3. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 3 / 6`))
                setIsGuideActive(false)
            }
        },
    ]

    const sparklineSteps = sparklinePath.map(step => <GuidelineRoadmapTipElement
        // @ts-ignore
        position={step.position} text={step.text} element={step.element} triangle={step.triangle} lastEl={step.lastEl} textPos={step.textPos} callback={step.callback}
    />)

    const championshipStep = championshipPath.map(step => <GuidelineRoadmapTipElement
        // @ts-ignore
        position={step.position} text={step.text} element={step.element} triangle={step.triangle} lastEl={step.lastEl} textPos={step.textPos} callback={step.callback}
    />)

    const informationTabsSteps = informationTabs.map(step => <GuidelineRoadmapTipElement
        // @ts-ignore
        position={step.position} text={step.text} element={step.element} triangle={step.triangle} lastEl={step.lastEl} textPos={step.textPos} callback={step.callback}
    />)

    const recentGamesSteps = recentGames.map(step => <GuidelineRoadmapTipElement
        // @ts-ignore
        position={step.position} text={step.text} element={step.element} triangle={step.triangle} lastEl={step.lastEl} textPos={step.textPos} callback={step.callback}
    />)

    // const filterTeams = teams.filter((team: ITeam) => !team.is_event)
    // const selectedTeam = filterTeams.find((team: ITeam) => team.team_name === 'Manchester United')

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

    const interactiveRoadmap = useAppSelector((state: RootState) => state.guidelineRoadmap.interactiveRoadpap)

    useEffect(() => {
        if (interactiveRoadmap.informationTabs.isActive) {
            //@ts-ignore
            fetchSingleTeamInfoData(selectedTeam)
        }
    }, [interactiveRoadmap.informationTabs.isActive])

    // console.log(currentInteractiveStep)



    console.log(currentPath)

    // console.log(interactiveRoadmap)

    return (
        <div>
            {isGuideActive ?
                [currentPath[currentInteractiveStep]]
                :
                <>
                    {interactiveRoadmap.sparkline.isActive ? null : 
                        <>
                        <div className={styles.option_text}>
                            {language === 'Eng' ? 'Choose option' : 'Выберите опцию'}
                        </div>
                        <div className={styles.option}
                            style={{ width: sparklineEl?.width, height: sparklineEl?.height, top: sparklineEl?.top, left: sparklineEl?.left }}
                            onClick={() => chooseOptionPath('sparkline', sparklineSteps)}>
                            <div className={styles.option_number}>1</div>
                            <div className={styles.title}><span>Sparkline</span></div>
                        </div>
                    </>
                    }
                    {interactiveRoadmap.championship.isActive ? null : 
                        <>
                        <div className={styles.option}
                            style={{ width: championshipTableEl?.width, height: championshipTableEl?.height, top: championshipTableEl?.top, left: championshipTableEl?.left }}
                            onClick={() => chooseOptionPath('championshipTable', championshipStep)}>
                            <div className={styles.option_number}>2</div>
                            <div className={styles.title}><span>Championship table</span></div>
                        </div>
                    </>
                    }
                    {interactiveRoadmap.informationTabs.isActive ? null : 
                        <>
                        <div className={styles.option}
                            style={{ width: fullTabs?.width, height: fullTabs?.height, top: fullTabs?.top, left: fullTabs?.left }}
                            onClick={() => chooseOptionPath('informationTabs', informationTabsSteps)}>
                            <div className={styles.option_number}>3</div>
                            <div className={styles.title}><span>Information tabs</span></div>
                        </div>
                    </> 
                    }
                    {interactiveRoadmap.recentGames.isActive ? null : 
                        <>
                        <div className={styles.option}
                            style={{ width: recentGamesEL?.width, height: recentGamesEL?.height, top: recentGamesEL?.top, left: recentGamesEL?.left }}
                            onClick={() => chooseOptionPath('recentGamesPath', recentGamesSteps)}>
                            <div className={styles.option_number}>4</div>
                            <div className={styles.title}><span>Recent games</span></div>
                        </div>
                    </>
                    }
                </>
            }
        </div>
    )
}

export default InteractiveRoadmapOption