import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QuotesResponse, QuoteData } from '../../App.types';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://huddle-gaming-test.herokuapp.com/' }),
    tagTypes: ['Quote'],
    endpoints: (build) => ({
        getQuotes: build.query<QuotesResponse, void>({
            query: () => 'quotes',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Quote' as const, id })),
                          { type: 'Quote', id: 'LIST' }
                      ]
                    : [{ type: 'Quote', id: 'LIST' }]
        }),
        addQuote: build.mutation<QuoteData, Partial<QuoteData>>({
            query: (body) => ({
                url: 'quotes',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Quote', id: 'LIST' }]
        }),
        getQuote: build.query<QuoteData, string>({
            query: (id) => `quotes/${id}`,
            providesTags: (result, error, id) => [{ type: 'Quote', id }]
        }),
        updateQuote: build.mutation<void, Pick<QuoteData, 'id'> & Partial<QuoteData>>({
            query: ({ id, ...patch }) => ({
                url: `quotes/${id}`,
                method: 'PATCH',
                body: patch
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Quote', id }]
        }),
        deleteQuote: build.mutation<{ success: boolean; id: string }, string>({
            query(id) {
                return {
                    url: `quotes/${id}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: (result, error, id) => [{ type: 'Quote', id }]
        })
    })
});

export const {
    useGetQuoteQuery,
    useGetQuotesQuery,
    useAddQuoteMutation,
    useUpdateQuoteMutation,
    useDeleteQuoteMutation
} = api;
