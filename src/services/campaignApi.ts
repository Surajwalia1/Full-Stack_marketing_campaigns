// src/services/campaignApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const campaignApi = createApi({
  reducerPath: 'campaignApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    createCampaign: builder.mutation({
      query: (campaignData) => ({
        url: '/campaigns',
        method: 'POST',
        body: campaignData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
        },
      }),
    }),
    updateCampaign: builder.mutation({
      query: ({ id, data }) => ({
        url: `/campaigns/${id}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
  }),
});

export const { useCreateCampaignMutation, useUpdateCampaignMutation } = campaignApi;
