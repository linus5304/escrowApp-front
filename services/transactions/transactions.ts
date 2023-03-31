import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TransactionDto } from ".";
import { baseUrl } from "../../types";

// Define a service using a base URL and expected endpoints
const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getTransactions: builder.query<TransactionDto[], {}>({
      query: () => `transaction/`,
    }),
  }),
});

export default transactionApi;
