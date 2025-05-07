import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import SearchIcon from "../../assets/search_icon.svg";

export default function SearchPage() {

console.log(useParams());

    return (
        <div className={styles.searchPage}>
            <div className={styles.searchPanel}>
                <input type="text" />
                <button><img src={SearchIcon} alt="search" /></button>
            </div>

        </div>
    );
}