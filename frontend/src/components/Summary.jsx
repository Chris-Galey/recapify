import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSummary } from "../api/Api";
import styles from "../styles/Summary.module.css";

export default function Summary({ summary }) {
  const { recapId } = useParams();
  const [text, setText] = useState();

  useEffect(() => {
    const handleInitialData = async () => {
      const summaryData = await getSummary(recapId);
      console.log(summaryData);
      setText(summaryData.content);
    };
    handleInitialData();
  }, [recapId]);

  useEffect(() => {
    setText(summary);
  }, [recapId, summary]);

  return (
    <div className={styles.wrapper}>
      <h3>Summary</h3>
      <p>{text ? text : "No Summary"}</p>
    </div>
  );
}
