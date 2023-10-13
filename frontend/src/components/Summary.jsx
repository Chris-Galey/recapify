import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSummary } from "../api/Api";
import styles from "../styles/Summary.module.css";

export default function SummaryDetail() {
  const { recapId } = useParams();
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const handleSummary = async () => {
      const data = await getSummary(recapId);
      if (data) {
        setSummary(data);
      } else {
        setSummary([]);
      }
    };
    handleSummary();
  }, [recapId]);

  return (
    <div className={styles.wrapper}>
      <h3>Summary</h3>
      <p>{summary ? summary.content : "No Summary"}</p>
    </div>
  );
}
