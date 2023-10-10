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
    <div className={styles.recap__main}>
      <h2>{recap.title}</h2>
      <div>Input</div>
      <div>
        <Link to="transcript"> Transcript</Link>
        <Link to="summaries"> Summary</Link>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
