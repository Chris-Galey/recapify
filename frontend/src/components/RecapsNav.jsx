import { useEffect, useState } from "react";
import { getRecaps, postRecap, deleteRecapDetail } from "../api/Api";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/RecapsNav.module.css";

export default function RecapsNav() {
  const navigate = useNavigate();
  const [recaps, setRecaps] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  console.log(recaps);

  useEffect(() => {
    const fetchRecaps = async () => {
      const data = await getRecaps();
      setRecaps(data);
    };
    fetchRecaps();
  }, []);

  const handleNewRecap = async (e) => {
    e.preventDefault();
    const data = await postRecap(title, description);
    setRecaps([...recaps, data]);
    setTitle("");
    setDescription("");
    navigate(`/recaps/${data.id}`);
  };

  const handleDeleteRecap = async (recapId) => {
    await deleteRecapDetail(recapId);
    const newRecaps = recaps.filter((recap) => recap.id !== recapId);
    setRecaps(newRecaps);
    navigate("/recaps");
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
                value={title}
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
                value={description}
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
