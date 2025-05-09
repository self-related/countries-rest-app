import styles from "./styles.module.scss";
import HomeButton from "../../assets/home_icon_1.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = event.currentTarget.value;
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang)
    };

    return (
        <nav className={styles.nav}>
            <button className={styles.homeButton} onClick={() => navigate("/")}>
                <img src={HomeButton} alt="Home Button" />
            </button>
            <p>{ t("lang") }:</p>
            <select name="language" id="language" value={i18n.language} onChange={handleLangChange}>
                <option value="en">English</option>
                <option value="ru">Русский</option>
            </select>
        </nav>
    );
}