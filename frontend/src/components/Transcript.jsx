import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTranscript } from "../api/Api";
import styles from "../styles/Transcript.module.css";

export default function Transcript({ transcript }) {
  const { recapId } = useParams();
  const [text, setText] = useState(transcript || "No Transcript");

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const transcriptData = await getTranscript(recapId);
        setText(transcriptData.raw_transcript || "No Transcript");
      } catch (error) {
        console.error("Error fetching transcript:", error);
      }
    };
    if (!transcript) {
      fetchTranscript();
    } else {
      setText(transcript);
    }
  }, [recapId, transcript]);

  return (
    <div className={styles.wrapper}>
      <h1>Transcript</h1>
      <p>{text ? text : "No Transcript"}</p>
    </div>
  );
}
