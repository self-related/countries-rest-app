import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useFetchCountriesByCodesQuery } from "../../redux/features/api/restCountriesApiSlice";
import CountryListComponent from "../../components/CountryListComponent";

export default function CountryPage() {
    const params = useParams<{ccn3: string}>();
    console.log(params)
    const ccn3 = Number(params.ccn3);

    const { data } = useFetchCountriesByCodesQuery([ccn3]);
    const country = data && data[0];

    const {data: borderCountries} = useFetchCountriesByCodesQuery(country?.borders ?? [], { skip: data == null })

    console.log(country);
    console.log(borderCountries)

    return (
        <div className={styles.countryPage}>
            <h1>{country?.name.common}</h1>
            <div className={styles.picture}>
                <img src={country?.flags.png} alt={country?.flags.alt} />
            </div>
            <p>Official name: {country?.name.official}</p>
            <div className={styles.borderCountries}>
                <h2>Has borders with:</h2>
                <CountryListComponent countries={borderCountries} />
            </div>

        </div>
    );
}