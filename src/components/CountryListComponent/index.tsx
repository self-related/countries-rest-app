import { useNavigate } from "react-router-dom";
import type { Country } from "../../redux/features/api/types";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

interface CountryListComponentProps {
    countries: Country[] | undefined,
    isLoading: boolean,
}

export default function CountryListComponent({ countries, isLoading }: CountryListComponentProps) {
  const navigate = useNavigate();
  const [countriesList, setCountriesList] = useState(countries);

  const noDataFound = 
    isLoading 
    ? <p className={styles.noData}> Loading...</p>
    : <p className={styles.noData}> Not found</p>;



  const handleSortByPopulation = () => {
    if (!countriesList) {
        return;
    }
    
    const countriesListSorted = [...countriesList].sort((countryA, countryB) => countryB.population - countryA.population);
    setCountriesList(countriesListSorted);
  };

  // change country list if props changed
  useEffect(() => {
    setCountriesList(countries);
  }, [countries]);

  return (
    <div className={styles.countryList}>
        <div>
            <button onClick={handleSortByPopulation} className={styles.sortByPopulation}>By population</button>
        </div>
        {
            countriesList != null
            ? countriesList?.map((country, index) => (
                <div className={styles.country} key={`country-${index}`} onClick={() => navigate(`/country/${country.cca3}`)}>
                    <p>{country.flag} {country.name.common}</p>
                </div>
            ))
            : noDataFound
        }
    </div>
  )
}
