import { useState } from "react";
import { Outlet } from "react-router-dom";
import RootHeader from "../components/RootHeader";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Root.module.css";
export default function Root() {
  const [username, setUsername] = useState("");
  const [authStatus, setAuthStatus] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [signedup, setSignedup] = useState(false);
  const sharedState = {
    username,
    setUsername,
    authStatus,
    setAuthStatus,
    authToken,
    setAuthToken,
    signedup,
    setSignedup,
  };

  return (
    <AuthContext.Provider value={{ sharedState }}>
      <div className={styles.main_wrapper}>
        <RootHeader />
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
}
