import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://restcountries.com/v3.1";

export const restCountriesApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (build) => ({
        fetchAllCountries: build.query({
            query: () => ({
                url: "/all",
                method: "GET"
            }),
        }),
    }),
    reducerPath: "restCountriesApi",

});

export const { useFetchAllCountriesQuery } = restCountriesApiSlice;