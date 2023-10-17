import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTranscript } from "../api/Api";
import styles from "../styles/Transcript.module.css";

export default function Transcript({ transcript }) {
  const { recapId } = useParams();
  const [text, setText] = useState([]);

  useEffect(() => {
    if (transcript) {
      setText(transcript);
    } else {
      const fetchTranscript = async () => {
        const data = await getTranscript(recapId);
        setText(data.raw_transcript || "No Transcript");
      };
      fetchTranscript();
    }
  }, [recapId, transcript]);

  return (
    <div className={styles.wrapper}>
      <h1>Transcript</h1>
      <p>{text}</p>
    </div>
  );
}
