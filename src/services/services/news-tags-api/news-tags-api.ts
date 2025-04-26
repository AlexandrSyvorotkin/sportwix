import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type tags = {
    results: string[]
}

export const newsTagsApi = createApi({
  reducerPath: 'news-tags-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.sportwix.susi-susi.site/api/v1/news-tags/' }),
  endpoints: (builder) => ({
    fetchTags: builder.query<tags, ''>({
      query: () => '',
    }),
  }),
})

export const { useFetchTagsQuery } = newsTagsApi