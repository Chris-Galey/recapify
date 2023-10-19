import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login } from "../api/Api";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { sharedState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = await login(username, password);
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
    <form onSubmit={handleFormSubmit}>
      <h2>Login</h2>
      <label htmlFor="loginUsername">Username:</label>
      <input
        type="text"
        id="loginUsername"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label htmlFor="loginPassword">Password:</label>
      <input
        type="password"
        id="loginPassword"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
