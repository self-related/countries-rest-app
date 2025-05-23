import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchCountriesResponse } from "./types";

const baseUrl = "https://restcountries.com/v3.1";

export const restCountriesApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (build) => ({
        fetchCountries: build.query<FetchCountriesResponse, string>({
            query: (query: string) => {
                if (query == "all") {
                    return {
                        url: "/all",
                        method: "GET",
                    };
                } else {
                    return {
                        url: `/name/${query}`,
                        method: "GET",
                    }
                }
            },
        }),

        fetchCountriesByCodes: build.query<FetchCountriesResponse, Array<string | number>>({
            query: (query: Array<string | number>) => ({
                url: `/alpha?codes=${query.join(",")}`
            })
        }),
    }),
    reducerPath: "restCountriesApi",

});

export const { useFetchCountriesQuery, useFetchCountriesByCodesQuery } = restCountriesApiSlice;