import type { Country } from "../../redux/features/api/types";

const sortByName = (countriesList: Country[]): Country[] => {

    // sort by every letter
    const countriesListSorted = [...countriesList].sort((countryA, countryB) => {
        let returnCode = countryA.name.official.charCodeAt(0) - countryB.name.official.charCodeAt(0);
        if (returnCode == 0) {
            for (let i = 1; i < countryA.name.official.length; i++) {
                if (i >= countryB.name.official.length) {
                    break;
                }

                returnCode = countryA.name.official.charCodeAt(i) - countryB.name.official.charCodeAt(i);

                if (returnCode !== 0) {
                    break;
                }
            }
        }
        return returnCode;
    });


    return countriesListSorted;
};

const sortByPopulation = (countriesList: Country[]): Country[] => {
    const countriesListSorted = [...countriesList].sort((countryA, countryB) => countryB.population - countryA.population);
    return countriesListSorted;
};

const filterByRegion = (countriesList: Country[], region: string): Country[] => {   
    const countriesListFiltered = region !== "" ? countriesList?.filter(country => country.region == region ) : countriesList;

    return countriesListFiltered;
};


interface TransformDataParams {
    sortedByPopulation: boolean,
    sortedByName: boolean,
    filterRegion: string
}

export const transformData = (countries: Country[], { sortedByPopulation, sortedByName, filterRegion }: TransformDataParams): Country[] => {
    let countriesList = countries;

    if (sortedByPopulation) {
        countriesList = sortByPopulation(countriesList);
    } else if (sortedByName) {
        countriesList = sortByName(countriesList);
    }

    if (filterRegion !== "All") {
        countriesList = filterByRegion(countriesList, filterRegion);
    }

    return countriesList;
};