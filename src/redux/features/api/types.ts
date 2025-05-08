type CCA_3 = string;
type urlString = string;

export interface Country {
    name: {
        common: string,
        official: string,
    },
    region: string,
    borders: CCA_3[], // cca3 codes array
    cca3: CCA_3, // string
    translations: {
        [tr: string]: {
            official: string,
            common: string,
        }
    },
    flag: string,
    flags: {
        png: urlString,
        svg: urlString,
        alt: string, // text
    },
    population: number
}

export type FetchCountriesResponse = Country[];