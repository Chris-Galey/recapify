import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login } from "../api/Api";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "@mui/material/Link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { sharedState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = await login(username, password);
    console.log(data.status);
    localStorage.setItem("token", data.token);
    console.log(data);
    setPassword("");
    setUsername("");
    sharedState.setAuthStatus(true);
    sharedState.setAuthToken(data.token);
    sharedState.setUsername(username);
    sharedState.setSignedup(true);
    navigate("/recaps");
  };
  return (
    <form onSubmit={handleFormSubmit} className={styles.form_wrapper}>
      <h2>Sign in</h2>

      <TextField
        required
        id="username"
        label="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        required
        type="password"
        id="password"
        label="Password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button type="submit" variant="outlined">
        Login
      </Button>
      <Link href="/dashboard/signup" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
      <CheckCircleOutlineIcon className={styles.check} />
    </form>
  );
}
