import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/RecapsNav.module.css";

export default function RecapsNav() {
  const [recaps, setRecaps] = useState([]);
  const [title, setTitle] = useState();
  console.log(title);
  console.log(recaps);

  useEffect(() => {
    const handleAllRecap = async () => {
      const data = await fetch("http://127.0.0.1:8000/recaps/");
      const res = await data.json();
      console.log(res);
      setRecaps(res);
    };
    handleAllRecap();
  }, []);

  const handleNewRecap = async (e) => {
    e.preventDefault();
    const data = await fetch("http://127.0.0.1:8000/recaps/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const res = await data.json();
    console.log(res);
    setTitle("");
  };

  return (
    <>
      <div className={styles.sidebar}>
        <div>
          {/* <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search Meetings"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form> */}
          <form method="post" onSubmit={handleNewRecap}>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            {recaps.map((recap) => {
              return (
                <li key={recap.id}>
                  <Link to={`/recaps/${recap.id}`}>
                    <h5>{recap.title}</h5>
                    <p>{recap.description}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
