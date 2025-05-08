import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import SearchIcon from "../../assets/search_icon.svg";
import { useFetchCountriesQuery } from "../../redux/features/api/restCountriesApiSlice";

export default function SearchPage() {
    const params = useParams<{query: string}>();
    console.log("params: ", params);

    const skip: boolean = params.query == null;
    const {data} = useFetchCountriesQuery(params.query!, { skip });

    console.log("data:", data);

    return (
        <div className={styles.searchPage}>
            <div className={styles.searchPanel}>
                <input type="text" />
                <button><img src={SearchIcon} alt="search" /></button>
            </div>
            <div className={styles.searchResults}>

            </div>

        </div>
    );
}