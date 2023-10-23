import { useEffect, useState } from "react";
import { getRecaps, postRecap, deleteRecapDetail } from "../api/Api";
import { NavLink, useNavigate } from "react-router-dom";
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
          <form className={styles.form} method="post" onSubmit={handleNewRecap}>
            <input
              id="title"
              type="text"
              placeholder="Recap Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              id="description"
              type="text"
              placeholder="Recap Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            <div>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
        <nav className={styles.sidebar_nav}>
          <ul className={styles.sidebar_list}>
            {recaps.map((recap) => {
              return (
                <li className={styles.sidebar_item} key={recap.id}>
                  <NavLink to={`/recaps/${recap.id}`} className={styles.link}>
                    <h4>{recap.title}</h4>
                    <p>{recap.description}</p>
                  </NavLink>

                  <div>
                    <button onClick={() => handleDeleteRecap(recap.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
