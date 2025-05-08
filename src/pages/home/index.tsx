import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className={styles.homePage}>
            <h1>REST Countries App</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className={styles.buttons}>
                <button className={styles.greenButton} onClick={() => navigate("/search/all")}>All Countries</button>
                <button className={styles.blueButton} onClick={() => navigate("/search")}>Search</button>
            </div>
        </div>
    );
}