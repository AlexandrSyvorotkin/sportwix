import { setCurrentStepText, setMobileCurrentStepText, skipAll } from "../../redux/GuidelineRoadmapSlice/GuidelineRoadmapSlice"
import { switchActiveTeamDetailInfoTab, switchActiveSingleTeamInfoTab, switchActiveTeamDetailInfoTabMobile } from "../../redux/TeamTabsSlice/TeamTabsSlice"
import React from 'react'
import lozalizationText from '../../localization/guide-roadmap/guide-roadmap-text.json'
import stepsTextLocalization from '../../localization/guide-roadmap/guideline-roadmap.json'

const roadmapText = lozalizationText.roadmapText

export default (dispatch: any, language: any) => {

    const mobileSparkline = document.getElementById('mobile_sparkline')?.getBoundingClientRect()
    const mobileSparklineTeam = document.getElementById('mobile_sparkline_team+0')?.getBoundingClientRect()
    const mobileSparklineCoach = document.getElementById('mobile_sparkline_coach+0')?.getBoundingClientRect()
    const mobileSparklineInfo = document.getElementById('mobile_sparkline_info+0')?.getBoundingClientRect()
    const mobileBottomSection = document.getElementById('mobile_bottom_section')?.getBoundingClientRect()
    const candleChartAndSparklineContainer = document.getElementById('candle-chart-and-sparkline-container')?.getBoundingClientRect()
    const mobileLineChart = document.getElementById('mobile-line-chart')?.getBoundingClientRect()
    const lastGamesMobile = document.getElementById('last-matches-mobile')?.getBoundingClientRect()
    const nextGameMobile = document.getElementById('next-game-mobile')?.getBoundingClientRect()
    const filterBySeasons = document.getElementById('filter-by-season')?.getBoundingClientRect()
    const filterByHomeAwayGames = document.getElementById('filter-by-homeaway-games')?.getBoundingClientRect()
    const filterByTimes = document.getElementById('filter-by-times')?.getBoundingClientRect()
    const filterByGoals = document.getElementById('filter-by-goals')?.getBoundingClientRect()
    const expandBtn = document.getElementById('expand-btn')?.getBoundingClientRect()
    const singleTeamInfoTabsHeader = document.getElementById('single_team-info-tabs-header')
    const mobile_sparkline = document.getElementById('mobile_sparkline')
    const resetInterface = document.getElementById('reset-interface')?.getBoundingClientRect()

    return (
        [
            // sparkline
            {
                element: mobileSparkline,
                content: <p>{language === 'Eng' ? roadmapText.sparkline.eng : roadmapText.sparkline.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'bottom-mobile',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 1 / 7`))
                }
            },
            // team
            {
                element: mobileSparklineTeam,
                content: <p>{language === 'Eng' ? roadmapText.team.eng : roadmapText.team.ru}</p>,
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
                    dispatch(setMobileCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 2 / 7`))
                }
            },
            // coach
            {
                element: mobileSparklineCoach,
                content: <p>{language === 'Eng' ? roadmapText.coach.eng : roadmapText.coach.ru}</p>,
                position: {
                    guideElement: {
                        top: 5,
                        left: 5,
                        width: 10,
                        height: 10
                    }
                },
                textPos: 'bottom-mobile-sparkline',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 3 / 7`))
                }
            },
            // team name
            {
                element: mobileSparklineInfo,
                content: <p>{language === 'Eng' ? roadmapText.teamName.eng : roadmapText.teamName.ru}</p>,
                position: {
                    guideElement: {
                        top: 5,
                        left: 5,
                        width: 10,
                        height: 10
                    }
                },
                textPos: 'bottom-team-mobile',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 4 / 7`))
    
                }
            },
            // {
            //     element: mobileLineChart,
            //     triangle: 'top',
            //     text: roadmapText.lineChart,
            //     position: {
            //         guideElement: {
            //             top: 5,
            //             left: 5,
            //             width: 10,
            //             height: 10
            //         }
            //     },
            //     textPos: 'bottom',
            //     callback: () => {
            //         dispatch(setMobileCurrentStepText('1.Work with championship 5 / 16'))
            //         if (mobile_sparkline) {
            //             mobile_sparkline.scrollLeft += 80;
            //         }
            //     }
            // },
            // {
            //     element: lastGamesMobile,
            //     triangle: 'bottom',
            //     text: roadmapText.lastGames,
            //     position: {
            //         guideElement: {
            //             top: 5,
            //             left: 5,
            //             width: 10,
            //             height: 10
            //         }
            //     },
            //     textPos: 'top',
            //     callback: () => {
            //         dispatch(setMobileCurrentStepText('1.Work with championship 6 / 16'))
            //         if (mobile_sparkline) {
            //             mobile_sparkline.scrollLeft += 100;
            //         }
            //     }
            // },
            // {
            //     element: nextGameMobile,
            //     triangle: 'bottom',
            //     text: roadmapText.nextGame,
            //     position: {
            //         guideElement: {
            //             top: 5,
            //             left: 5,
            //             width: 10,
            //             height: 10
            //         }
            //     },
            //     textPos: 'top',
            //     callback: () => {
            //         dispatch(setMobileCurrentStepText('1.Work with championship 7 / 16'))
            //         if (mobile_sparkline) {
            //             mobile_sparkline.scrollLeft += 130;
            //         }
            //     }
            // },
            // news 
            {
                element: mobileBottomSection,
                content: <p>{language === 'Eng' ? roadmapText.allNews.eng : roadmapText.allNews.ru}</p>,
                position: {
                    guideElement: {
                        top: 5,
                        left: 5,
                        width: 10,
                        height: 10
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 5 / 7`))
                }
            },
            // list games
            {
                element: mobileBottomSection,
                content: <p>{language === 'Eng' ? roadmapText.listGames.eng : roadmapText.listGames.ru}</p>,
                position: {
                    guideElement: {
                        top: 5,
                        left: 5,
                        width: 10,
                        height: 10
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 6 / 7`))
                    dispatch(switchActiveTeamDetailInfoTabMobile(2))
                }
            },
            // select team
            {
                element: mobileSparklineTeam,
                content: <p>{language === 'Eng' ? roadmapText.selectTeamMobile.eng : roadmapText.selectTeamMobile.ru}</p>,
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
                    dispatch(setMobileCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 7 / 7`))
                    if (mobile_sparkline) {
                        mobile_sparkline.scrollLeft = 0;
                    }
                }
            },
            // chart
            {
                element: candleChartAndSparklineContainer,
                content: <p>{language === 'Eng' ? roadmapText.candleChart.eng : roadmapText.candleChart.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'bottom-mobile',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 1 / 19`))
                }
            },
            // expand btn
            {
                element: expandBtn,
                content: <p>{language === 'Eng' ? roadmapText.expandBtn.eng : roadmapText.expandBtn.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'mobile-control-btn',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 2 / 19`))
                }
            },
            // reset interface
            {
                element: resetInterface,
                content: <p>{language === 'Eng' ? roadmapText.sparkline.eng : roadmapText.sparkline.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'mobile-control-btn',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 3 / 19`))
                }
            },
            // filter by seasons
            {
                element: filterBySeasons,
                content: <p>{language === 'Eng' ? roadmapText.filterBySeasos.eng : roadmapText.filterBySeasos.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'mobile-control-btn',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 4 / 19`))
                }
            },
            // filter by home away games
            {
                element: filterByHomeAwayGames,
                content: <p>{language === 'Eng' ? roadmapText.filterByHomeAwayGames.eng : roadmapText.filterByHomeAwayGames.ru}</p>,
                position: {
                },
                textPos: 'mobile-control-btn',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 5 / 19`))
                }
            },
            // filter by times
            {
                element: filterByTimes,
                content: <p>{language === 'Eng' ? roadmapText.filterByTimes.eng : roadmapText.filterByTimes.ru}</p>,
                position: {
                },
                textPos: 'mobile-control-btn',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 6 / 19`))
                }
            },
            // filter by goals
            {
                element: filterByGoals,
                content: <p>{language === 'Eng' ? roadmapText.filterByGoals.eng : roadmapText.filterByGoals.ru}</p>,
                position: {
                },
                textPos: 'mobile-control-btn',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 7 / 19`))
                }
            },
            // news
            {
                element: mobileBottomSection,
                content: <p>{language === 'Eng' ? roadmapText.news.eng : roadmapText.news.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 8 / 19`))
                }
            },
            //recent games
            {
                element: mobileBottomSection,
                content: <p>{language === 'Eng' ? roadmapText.recentGames.eng : roadmapText.recentGames.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 9 / 19`))
                    dispatch(switchActiveTeamDetailInfoTab(8))
                }
            },
            // achievements
            {
                element: mobileBottomSection,
                content: <p>{language === 'Eng' ? roadmapText.achievements.eng : roadmapText.achievements.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 10 / 19`))
                    dispatch(switchActiveTeamDetailInfoTab(2))
                }
            },
            // kits
            {
                element: mobileBottomSection,
                content: <p>{language === 'Eng' ? roadmapText.kits.eng : roadmapText.kits.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 11 / 19`))
                    dispatch(switchActiveSingleTeamInfoTab(2))
                }
            },
            // sponsors
            {
                element: mobileBottomSection,
                content: <p>{language === 'Eng' ? roadmapText.sponsors.eng : roadmapText.sponsors.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 12 / 19`))
                    dispatch(switchActiveSingleTeamInfoTab(3))
                }
            },
            // club recors
            {
                element: mobileBottomSection,
                content: <p>{language === 'Eng' ? roadmapText.clubRecords.eng : roadmapText.clubRecords.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 13 / 19`))
                    dispatch(switchActiveSingleTeamInfoTab(4))
                    if (singleTeamInfoTabsHeader) {
                        singleTeamInfoTabsHeader.scrollLeft += 20;
                    }
                }
            },
            // player records
            {
                element: mobileBottomSection,
                content: <p>{language === 'Eng' ? roadmapText.playerRecords.eng : roadmapText.playerRecords.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 14 / 19`))
                    dispatch(switchActiveSingleTeamInfoTab(5))
                    if (singleTeamInfoTabsHeader) {
                        singleTeamInfoTabsHeader.scrollLeft += 60;
                    }
                }
            },
            // facts
            {
                element: mobileBottomSection,
                content: <p>{language === 'Eng' ? roadmapText.facts.eng : roadmapText.facts.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 15 / 19`))
                    dispatch(switchActiveSingleTeamInfoTab(6))
                    if (singleTeamInfoTabsHeader) {
                        singleTeamInfoTabsHeader.scrollLeft += 80;
                    }
                }
            },
            // team seasons table
            {
                element: mobileBottomSection,
                content: <p>{language === 'Eng' ? roadmapText.teamSeasonsTable.eng : roadmapText.teamSeasonsTable.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 16 / 19`))
                    dispatch(switchActiveTeamDetailInfoTab(3))
                }
            },
            // team stats table
            {
                element: mobileBottomSection,
                triangle: 'bottom',
                content: <p>{language === 'Eng' ? roadmapText.teamStatsTable.eng : roadmapText.teamStatsTable.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 17 / 19`))
                    dispatch(switchActiveTeamDetailInfoTab(4))
                }
            },
            // field 
            {
                element: mobileBottomSection,
                triangle: 'bottom',
                content: <p>{language === 'Eng' ? roadmapText.footballFieldStats.eng : roadmapText.footballFieldStats.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 18 / 19`))
                    dispatch(switchActiveTeamDetailInfoTab(5))
                }
            },
            // calendar
            {
                element: mobileBottomSection,
                triangle: 'bottom',
                content: <p>{language === 'Eng' ? roadmapText.teamCalendar.eng : roadmapText.teamCalendar.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`2.${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 19 / 19`))
                    dispatch(switchActiveTeamDetailInfoTab(6))
                }
            },
            // last games
            {
                element: mobileBottomSection,
                triangle: 'bottom',
                content: <p>{language === 'Eng' ? roadmapText.lastGamesSection.eng : roadmapText.lastGamesSection.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`3.${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 1 / 5`))
                    dispatch(switchActiveTeamDetailInfoTab(8))
                }
            },
            // last games
            {
                element: mobileBottomSection,
                triangle: 'bottom',
                content: <p>{language === 'Eng' ? roadmapText.lastGamesSection.eng : roadmapText.lastGamesSection.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`3.${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 2 / 5`))
    
                }
            },
            // two candles
            {
                element: candleChartAndSparklineContainer,
                triangle: 'top',
                content: <p>{language === 'Eng' ? roadmapText.twoCandleStickCharts.eng : roadmapText.twoCandleStickCharts.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'bottom-mobile',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`3.${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 3 / 5`))
                }
            },
            // team stats two teams
            {
                element: mobileBottomSection,
                triangle: 'bottom',
                content: <p>{language === 'Eng' ? roadmapText.teamStatsTwoTeams.eng : roadmapText.teamStatsTwoTeams.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`3.${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 4 / 5`))
                    dispatch(switchActiveTeamDetailInfoTab(4))
                },
            },
            // football field two team
            {
                element: mobileBottomSection,
                triangle: 'bottom',
                content: <p>{language === 'Eng' ? roadmapText.footballFieldTwoTeam.eng : roadmapText.footballFieldTwoTeam.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setMobileCurrentStepText(`3.${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 5 / 5`))
                    dispatch(switchActiveTeamDetailInfoTab(5))
                },
            },
            // reset interface
            {
                element: resetInterface,
                triangle: 'mobile-control-btn',
                content: <p>{language === 'Eng' ? roadmapText.resetInterface.eng : roadmapText.resetInterface.ru}</p>,
                position: {
                    guideElement: {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    }
                },
                textPos: 'mobile-control-btn',
                callback: () => {
                    dispatch(setMobileCurrentStepText(''))
                },
            },
    
        ]
    )
}