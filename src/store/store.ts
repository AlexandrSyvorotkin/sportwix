import { configureStore } from '@reduxjs/toolkit'
import user from './userSlice/userSlice'
import TeamStatsControls from './TeamStatsControls/TeamStatsControls'
import test from './TestingConnection/TestingConnection'
import interfaceState from './InterfaceSlice/InterfaceSlice'
import teamTabs from './TeamTabsSlice/TeamTabsSlice'
import candleSliceNew from './candle-slice/candle-slice'
import guidelineRoadmap from './GuidelineRoadmapSlice/GuidelineRoadmapSlice'
import tournamentSlice from './tournament-slice/tournament-slice'
import { candleApi } from '../services/candles-api/candle-api'
import { championshipInfoApi } from '../services/championships-api/championship-api'
import { newsApi } from '../services/news-api/news-api'
import { newsTagsApi } from '../services/news-tags-api/news-tags-api'

const store = configureStore({
  reducer: {
    tournamentSlice,
    TeamStatsControls,
    user,
    test,
    interfaceState,
    teamTabs,
    candleSliceNew,
    guidelineRoadmap,
    [championshipInfoApi.reducerPath]: championshipInfoApi.reducer,
    [candleApi.reducerPath]: candleApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [newsTagsApi.reducerPath]: newsTagsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(championshipInfoApi.middleware)
      .concat(candleApi.middleware)
      .concat(newsApi.middleware)
      .concat(newsTagsApi.middleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
