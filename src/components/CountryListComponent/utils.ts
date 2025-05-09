import type { Country } from "../../redux/features/api/types";

// словарь для языков из-за отличий в i18n и restcountries api
export const LANG_MAP: { [i18nLang: string]: string } = {
    ru: "rus",
};

const sortByName = (countriesList: Country[], i18nLang: string): Country[] => {
    const lang = i18nLang == "en" ? i18nLang : LANG_MAP[i18nLang];

    // сортировка по каждой букве по официальному названию, либо по официальному переводу
    const countriesListSorted = [...countriesList].sort((countryA, countryB) => {
        const countryAName = lang == "en" ? countryA.name.official : countryA.translations[lang].official;
        const countryBName = lang == "en" ? countryB.name.official : countryB.translations[lang].official;
        
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
    i18nLang: string
}

export const transformData = (countries: Country[], { sortedByPopulation, sortedByName, filterRegion, i18nLang }: TransformDataParams): Country[] => {
    let countriesList = countries;

    if (sortedByPopulation) {
        countriesList = sortByPopulation(countriesList);
    } else if (sortedByName) {
        countriesList = sortByName(countriesList, i18nLang);
    }

    if (filterRegion !== "All") {
        countriesList = filterByRegion(countriesList, filterRegion);
    }

    return countriesList;
};