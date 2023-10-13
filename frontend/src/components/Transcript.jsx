import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTranscript } from "../api/Api";
import styles from "../styles/Transcript.module.css";

export default function Transcript() {
  const { recapId } = useParams();
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    const handleTranscript = async () => {
      const data = await getTranscript(recapId);
      if (data) {
        setTranscript(data);
      } else {
        setTranscript([]);
      }
    };
    handleTranscript();
  }, [recapId]);

  return (
    <div className={styles.wrapper}>
      <h1>Transcript</h1>
      <p>{transcript ? transcript.raw_transcript : "No Transcript"}</p>
    </div>
  );
}
