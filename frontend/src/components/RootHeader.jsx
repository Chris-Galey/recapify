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
  return (
    <header className={styles.root_header}>
      <h2 className={styles.logo}>Recapify</h2>

      <nav className={styles.root_nav}>
        <ul className={styles.nav_list}>
          <li className={styles.link}>
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </li>
          {sharedState.authStatus ? (
            <li>
              <Link to="/recaps" className={styles.link}>
                Recaps
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/dashboard/login" className={styles.link}>
                Login
              </Link>
            </li>
          )}

          {!sharedState.signedup ? (
            <li>
              <Link to="/dashboard/signup" className={styles.link}>
                Signup
              </Link>
            </li>
          ) : null}
          {sharedState.authStatus ? (
            <li>
              <Link onClick={handleLogout} className={styles.link}>
                Logout
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}
