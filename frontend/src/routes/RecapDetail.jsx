import { Outlet, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/RecapDetail.module.css";

export default function RecapDetail() {
  const { recapId } = useParams();
  const [recap, setRecap] = useState({});

  useEffect(() => {
    const handleRecap = async () => {
      const data = await fetch(`http://127.0.0.1:8000/recaps/${recapId}/`);
      const res = await data.json();
      setRecap(res);
    };
    handleRecap();
  }, [recapId]);

  return (
    <div className={styles.main}>
      <h2>{recap.title}</h2>
      <p>{recap.description}</p>
      <p>{recap.created_at}</p>
      <Link to="transcript"> View Transcript</Link>
      <Link to="summaries"> View Summary</Link>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
