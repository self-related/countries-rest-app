import styles from "./styles.module.scss";

export default function Navbar() {

    return (
        <nav className={styles.nav}>
            <p>Language:</p>
            <select name="language" id="language">
                <option value="temp">Temp</option>
            </select>
        </nav>
    );
}