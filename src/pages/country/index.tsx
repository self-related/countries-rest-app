import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useFetchCountriesByCodesQuery } from "../../redux/features/api/restCountriesApiSlice";
import CountryListComponent from "../../components/CountryListComponent";

export default function CountryPage() {
    const params = useParams<{code: string}>();
    console.log(params)
    const code: string = params.code!;

    const { data } = useFetchCountriesByCodesQuery([code]);
    const country = data && data[0];

    const {data: borderCountries, isError} = useFetchCountriesByCodesQuery(country?.borders ?? [], { skip: data == null })

    console.log(country);
    console.log(borderCountries)

    return (
        <div className={styles.countryPage}>
            <h1>{country?.name.common}</h1>

            <div className={styles.picture}>
                <img src={country?.flags.png} alt={country?.flags.alt} />
            </div>
            
            <p className={styles.paragraph}>Official name: {country?.name.official}</p>
            <p className={styles.paragraph}>Region: {country?.region}</p>
            <p className={styles.paragraph}>Population: {country?.population}</p>

            <div className={styles.borderCountries}>
                <h2>Has borders with:</h2>
                {
                    data && !isError
                    ? <CountryListComponent countries={ borderCountries } noFilterByDefault={true} />
                    : <p className={styles.notFound}>Not Found</p>
                }
            </div>

        </div>
    );
}