import baseApi from './base.api';

const feedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFeed: build.query({
      query: (data) => {
        const { page, type = 'colivings', filter } = data;
        return {
          url: `/getFeed/${type}?page=${page}`,
          method: 'POST',
          body: filter,
        };
      },
      providesTags: [{ type: 'Example', id: 'LIST' }],
    }),
    getColivingById: build.query({
      query: (id) => `/getColiving/${id}`,
      providesTags: [{ type: 'Example', id: 'LIST' }],
    }),
    deleteColivingById: build.mutation({
      query: ({ id }) => {
        return {
          url: `/delete/coliving/${id}`,
          method: 'POST',
        };
      },
      invalidatesTags: (result) => (result ? ['Example'] : []),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFeedQuery,
  useGetColivingByIdQuery,
  useDeleteColivingByIdMutation,
} = feedApi;
