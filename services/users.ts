import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TransactionDto, UserDto } from ".";
import { baseUrl } from "../types";

// Define a service using a base URL and expected endpoints
const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getUsers: builder.query<UserDto[], {}>({
      query: () => `users/`,
    }),
  }),
});

export default usersApi;
