import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const kapustaApi = createApi({
  reducerPath: 'kapusta',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kapusta-backend.goit.global/',
    prepareHeaders: (headers, { getState, endpoint }) => {
      let token = getState().currentUser.token;
      if (endpoint === 'refreshUser') {
        token = getState().currentUser.refreshToken;
      }
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Transactions', 'Auth', 'User'],
  endpoints: builder => ({
    registerUser: builder.mutation({
      query(user) {
        return {
          url: `auth/register`,
          method: 'POST',
          body: user,
        };
      },
      invalidatesTags: ['Auth'],
    }),
    authorizeUser: builder.mutation({
      query(user) {
        return {
          url: `auth/login`,
          method: 'POST',
          body: user,
        };
      },
      invalidatesTags: ['Auth'],
    }),
    logOutUser: builder.mutation({
      query() {
        return {
          url: `auth/logout`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Auth'],
    }),
    refreshUser: builder.mutation({
      query(sid) {
        return {
          url: `auth/refresh`,
          method: 'POST',
          body: { sid },
        };
      },
      invalidatesTags: ['Auth'],
    }),
    authGoogleUser: builder.query({
      query() {
        return {
          url: `auth/google`,
        };
      },
      providesTags: ['Auth'],
    }),
    getIncome: builder.query({
      query: () => ({
        url: `transaction/income`,
      }),
      providesTags: ['Transactions'],
    }),
    getExpense: builder.query({
      query: () => ({
        url: `transaction/expense`,
      }),
      providesTags: ['Transactions'],
    }),
    addIncome: builder.mutation({
      query: data => ({
        url: `transaction/income`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Transactions'],
    }),
    addExpense: builder.mutation({
      query: data => ({
        url: `transaction/expense`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Transactions'],
    }),
    deleteTransaction: builder.mutation({
      query(transactionId) {
        return {
          url: `transaction/${transactionId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Transactions'],
    }),
    getIncomeCategories: builder.query({
      query: () => ({
        url: `transaction/income-categories`,
      }),
      providesTags: ['Transactions'],
    }),
    getExpenseCategories: builder.query({
      query: () => ({
        url: `transaction/expense-categories`,
      }),
      providesTags: ['Transactions'],
    }),
    getPeriodData: builder.query({
      query: date => ({
        url: `transaction/period-data/?date=${date}`,
      }),
      providesTags: ['Transactions'],
    }),
    getUserData: builder.query({
      query: () => ({
        url: `user`,
      }),
      providesTags: ['User', 'Transactions'],
    }),
    changeBalance: builder.mutation({
      query: balance => ({
        url: `user/balance`,
        method: 'PATCH',
        body: { newBalance: balance },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useAuthorizeUserMutation,
  useRegisterUserMutation,
  useLogOutUserMutation,
  useRefreshUserMutation,
  useLazyAuthGoogleUserQuery,
  useAddExpenseMutation,
  useAddIncomeMutation,
  useLazyGetExpenseQuery,
  useLazyGetIncomeQuery,
  useDeleteTransactionMutation,
  useLazyGetPeriodDataQuery,
  useLazyGetUserDataQuery,
  useGetIncomeCategoriesQuery,
  useGetExpenseCategoriesQuery,
  useChangeBalanceMutation,
  useGetUserDataQuery,
  useGetExpenseQuery,
  useGetIncomeQuery,
} = kapustaApi;
