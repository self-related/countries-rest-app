import type { Country } from "../../redux/features/api/types";



const sortByName = (countriesList: Country[], apiLang: string): Country[] => {

    // сортировка по каждой букве по официальному названию, либо по официальному переводу
    const countriesListSorted = [...countriesList].sort((countryA, countryB) => {
        const countryAName = apiLang == "eng" ? countryA.name.official : countryA.translations[apiLang].official;
        const countryBName = apiLang == "eng" ? countryB.name.official : countryB.translations[apiLang].official;
        
        let returnCode = countryAName.charCodeAt(0) - countryBName.charCodeAt(0);
        if (returnCode == 0) {
            for (let i = 1; i < countryAName.length; i++) {
                if (i >= countryBName.length) {
                    break;
                }

                returnCode = countryAName.charCodeAt(i) - countryBName.charCodeAt(i);

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
    filterRegion: string,
    apiLang: string
}

export const transformData = (countries: Country[], { sortedByPopulation, sortedByName, filterRegion, apiLang }: TransformDataParams): Country[] => {
    let countriesList = countries;
    if (sortedByPopulation) {
        countriesList = sortByPopulation(countriesList);
    } else if (sortedByName) {
        countriesList = sortByName(countriesList, apiLang);
    }

    if (filterRegion !== "All") {
        countriesList = filterByRegion(countriesList, filterRegion);
    }

    return countriesList;
};