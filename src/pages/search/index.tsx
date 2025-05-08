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
    const [input, setInput] = useState("");
    
    const skip: boolean = query == null; // skip === true if no query

    const { data, isError } = useFetchCountriesQuery(query!, { skip });

    
    console.log("params: ", params);
    console.log("data:", data);

    const handleSearchButtonClick = () => {
        if (input.trim() == "") {
            return;
        } else {
            setQuery(input);
        }
    };

    return (
        <div className={styles.searchPage}>
            <div className={styles.searchPanel}>
                <input type="text" onInput={(event) => setInput(event.currentTarget.value)} onKeyDown={(event) => event.key == "Enter" ? handleSearchButtonClick() : ""} />
                <button onClick={handleSearchButtonClick}><img src={SearchIcon} alt="search" /></button>
            </div>
            {
                isError
                ? <p>Not Found</p>
                : <CountryListComponent countries={data} />
            }

        </div>
    );
}