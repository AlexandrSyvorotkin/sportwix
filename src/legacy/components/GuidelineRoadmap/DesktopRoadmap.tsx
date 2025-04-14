import { setCurrentStepText, skipAll } from "../../redux/GuidelineRoadmapSlice/GuidelineRoadmapSlice"
import { switchActiveTeamDetailInfoTab, switchActiveSingleTeamInfoTab } from "../../redux/TeamTabsSlice/TeamTabsSlice"
import React from 'react'
import lozalizationText from '../../localization/guide-roadmap/guide-roadmap-text.json'
import stepsTextLocalization from '../../localization/guide-roadmap/guideline-roadmap.json'
import { switchPageToStartPostition } from "../../redux/tournament-slice/tournament-slice"

const roadmapText = lozalizationText.roadmapText

export default (dispatch: any, language: any) => {

    const sparklineEl = document.getElementById('sparkline')?.getBoundingClientRect()
    const team = document.getElementById('team')?.getBoundingClientRect()
    const coach = document.getElementById('coach')?.getBoundingClientRect()
    const teamSparklineName = document.getElementById('team-sparkline-name')?.getBoundingClientRect()
    const seasonsBar = document.getElementById('season-bar')?.getBoundingClientRect()
    const lastGames = document.getElementById('last-games')?.getBoundingClientRect()
    const lineChart = document.getElementById('line-chart')?.getBoundingClientRect()
    const nextGame = document.getElementById('next-game')?.getBoundingClientRect()
    // 2 раздел
    const tabsEl = document.getElementById('tabs')?.getBoundingClientRect()
    const recentGamesEL = document.getElementById('recent-games')?.getBoundingClientRect()
    const championshipTableEl = document.getElementById('championship-table')?.getBoundingClientRect()

    // 3 раздел
    const selectTeam = document.getElementById('selected_team+Manchester United')?.getBoundingClientRect()
    const candleChart = document.getElementById('candle-chart')?.getBoundingClientRect()
    const candleChartPanel = document.getElementById('candle-chart-panel-section')?.getBoundingClientRect()
    const filterBySeasons = document.getElementById('filter-by-season')?.getBoundingClientRect()
    const filterByHomeAwayGames = document.getElementById('filter-by-homeaway-games')?.getBoundingClientRect()
    const filterByTimes = document.getElementById('filter-by-times')?.getBoundingClientRect()
    const filterByGoals = document.getElementById('filter-by-goals')?.getBoundingClientRect()
    const fullTabs = document.getElementById('full-tabs')?.getBoundingClientRect()

    const teamCard = document.getElementById('team-card')?.getBoundingClientRect()
    const singleTeamInfo = document.getElementById('single-team-info')?.getBoundingClientRect()
    const newsTags = document.getElementById('news-tags')?.getBoundingClientRect()
    const expandBtn = document.getElementById('expand-btn')?.getBoundingClientRect()
    const resetInterface = document.getElementById('reset-interface')?.getBoundingClientRect()
    const tips = document.getElementById('tips')?.getBoundingClientRect()
    const roadmap = document.getElementById('user-guide')?.getBoundingClientRect()


    return (
        [
            // sparkline
            {
                element: sparklineEl,
                text: roadmapText.sparkline,
                content: <p>{language === 'Eng' ? roadmapText.sparkline.eng : roadmapText.sparkline.ru}</p>,
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
                content: <p>{language === 'Eng' ? roadmapText.team.eng : roadmapText.team.ru}</p>,
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
                content: <p>{language === 'Eng' ? roadmapText.coach.eng : roadmapText.coach.ru}</p>,
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
                content: <p>{language === 'Eng' ? roadmapText.teamName.eng : roadmapText.teamName.ru}</p>,
                textPos: 'bottom',
                callback: () => {
                    dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 4 / 12`))
                }
            },
            // season bar
            {
                element: seasonsBar,
                content: <p>{language === 'Eng' ? roadmapText.seasonDiagramm.eng : roadmapText.seasonDiagramm.ru}</p>,
                textPos: 'bottom',
                callback: () => {
                    (dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 5 / 12`)))
                }
            },
            // line chart
            {
                element: lineChart,
                content: <p>{language === 'Eng' ? roadmapText.lineChart.eng : roadmapText.lineChart.ru}</p>,
                textPos: 'bottom',
                callback: () => {
                    dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 6 / 12`))
                }
            },
            // last games
            {
                element: lastGames,
                content: <p>{language === 'Eng' ? roadmapText.lastGames.eng : roadmapText.lastGames.ru}</p>,
                textPos: 'bottom',
                callback: () => {
                    dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 7 / 12`))
                }
            },
            // next games
            {
                element: nextGame,
                content: <p>{language === 'Eng' ? roadmapText.nextGame.eng : roadmapText.nextGame.ru}</p>,
                textPos: 'bottom',
                callback: () => {
                    dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 8 / 12`))
                }
            },
            // tabs
            {
                element: tabsEl,
                content: <p>{language === 'Eng' ? roadmapText.tabs.eng : roadmapText.tabs.ru}</p>,
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
                content: <p>{language === 'Eng' ? roadmapText.newsTags.eng : roadmapText.newsTags.ru}</p>,
                position: {
                },
                textPos: 'desktop-control-btn',
                callback: () => {
                    dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 10 / 12`))
                }
            },
            // recent games
            {
                element: recentGamesEL,
                content: <p>{language === 'Eng' ? roadmapText.recentGames.eng : roadmapText.recentGames.ru}</p>,
                position: {
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setCurrentStepText(`1.${language === 'Eng' ? stepsTextLocalization.steps['work-with-championship'].eng : stepsTextLocalization.steps['work-with-championship'].ru} 11 / 12`))
                }
            },
            // championship table
            {
                element: championshipTableEl,
                content: <p>{language === 'Eng' ? roadmapText.championshipTable.eng : roadmapText.championshipTable.ru}</p>,
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
                content: <p>{language === 'Eng' ? roadmapText.selectTeam.eng : roadmapText.selectTeam.ru}</p>,
                position: {
                },
                textPos: 'right',
                callback: () => {
                    dispatch(setCurrentStepText(`${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 1 / 21`))
                }

            },
            // cancdle chart
            {
                element: candleChart,
                content: <p>{language === 'Eng' ? roadmapText.candleChart.eng : roadmapText.candleChart.ru}</p>,
                position: {
                },
                textPos: 'left',
                callback: () => {
                    dispatch(setCurrentStepText(` 2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 2 / 21`))
                }
            },
            // work panel
            {
                element: candleChartPanel,
                content: <p>{language === 'Eng' ? roadmapText.workPanel.eng : roadmapText.workPanel.ru}</p>,
                position: {
                },
                textPos: 'left',
                callback: () => {
                    dispatch(setCurrentStepText(` 2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 3 / 21`))
                }
            },
            //expand btn
            {
                element: expandBtn,
                content: <p>{language === 'Eng' ? roadmapText.expandBtn.eng : roadmapText.expandBtn.ru}</p>,
                position: {
                },
                textPos: 'desktop-control-btn',
                callback: () => {
                    dispatch(setCurrentStepText(` 2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 4 / 21`))
                }
            },
            // to sparkline
            {
                element: resetInterface,
                content: <p>{language === 'Eng' ? roadmapText.sparkline.eng : roadmapText.sparkline.ru}</p>,
                position: {
                },
                textPos: 'desktop-control-btn',
                callback: () => {
                    dispatch(setCurrentStepText(` 2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 5 / 21`))
                }
            },
            // filter by seasons
            {
                element: filterBySeasons,
                content: <p>{language === 'Eng' ? roadmapText.filterBySeasos.eng : roadmapText.filterBySeasos.ru}</p>,
                position: {
                },
                textPos: 'desktop-control-btn',
                callback: () => {
                    dispatch(setCurrentStepText(` 2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 6 / 21`))
                }
            },
            // filter by home away games
            {
                element: filterByHomeAwayGames,
                content: <p>{language === 'Eng' ? roadmapText.filterByHomeAwayGames.eng : roadmapText.filterByHomeAwayGames.ru}</p>,
                position: {
                },
                textPos: 'desktop-control-btn',
                callback: () => {
                    dispatch(setCurrentStepText(` 2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 7 / 21`))
                }
            },
            // filter by times
            {
                element: filterByTimes,
                content: <p>{language === 'Eng' ? roadmapText.filterByTimes.eng : roadmapText.filterByTimes.ru}</p>,
                position: {
                },
                textPos: 'desktop-control-btn',
                callback: () => {
                    dispatch(setCurrentStepText(` 2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 8 / 21`))
                }
            },
            // filter by goals
            {
                element: filterByGoals,
                content: <p>{language === 'Eng' ? roadmapText.filterByGoals.eng : roadmapText.filterByGoals.ru}</p>,
                position: {
                },
                textPos: 'desktop-control-btn',
                callback: () => {
                    dispatch(setCurrentStepText(` 2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 9 / 21`))
                }
            },
            // full tabs
            {
                element: fullTabs,
                content: <p>{language === 'Eng' ? roadmapText.news.eng : roadmapText.news.ru}</p>,
                position: {
                },
                textPos: 'left',
                callback: () => {
                    dispatch(switchActiveTeamDetailInfoTab(1))
                    dispatch(setCurrentStepText(` 2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 10 / 21`))
                }
            },
            // full tabs
            {
                element: fullTabs,
                content: <p>{language === 'Eng' ? roadmapText.singleTeamInfo.eng : roadmapText.singleTeamInfo.ru}</p>,
                position: {
                },
                textPos: 'left',
                callback: () => {
                    dispatch(switchActiveTeamDetailInfoTab(2))
                    dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 11 / 21`))
                }
            },
            // staduim
            {
                element: teamCard,
                content: <p>{language === 'Eng' ? roadmapText.clubAndStadiumDescription.eng : roadmapText.clubAndStadiumDescription.ru}</p>,
                position: {
                },
                textPos: 'left',
                callback: () => {
                    dispatch(setCurrentStepText(`2. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-selected-team'].eng : stepsTextLocalization.steps['work-with-selected-team'].ru} 12 / 21`))
                }
            },
            // achievements
            {
                element: singleTeamInfo,
                content: <p>{language === 'Eng' ? roadmapText.achievements.eng : roadmapText.achievements.ru}</p>,
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
                element: singleTeamInfo,
                content: <p>{language === 'Eng' ? roadmapText.kits.eng : roadmapText.kits.ru}</p>,
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
                element: singleTeamInfo,
                content: <p>{language === 'Eng' ? roadmapText.sponsors.eng : roadmapText.sponsors.ru}</p>,
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
                element: singleTeamInfo,
                content: <p>{language === 'Eng' ? roadmapText.clubRecords.eng : roadmapText.clubRecords.ru}</p>,
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
                element: singleTeamInfo,
                content: <p>{language === 'Eng' ? roadmapText.playerRecords.eng : roadmapText.playerRecords.ru}</p>,
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
                element: singleTeamInfo,
                content: <p>{language === 'Eng' ? roadmapText.facts.eng : roadmapText.facts.ru}</p>,
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
                element: fullTabs,
                content: <p>{language === 'Eng' ? roadmapText.teamSeasonsTable.eng : roadmapText.teamSeasonsTable.ru}</p>,
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
                element: fullTabs,
                content: <p>{language === 'Eng' ? roadmapText.teamStatsTable.eng : roadmapText.teamStatsTable.ru}</p>,
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
                content: <p>{language === 'Eng' ? roadmapText.footballFieldStats.eng : roadmapText.footballFieldStats.ru}</p>,
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
                content: <p>{language === 'Eng' ? roadmapText.teamCalendar.eng : roadmapText.teamCalendar.ru}</p>,
                position: {
                },
                textPos: 'left',
                callback: () => {
                    dispatch(switchActiveTeamDetailInfoTab(6))
                    dispatch(setCurrentStepText(`3. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 1 / 6`))
                }
            },
            // select two teams
            {
                element: recentGamesEL,
                content: <p>{language === 'Eng' ? roadmapText.lastGamesSection.eng : roadmapText.lastGamesSection.ru}</p>,
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
                content: <p>{language === 'Eng' ? roadmapText.lastGamesSection.eng : roadmapText.lastGamesSection.ru}</p>,
                position: {
                },
                textPos: 'top',
                callback: () => {
                    dispatch(setCurrentStepText(`3. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 3 / 6`))
                }
            },
            // two candles charts
            {
                element: candleChart,
                content: <p>{language === 'Eng' ? roadmapText.twoCandleStickCharts.eng : roadmapText.twoCandleStickCharts.ru}</p>,
                position: {
                },
                textPos: 'left',
                callback: () => {

                    dispatch(setCurrentStepText(`3. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 4 / 6`))
                }
            },
            // two teams stats
            {
                element: fullTabs,
                content: <p>{language === 'Eng' ? roadmapText.teamStatsTwoTeams.eng : roadmapText.teamStatsTwoTeams.ru}</p>,
                position: {
                },
                textPos: 'left',
                callback: () => {
                    dispatch(switchActiveTeamDetailInfoTab(4))
                    dispatch(setCurrentStepText(`3. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 5 / 6`))
                }
            },
            // two teams field
            {
                element: fullTabs,
                content: <p>{language === 'Eng' ? roadmapText.footballFieldTwoTeam.eng : roadmapText.footballFieldTwoTeam.ru}</p>,
                position: {
                },
                textPos: 'left',
                callback: () => {
                    dispatch(switchActiveTeamDetailInfoTab(5))
                    dispatch(setCurrentStepText(`3. ${language === 'Eng' ? stepsTextLocalization.steps['work-with-two-selected-teams'].eng : stepsTextLocalization.steps['work-with-two-selected-teams'].ru} 6 / 6`))
                }
            },
            // select any team
            {
                element: championshipTableEl,
                content: <p>{language === 'Eng' ? roadmapText.selectAnyTeam.eng : roadmapText.selectAnyTeam.ru}</p>,
                position: {
                },
                textPos: 'right'
            },
            // last el
            {
                element: resetInterface,
                content: <p>{language === 'Eng' ? roadmapText.resetInterface.eng : roadmapText.resetInterface.ru}</p>,
                position: {
                },
                textPos: 'desktop-control-btn',
                lastEl: true
            },
            // {
            //     element: resetInterface,
            //     element1: tips,
            //     elenemt: roadmap,
            //     content: '',
            //     position: {
            //     },
            //     lastEl: true,
            //     textPos: 'right',
            // }
        ]
    )
}