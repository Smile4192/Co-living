import baseApi from './base.api';

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserProfileAdmin: build.query({
      query: (id) => {
        console.log(id);
        return { url: `/getUserProfile/${id}` };
      },
      providesTags: [{ type: 'Example', id: 'LIST' }],
      keepUnusedDataFor: 0,
    }),
    createResource: build.mutation({
      query: (body) => ({
        url: '/resources',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => (result ? ['Example'] : []),
      // result ? [{ type: 'Example', id: 'LIST' }] : [],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserProfileAdminQuery, useCreateResourceMutation } =
  adminApi;
