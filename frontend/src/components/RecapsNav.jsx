import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecaps, postRecap, deleteRecapDetail } from "../api/Api";

import styles from "../styles/RecapsNav.module.css";

export default function RecapsNav() {
  const [recaps, setRecaps] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    const fetchRecaps = async () => {
      const data = await getRecaps();
      setRecaps(data);
    };
    fetchRecaps();
  }, [recaps]);

  const handleNewRecap = async (e) => {
    e.preventDefault();
    const data = await postRecap(title, description);
    setRecaps([...recaps, data]);
    setTitle("");
    setDescription("");
  };
  const handleDeleteRecap = async (recapId) => {
    await deleteRecapDetail(recapId);
    const newRecaps = recaps.filter((recap) => recap.id !== recapId);
    setRecaps(newRecaps);
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
            <label htmlFor="title">
              Title:
              <input
                id="title"
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </label>
            <label htmlFor="description">
              Description:
              <input
                id="description"
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              />
            </label>
            <button type="submit">Add</button>
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
                  <button onClick={() => handleDeleteRecap(recap.id)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
