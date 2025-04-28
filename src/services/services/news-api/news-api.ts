import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { News } from '../../../types/types'

export const newsApi = createApi({
  reducerPath: 'news-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.sportwix.susi-susi.site/api/v1/news/' }),
  endpoints: (builder) => ({
    fetchNews: builder.query<News, {selectedTeam: string | undefined, championshipUuid: string}>({
      query: ({selectedTeam, championshipUuid}) => `?team=${selectedTeam}&event=${championshipUuid}`,
    }),
  }),
})

export const { useFetchNewsQuery } = newsApi


