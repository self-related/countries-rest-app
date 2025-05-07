import styles from "./styles.module.scss";

export default function Home() {

    return (
        <div className={styles.homePage}>
            <h1>REST Countries App</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className={styles.buttons}>
                <button className={styles.greenButton}>All Countries</button>
                <button className={styles.blueButton}>Search</button>
            </div>
        </div>
    );
}