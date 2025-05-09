import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useFetchCountriesByCodesQuery } from "../../redux/features/api/restCountriesApiSlice";
import CountryListComponent from "../../components/CountryListComponent";
import { useTranslation } from "react-i18next";
import { LANG_MAP } from "../../consts";

export default function CountryPage() {
    const { t, i18n } = useTranslation();
    const apiLang = LANG_MAP[i18n.language];

    const params = useParams<{code: string}>();
    const code: string = params.code!;

    const { data } = useFetchCountriesByCodesQuery([code]);
    const country = data && data[0];

    const {data: borderCountries, isError} = useFetchCountriesByCodesQuery(country?.borders ?? [], { skip: data == null })

    return (
        <div className={styles.countryPage}>
            <h1>{country?.name.common}</h1>

            <div className={styles.picture}>
                <img src={country?.flags.png} alt={country?.flags.alt} />
            </div>
            
            <p className={styles.paragraph}>
                { t("officialName") + ": " + `${apiLang == "eng" ? country?.name.official : country?.translations[apiLang].official}`} 
            </p>
            <p className={styles.paragraph}>
                { t("region") + ": " + t(country?.region ?? "")} 
            </p>
            <p className={styles.paragraph}>
                { t("population") + ": " + country?.population} 
            </p>

            <div className={styles.borderCountries}>
                <h2>{ t("commonBorders") }</h2>
                {
                    data && !isError
                    ? <CountryListComponent countries={ borderCountries } noFilterByDefault={true} />
                    : <p className={styles.notFound}>Not Found</p>
                }
            </div>

        </div>
    );
}