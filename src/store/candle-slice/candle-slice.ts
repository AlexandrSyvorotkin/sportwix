import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Candle } from '../../types/types'
import { candleSeasons } from '../../types/candleSeason'
import { filterByAmountOfGoalsVarians } from '../../types/candleChartFilterTypes'
import { filterByHomeAwayGamesVariants } from '../../types/candleChartFilterTypes'
import { filterBySeasonsVariants } from '../../types/candleChartFilterTypes'
import { filterByTypeOfTimeVariants } from '../../types/candleChartFilterTypes'

type CandlesVariants = 'firstSelectedTeam' | 'secondSelectedTeam'

interface CandleSliceState {
  firstSelectedTeam: {
    candles: Candle[]
    seasons: candleSeasons[]
  }
  secondSelectedTeam: {
    candles: Candle[]
    seasons: any
  }
  loading: boolean
  filters: {
    byHomeAwayGames: filterByHomeAwayGamesVariants
    byAmountOfGoals: filterByAmountOfGoalsVarians
    byTypeOfTime: filterByTypeOfTimeVariants
    filterBySeasons: filterBySeasonsVariants
  }
}

const initialState: CandleSliceState = {
  firstSelectedTeam: {
    candles: [],
    seasons: [],
  },
  secondSelectedTeam: {
    candles: [],
    seasons: undefined,
  },
  loading: false,
  filters: {
    byHomeAwayGames: 'All games',
    byAmountOfGoals: 'All goals',
    byTypeOfTime: '1T + 2T',
    filterBySeasons: '3 last seasons',
  },
}

const candleSlice = createSlice({
  name: 'candleSlice',
  initialState,
  reducers: {
    addCandlesNew(state, action: PayloadAction<{ type: CandlesVariants; candles: Candle[] }>) {
      const { type, candles } = action.payload
      if (type === 'firstSelectedTeam') {
        state.firstSelectedTeam.candles = candles
      } else if (type === 'secondSelectedTeam') {
        state.secondSelectedTeam.candles = candles
      }
    },
    addSeasons(state, action: PayloadAction<{ type: CandlesVariants; saeasons: candleSeasons[] }>) {
      const { type, saeasons } = action.payload
      if (type === 'firstSelectedTeam') {
        state.firstSelectedTeam.seasons = saeasons
      } else if (type === 'secondSelectedTeam') {
        state.secondSelectedTeam.seasons = saeasons
      }
    },
    setLoadingFalse(state) {
      state.loading = false
    },
    setLoadingTrue(state) {
      state.loading = true
    },
    filterChartByHomeOrAwayGames(state, action: PayloadAction<filterByHomeAwayGamesVariants>) {
      state.filters.byHomeAwayGames = action.payload
    },
    filterChartByAmountOfGoals(state, action: PayloadAction<filterByAmountOfGoalsVarians>) {
      state.filters.byAmountOfGoals = action.payload
    },
    filterChartByTypeOfTime(state, action: PayloadAction<filterByTypeOfTimeVariants>) {
      state.filters.byTypeOfTime = action.payload
    },
    filterChartBySeasons(state, action: PayloadAction<filterBySeasonsVariants>) {
      state.filters.filterBySeasons = action.payload
    },
    clearFilters(state) {
      state.filters.byHomeAwayGames = 'All games'
      state.filters.byAmountOfGoals = 'All goals'
      state.filters.byTypeOfTime = '1T + 2T'
      state.filters.filterBySeasons = '3 last seasons'
    },
  },
})

export const {
  addCandlesNew,
  addSeasons,
  setLoadingFalse,
  setLoadingTrue,
  filterChartByHomeOrAwayGames,
  filterChartByAmountOfGoals,
  filterChartByTypeOfTime,
  filterChartBySeasons,
  clearFilters,
} = candleSlice.actions
export default candleSlice.reducer
