import { Link } from "react-router-dom";
import styles from "../styles/RootHeader.module.css";
export default function RootHeader() {
  return (
    <header className={styles.root_header}>
      <h1>Recapify</h1>

      <nav className={styles.root_nav}>
        <ul className={styles.root_list}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/meetings">Meetings</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
