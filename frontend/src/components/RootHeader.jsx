import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/RootHeader.module.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function RootHeader() {
  const navigate = useNavigate();
  const { sharedState } = useContext(AuthContext);

  const handleLogout = () => {
    sharedState.setUsername("");
    sharedState.setAuthStatus(false);
    sharedState.setAuthToken("");
    sharedState.setSignedup(false);
    localStorage.removeItem("token");
    navigate("/dashboard/login");
  };
  console.log(sharedState);
  return (
    <header className={styles.root_header}>
      <h2 className={styles.logo}>Recapify</h2>

      <nav className={styles.root_nav}>
        <ul className={styles.nav_list}>
          <li className={styles.link}>
            <Link to="/">Home</Link>
          </li>
          {sharedState.authStatus ? (
            <li>
              <Link to="/recaps">Recaps</Link>
            </li>
          ) : (
            <li>
              <Link to="/dashboard/login">Login</Link>
            </li>
          )}

          {!sharedState.signedup ? (
            <li>
              <Link to="/dashboard/signup">Signup</Link>
            </li>
          ) : null}
          {sharedState.authStatus ? (
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}
