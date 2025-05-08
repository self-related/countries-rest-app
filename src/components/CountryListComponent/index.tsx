import type { Country } from "../../redux/features/api/types";
import styles from "./styles.module.scss";

interface CountryListComponentProps {
    countries: Country[] | undefined
}

export default function CountryListComponent({ countries }: CountryListComponentProps) {
  return (
    <div className={styles.countryList}>
        {
            countries?.map((country, index) => (
                <div className={styles.country} key={`country-${index}`}>
                    <p>{country.flag} {country.name.common}</p>
                </div>
            ))
        }
    </div>
  )
}
