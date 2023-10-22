import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/Api";
import styles from "../styles/Auth.module.css";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { sharedState } = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = await signup(username, password);
    console.log(data.status);
    console.log(`${data.username} has been created!`);
    setUsername("");
    setPassword("");
    sharedState.setSignedup(true);
    navigate("/dashboard/login");
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form_wrapper}>
      <h2>Sign up</h2>

      <input
        required
        id="username"
        label="Required"
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        required
        id="password"
        label="Required"
        placeholder="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Sign Up</button>
      <Link href="/dashboard/login" className={styles.link}>
        {"Already have an account? Login"}
      </Link>
    </form>
  );
}
