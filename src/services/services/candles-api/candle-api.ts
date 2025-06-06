import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICandle } from '../../../models/ICandle'

export const candleApi = createApi({
  reducerPath: 'candles',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.sportwix.susi-susi.site/api/v1/team/' }),
  endpoints: builder => ({
    fetchTeamCandles: builder.query<
      ICandle,
      { team_uuid: string; seasonsAmount: number; spliteType: boolean }
    >({
      query: ({ team_uuid, seasonsAmount, spliteType }) =>
        `${team_uuid}/event/2694d35e-c157-4497-9957-56f4e93ab7bb/?offset=${seasonsAmount}&splited=${spliteType}`,
    }),
  }),
})

export const { useFetchTeamCandlesQuery } = candleApi
