import styles from "./styles.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from "../../assets/search_icon.svg";
import { useFetchCountriesQuery } from "../../redux/features/api/restCountriesApiSlice";
import { useState } from "react";
import CountryListComponent from "../../components/CountryListComponent";

type Params = { query?: string }

export default function SearchPage() {
    const params = useParams<Params>();
    
    const [query, setQuery] = useState(params.query); // param is the default query
    const [input, setInput] = useState(params.query ?? "");
    
    const skip: boolean = query == null; // skip === true if no query

    const { data, isLoading, isError } = useFetchCountriesQuery(query!, { skip });

    const navigate = useNavigate();

    const handleSearchButtonClick = () => {
        const inputTrimmed = input.trim();

        if (inputTrimmed == "") {
            return;
        } else {
            setQuery(inputTrimmed);
            navigate(`/search/${inputTrimmed}`);
        }
    };

    return (
        <div className={styles.searchPage}>
            <div className={styles.searchPanel}>
                <input type="text" onInput={(event) => setInput(event.currentTarget.value)} defaultValue={input} onKeyDown={(event) => event.key == "Enter" ? handleSearchButtonClick() : ""} />
                <button onClick={handleSearchButtonClick}><img src={SearchIcon} alt="search" /></button>
            </div>
            {
                isLoading
                ? <p>Loading...</p>
                : isError
                    ? <p>Not found</p> 
                    : <CountryListComponent countries={ data } />
            }

        </div>
    );
}