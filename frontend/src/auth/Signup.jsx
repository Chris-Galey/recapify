import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/Api";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { sharedState } = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = await signup(username, password);

    console.log(`${data.username} has been created!`);
    setUsername("");
    setPassword("");
    sharedState.setSignedup(true);
    navigate("/dashboard/login");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Signup</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
