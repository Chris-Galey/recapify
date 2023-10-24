import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTranscript } from "../api/Api";
import styles from "../styles/Transcript.module.css";

export default function Transcript({ transcript, confidence, autoHighlights }) {
  const { recapId } = useParams();
  const [text, setText] = useState([]);
  const [conf, setconf] = useState();
  console.log(conf, autoHighlights, transcript);
  useEffect(() => {
    if (transcript) {
      setText(transcript);
      setconf(confidence);
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
      <div className={styles.transcript_header}>
        <h2>Transcript</h2>
      </div>
      <p>Confidence: {conf ? conf.toFixed(2) : null}</p>
      <div className={styles.transcript_content}>{text}</div>
    </div>
  );
}
