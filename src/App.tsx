import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";

function App() {

  return (
    <div className={styles.app} >
        <main className={styles.main} >
            <Outlet />
        </main>
    </div>
  )
}

export default App
