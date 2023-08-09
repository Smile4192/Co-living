import baseApi from './base.api';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResources: build.query({
      query: () => '/resources',
      providesTags: [{ type: 'Example', id: 'LIST' }],
    }),
    register: build.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'Example', id: 'LIST' }] : [],
    }),
    loginEmail: build.mutation({
      query: (body) => ({
        url: '/auth/login/email',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'Example', id: 'LIST' }] : [],
    }),
    loginPhone: build.mutation({
      query: (body) => ({
        url: '/auth/login/phone',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'Example', id: 'LIST' }] : [],
    }),
    loginToken: build.mutation({
      query: (body) => ({
        url: '/auth/login/token',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'Example', id: 'LIST' }] : [],
    }),
    getUserProfile: build.query<never[], void>({
      query: () => '/getUserProfile',
      providesTags: [{ type: 'Auth', id: 'PROFILE' }],
    }),
    getColivingListings: build.query({
      query: () => '/getColivingListings',
      providesTags: [{ type: 'Example', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginEmailMutation,
  useLoginPhoneMutation,
  useLoginTokenMutation,
  useGetUserProfileQuery,
  useGetColivingListingsQuery,
} = authApi;
export default authApi;
// export const { useGetResourcesQuery, useRegisterQuery } = authApi;
