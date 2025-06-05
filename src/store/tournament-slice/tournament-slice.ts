import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITeam } from "../../models/ITeam";
import { ILastMatch } from "../../models/ILastMatch";
import { TimeFrameMetrics } from "@types/types";

interface Tournament {
    teams: ITeam[],
    last_matches: ILastMatch[],
    grid?: any
}

type initialStateType = {
    tournament: Tournament | null,
    isNationalTournament: boolean | null
    isCupTournament: boolean | null
    isSingleTeamView: boolean, 
    isDoubleTeamView: boolean,
    firstSelectedTeam: ITeam | null,
    secondSelectedTeam: ITeam | null,
    championshipId: string,
    season: string,
    firstSelectedTeamUuid: string,
    filters: {
        candleChartFilters: {
            currentSeasonsAmount: number,
            spliteType: boolean
        },
        stat_metrics: {
            firstTeamMetrics: TimeFrameMetrics | null,
            secondTeamMetrics: TimeFrameMetrics | null,
            timeFrame: '1 тайм' | '2 тайм' | 'Полный матч',
            gameFrame: '1 game' | '3 games' | '5 games' | '4 games' | '10 games' | '15 games' | 'Season'
        }
    },
    h2h: {
        isH2h: {
            field: boolean,
            teamTable: boolean
        },
        fieldParams: {
            firstTeamH2h: any,
            secondTeamH2h: any
        },
        teamStatsTable: any
    },
}



const initialState: initialStateType = {
    tournament: {
        teams: [],
        last_matches: [],
        grid: null
    },
    firstSelectedTeam: null,
    secondSelectedTeam: null,
    isSingleTeamView: false, 
    isDoubleTeamView: false,
    isCupTournament: null,
    firstSelectedTeamUuid: '',
    isNationalTournament: false,
    championshipId: '',
    season: '',
    filters: {
        candleChartFilters: {
            currentSeasonsAmount: 3,
            spliteType: false
        },
        stat_metrics: {
            firstTeamMetrics: null,
            secondTeamMetrics: null,
            timeFrame: 'Полный матч',
            gameFrame: '1 game'
        }
    },
    h2h: {
        isH2h: {
            field: false,
            teamTable: false
        },
        fieldParams: {
            firstTeamH2h: null,
            secondTeamH2h: null
        },
        teamStatsTable: {
            firstTeamH2h: null,
            secondTeamH2h: null
        }
    }
}

const tournamentSlice = createSlice({
    name: 'tournmanet',
    initialState,
    reducers: {
        getTournamentData(state, action: PayloadAction<Tournament>) {
            state.tournament = action.payload
        },
        changeTournamentType(state) {
            state.isNationalTournament = true
        },
        setCurrentChampionshipIdAndSeason(state, action: PayloadAction<{championshipId: string, season: string}>) {
            state.championshipId = action.payload.championshipId;
            state.season = action.payload.season;
        },
        switchPageToStartPostition(state) {
            state.isSingleTeamView = false
            state.isDoubleTeamView = false
        },
        switchToDoubleCandleCharts(state) {
            state.isSingleTeamView = false
            state.isDoubleTeamView = true
        },
        switchToSingleCandleChart(state) {
            state.isSingleTeamView = true
            state.isDoubleTeamView = false
        },
        setCurrentSeasonsAmount(state, action: PayloadAction<number>) {
            state.filters.candleChartFilters.currentSeasonsAmount = action.payload
        },
        setSpliteType(state, action: PayloadAction<boolean>) {
            state.filters.candleChartFilters.spliteType = action.payload
        },
        chooseFirstTeam(state, action: PayloadAction<ITeam>) {
            state.firstSelectedTeam = action.payload
            state.filters.stat_metrics.firstTeamMetrics = action.payload.metrics?.timeframe_1.full_time || null
        },
        chooseSecondTeam(state, action: PayloadAction<ITeam>) {
            state.secondSelectedTeam = action.payload
            state.filters.stat_metrics.secondTeamMetrics = action.payload.metrics?.timeframe_1.full_time || null
        },
        setTimeFrame(state, action: PayloadAction<'1 тайм' | '2 тайм' | 'Полный матч'>) {
            state.filters.stat_metrics.timeFrame = action.payload
        },
        setGameFrame(state, action: PayloadAction<'1 game' | '3 games' | '5 games' | '4 games' | '10 games' | '15 games' | 'Season'>) {
            state.filters.stat_metrics.gameFrame = action.payload
        },


        setH2hData(state, action: PayloadAction<{firstTeamH2hParams: any, secondTeamH2hParams: any}>) {
            state.h2h.fieldParams.firstTeamH2h = action.payload.firstTeamH2hParams;
            state.h2h.fieldParams.secondTeamH2h = action.payload.secondTeamH2hParams
            
        },
        setH2hTeamTableData(state, action: PayloadAction<{firstTeamH2hTableParams: any, secondTeamH2hTableParams: any}>) {
            state.h2h.teamStatsTable.firstTeamH2h = action.payload.firstTeamH2hTableParams;
            state.h2h.teamStatsTable.secondTeamH2h = action.payload.secondTeamH2hTableParams
            
        },
        h2hTogle(state, action:PayloadAction<"field" | "teamTable">) {
            if (action.payload === 'field') {
                state.h2h.isH2h.field = !state.h2h.isH2h.field
            } else if (action.payload === 'teamTable') {
                state.h2h.isH2h.teamTable = !state.h2h.isH2h.teamTable
            }
        },
        disableH2h(state, action:PayloadAction<"field" | "teamTable">) {
            if (action.payload === 'field') {
                state.h2h.isH2h.field = false
            } else if (action.payload === 'teamTable') {
                state.h2h.isH2h.teamTable = false
            }
        },
        setFirstSelectedTeamUuid(state, action: PayloadAction<string>) {
            state.firstSelectedTeamUuid = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(switchPageToStartPostition, (state) => {
            state.isSingleTeamView = false
            state.isDoubleTeamView = false
        })
    }
})

export const {
        getTournamentData, 
        chooseFirstTeam,  
        chooseSecondTeam,
        changeTournamentType, 
        setCurrentChampionshipIdAndSeason,
        switchPageToStartPostition,
        switchToDoubleCandleCharts, 
        switchToSingleCandleChart, 
        setSpliteType,
        setCurrentSeasonsAmount,
        setH2hData, 
        h2hTogle, 
        disableH2h, 
        setH2hTeamTableData,
        setFirstSelectedTeamUuid,
        setTimeFrame,
        setGameFrame
    } = tournamentSlice.actions
export default tournamentSlice.reducer