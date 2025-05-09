import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

export default function Home() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={styles.homePage}>
            <h1>REST Countries App</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className={styles.buttons}>
                <button className={styles.greenButton} onClick={() => navigate("/search/all")}>
                    { t("allCountries") }
                </button>
                <button className={styles.blueButton} onClick={() => navigate("/search")}>
                    { t("search") }
                </button>
            </div>
        </div>
    );
}