import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import SearchIcon from "../../assets/search_icon.svg";
import { useFetchCountriesQuery } from "../../redux/features/api/restCountriesApiSlice";
import { useState } from "react";
import CountryListComponent from "../../components/CountryListComponent";

type Params = { query?: string }

export default function SearchPage() {
    const params = useParams<Params>();
    
    const [query, setQuery] = useState(params.query); // param is the default query
    
    const skip: boolean = query == null; // skip === true if no query

    const { data } = useFetchCountriesQuery(query!, { skip });

    
    console.log("params: ", params);
    console.log("data:", data);

    return (
        <div className={styles.searchPage}>
            <div className={styles.searchPanel}>
                <input type="text" />
                <button><img src={SearchIcon} alt="search" /></button>
            </div>
            <CountryListComponent countries={data} />

        </div>
    );
}