import { useNavigate } from "react-router-dom";
import type { Country } from "../../redux/features/api/types";
import styles from "./styles.module.scss";
import { useState } from "react";
import { transformData } from "./utils";
import { useTranslation } from "react-i18next";

interface CountryListComponentProps {
    countries: Country[] | undefined,
    noFilterByDefault?: boolean
}

export default function CountryListComponent({ countries, noFilterByDefault }: CountryListComponentProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  /// Стейты для сортировки и фильтрации.
  // стандартные значение для сортировки берутся из sessionStorage или false
  const [sortedByPopulation, setSortedByPopulation] = useState<boolean>(JSON.parse(sessionStorage.getItem("countriesSortedByPopulation") ?? "false"));
  const [sortedByName, setSortedByName] = useState<boolean>(JSON.parse(sessionStorage.getItem("countriesSortedByName") ?? "false"));
  
  // если не фильтровать по-умолчанию, то регион == "All". Иначе значение из sessionStorage или "All"
  const defaultFilterRegion = noFilterByDefault ? "All" : sessionStorage.getItem("countriesFilterRegion") ?? "All";
  const [filterRegion, setFilterRegion] = useState<string>(defaultFilterRegion);



  // настроить сортировку по населению и записать в sessionStorage
  const handleSortByPopulation = (value?: boolean) => {
    const newValue = value ?? !sortedByPopulation; // присвоить напрямую, или переключить текущее значение
    setSortedByPopulation(newValue);
    sessionStorage.setItem("countriesSortedByPopulation", JSON.stringify(newValue));

    // отключить другую сортировку, если true
    if (newValue == true) {
        handleSortByName(false);
    }
  };

  // настроить сортировку по названию и записать в sessionStorage
  const handleSortByName = (value?: boolean) => {
    const newValue = value ?? !sortedByName; // присвоить напрямую, или переключить текущее значение
    setSortedByName(newValue);
    sessionStorage.setItem("countriesSortedByName", JSON.stringify(newValue));

    // отключить другую сортировку, если true
    if (newValue == true) {
        handleSortByPopulation(false);
    }
  };


  // настроить фильтрацию по региону и записать в sessionStorage
  const handleRegionSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const region = event.currentTarget.value;
    setFilterRegion(region);

    sessionStorage.setItem("countriesFilterRegion", region);
  };

  // сброс параметров и очистки sessionStorage
  const handleOptionsReset = () => {
      setSortedByPopulation(false);
      setSortedByName(false);
      setFilterRegion("All");

      sessionStorage.clear();
  };


  // применить настройки сортировки и фильтрации через transformData()
  const countriesList = countries && transformData(countries, { sortedByPopulation, sortedByName, filterRegion });

  return (
    <div className={styles.countryList}>
        <div className={styles.sortPanel}>
            <button onClick={() => handleOptionsReset()} className={`${styles.sortButton} ${styles.resetButton}`}>X</button>
            <button onClick={() => handleSortByName()} className={styles.sortButton}>
                { t("byName") }
            </button>
            <button onClick={() => handleSortByPopulation()} className={styles.sortButton}>
                { t("byPopulation") }
            </button>
            <select onChange={handleRegionSelectChange} value={filterRegion} className={styles.selectRegion}>
                <option value="All">{ t("allRegions") }</option>
                <option value="Africa">{ t("Africa") }</option>
                <option value="Americas">{ t("Americas") }</option>
                <option value="Asia">{ t("Asia") }</option>
                <option value="Oceania">{ t("Oceania") }</option>
                <option value="Europe">{ t("Europe") }</option>
            </select>
        </div>
        {
            countriesList?.map((country, index) => (
                <div className={styles.country} key={`country-${index}`} onClick={() => navigate(`/country/${country.cca3}`)}>
                    <p>{country.flag} {country.name.official}</p>
                </div>
            ))
        }
    </div>
  )
}
