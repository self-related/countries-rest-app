import { useNavigate } from "react-router-dom";
import type { Country } from "../../redux/features/api/types";
import styles from "./styles.module.scss";

interface CountryListComponentProps {
    countries: Country[] | undefined
}

export default function CountryListComponent({ countries }: CountryListComponentProps) {
  const navigate = useNavigate();
  return (
    <div className={styles.countryList}>
        {
            countries?.map((country, index) => (
                <div className={styles.country} key={`country-${index}`} onClick={() => navigate(`/country/${country.cca3}`)}>
                    <p>{country.flag} {country.name.common}</p>
                </div>
            ))
        }
    </div>
  )
}
