import { Link } from "react-router-dom";
export default function RootHeader() {
  return (
    <header className="header">
      <h1>Recapify</h1>

      <nav>
        <ul>
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
