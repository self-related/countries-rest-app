import { useNavigate } from "react-router-dom";
import type { Country } from "../../redux/features/api/types";
import styles from "./styles.module.scss";
import { useState } from "react";
import { transformData } from "./utils";

interface CountryListComponentProps {
    countries: Country[] | undefined,
    noFilterByDefault?: boolean
}

export default function CountryListComponent({ countries, noFilterByDefault }: CountryListComponentProps) {
  const navigate = useNavigate();
  
  /// Стейты для сортировки и фильтрации.
  // Значение для сортировки из localStorage или false
  const [sortedByPopulation, setSortedByPopulation] = useState<boolean>(JSON.parse(localStorage.getItem("countriesSortedByPopulation") ?? "false"));
  const [sortedByName, setSortedByName] = useState<boolean>(JSON.parse(localStorage.getItem("countriesSortedByName") ?? "false"));
  
  // не фильтровать по-умолчанию (регион All). Иначе значение из localStorage или All
  const defaultFilterRegion = noFilterByDefault ? "All" : localStorage.getItem("countriesFilterRegion") ?? "All";
  const [filterRegion, setFilterRegion] = useState<string>(defaultFilterRegion);



  // коллбэк настройки сортировки по населению
  const handleSortByPopulation = (value?: boolean) => {
    const newValue = value ?? !sortedByPopulation; // присвоить напрямую, или переключить текущее значение
    setSortedByPopulation(newValue);
    localStorage.setItem("countriesSortedByPopulation", JSON.stringify(newValue));

    // отключить другую сортировку, если true
    if (newValue == true) {
        handleSortByName(false);
    }
  };

  // коллбэк настройки сортировки по названию
  const handleSortByName = (value?: boolean) => {
    const newValue = value ?? !sortedByName; // присвоить напрямую, или переключить текущее значение
    setSortedByName(newValue);
    localStorage.setItem("countriesSortedByName", JSON.stringify(newValue));

    // отключить другую сортировку, если true
    if (newValue == true) {
        handleSortByPopulation(false);
    }
  };


  // коллбэк настройки фильтрации по региону
  const handleRegionSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const region = event.currentTarget.value;
    setFilterRegion(region);

    localStorage.setItem("countriesFilterRegion", region);
  };


  // применить настройки сортировки и фильтрации через transformData()
  const countriesList = countries && transformData(countries, { sortedByPopulation, sortedByName, filterRegion });

  return (
    <div className={styles.countryList}>
        <div className={styles.sortPanel}>
            <button onClick={() => handleSortByPopulation()} className={styles.sortButton}>By population</button>
            <button onClick={() => handleSortByName()} className={styles.sortButton}>By Name</button>
            <select onChange={handleRegionSelectChange} defaultValue={filterRegion} className={styles.selectRegion}>
                <option value="All">All regions</option>
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
