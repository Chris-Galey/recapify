import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login } from "../api/Api";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Auth.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { sharedState } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = await login(username, password);

    if (data.token !== undefined) {
      localStorage.setItem("token", data.token);
      setLoginError(false);
      setPassword("");
      setUsername("");
      sharedState.setAuthStatus(true);
      sharedState.setAuthToken(data.token);
      sharedState.setUsername(username);
      sharedState.setSignedup(true);
      navigate("/recaps");
    } else {
      setLoginError(true);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form_wrapper}>
      <h2>Sign in</h2>

      <input
        required
        id="username"
        placeholder="username"
        label="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        required
        type="password"
        id="password"
        label="Password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <p>{loginError && "username or password incorrect"}</p>
      <button type="submit">Login</button>
      <Link href="/dashboard/signup" className={styles.link}>
        {"Don't have an account? Sign Up"}
      </Link>
    </form>
  );
}
