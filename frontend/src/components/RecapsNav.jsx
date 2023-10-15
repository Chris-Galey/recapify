import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecaps, postRecap, deleteRecapDetail } from "../api/Api";

import styles from "../styles/RecapsNav.module.css";

export default function RecapsNav() {
  const [recaps, setRecaps] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  console.log(recaps);

  useEffect(() => {
    const fetchRecaps = async () => {
      const data = await getRecaps();
      setRecaps(data);
    };
    fetchRecaps();
  }, []);

  useEffect(() => {
    setTitle("");
    setDescription("");
  }, [recaps]);

  const handleNewRecap = async (e) => {
    e.preventDefault();
    const data = await postRecap(title, description);
    setRecaps([...recaps, data]);
  };

  const handleDeleteRecap = async (recapId) => {
    await deleteRecapDetail(recapId);
  };

  return (
    <>
      <div className={styles.sidebar}>
        <div>
          <form method="post" onSubmit={handleNewRecap}>
            <label htmlFor="title">
              Title:
              <input
                id="title"
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
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
