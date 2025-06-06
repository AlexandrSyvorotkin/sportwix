import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Championship } from './championship'

export const championshipInfoApi = createApi({
  reducerPath: 'championshipInfo',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.sportwix.susi-susi.site/api/v1/events/' }),
  endpoints: builder => ({
    fetchChampionshipInfo: builder.query<Championship, { championshipId: string; season: string }>({
      query: ({ championshipId, season }) => `/${championshipId}/${season}`,
    }),
  }),
})

export const { useFetchChampionshipInfoQuery } = championshipInfoApi
