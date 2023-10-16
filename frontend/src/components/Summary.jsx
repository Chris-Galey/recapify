import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSummary } from "../api/Api";
import styles from "../styles/Summary.module.css";

export default function Summary({ summary }) {
  const { recapId } = useParams();
  const [text, setText] = useState(summary || "No Summary");

  useEffect(() => {
    const handleInitialData = async () => {
      try {
        const summaryData = await getSummary(recapId);
        setText(summaryData.content || "No Summary");
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };
    if (!summary) {
      handleInitialData();
    } else {
      setText(summary);
    }
  }, [recapId, summary]);

  return (
    <div className={styles.wrapper}>
      <h3>Summary</h3>
      <p>{text ? text : "No Summary"}</p>
    </div>
  );
}
