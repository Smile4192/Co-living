import baseApi from './base.api';

const applicationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getApplications: build.query({
      query: ({ id }) => {
        return {
          url: `/getApplications/${id}`,
        };
      },
      providesTags: [{ type: 'Example', id: 'LIST' }],
    }),
    getAllApplications: build.query({
      query: () => {
        return {
          url: `/getApplications`,
        };
      },
      providesTags: [{ type: 'Example', id: 'LIST' }],
    }),
    deleteApplication: build.mutation({
      query: (body) => ({
        url: `/delete/application/${body.coliving_id}/${body.userID}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'Example', id: 'LIST' }] : [],
    }),
    updateApplication: build.mutation({
      query: (body) => ({
        url: `/updateApplication/${body.coliving_id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'Example', id: 'LIST' }] : [],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetApplicationsQuery,
  useGetAllApplicationsQuery,
  useDeleteApplicationMutation,
  useUpdateApplicationMutation,
} = applicationsApi;
