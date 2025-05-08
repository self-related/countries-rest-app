import { useNavigate } from "react-router-dom";
import type { Country } from "../../redux/features/api/types";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

interface CountryListComponentProps {
    countries: Country[] | undefined,
}

export default function CountryListComponent({ countries }: CountryListComponentProps) {
  const navigate = useNavigate();
  const [countriesList, setCountriesList] = useState(countries);



  const handleSortByPopulation = () => {
    if (!countriesList) {
        return;
    }
    
    const countriesListSorted = [...countriesList].sort((countryA, countryB) => countryB.population - countryA.population);
    setCountriesList(countriesListSorted);
  };

  const handleSortByName = () => {
    if (!countriesList) {
        return;
    }
    
    // sort by every letter
    const countriesListSorted = [...countriesList].sort((countryA, countryB) => {
        let returnCode = countryA.name.common.charCodeAt(0) - countryB.name.common.charCodeAt(0);
        if (returnCode == 0) {
            for (let i = 1; i < countryA.name.common.length; i++) {
                if (i >= countryB.name.common.length) {
                    break;
                }

                returnCode = countryA.name.common.charCodeAt(i) - countryB.name.common.charCodeAt(i);

                if (returnCode !== 0) {
                    break;
                }
            }
        }
        return returnCode;
    });
    setCountriesList(countriesListSorted);
  };

  const handleRegionSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const region = event.currentTarget.value;
    
    const countriesListFiltered = region !== "" ? countries?.filter(country => country.region == region ) : countries;
    setCountriesList(countriesListFiltered);
  };

  // change country list if props changed
  useEffect(() => {
    setCountriesList(countries);
  }, [countries]);

  return (
    <div className={styles.countryList}>
        <div className={styles.sortPanel}>
            <button onClick={handleSortByPopulation} className={styles.sortButton}>By population</button>
            <button onClick={handleSortByName} className={styles.sortButton}>By Name</button>
            <select onChange={handleRegionSelectChange} className={styles.selectRegion}>
                <option value="">All regions</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Oceania">Australia & Oceania</option>
                <option value="Europe">Europe</option>
            </select>
        </div>
        {
            countriesList?.map((country, index) => (
                <div className={styles.country} key={`country-${index}`} onClick={() => navigate(`/country/${country.cca3}`)}>
                    <p>{country.flag} {country.name.common}</p>
                </div>
            ))
        }
    </div>
  )
}
