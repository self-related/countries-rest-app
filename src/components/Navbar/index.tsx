import styles from "./styles.module.scss";
import HomeButton from "../../assets/home_icon_1.svg";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className={styles.nav}>
            <button className={styles.homeButton} onClick={() => navigate("/")}>
                <img src={HomeButton} alt="Home Button" />
            </button>
            <p>Language:</p>
            <select name="language" id="language">
                <option value="temp">Temp</option>
            </select>
        </nav>
    );
}