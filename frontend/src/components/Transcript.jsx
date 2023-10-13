import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/Transcript.module.css";
export default function Transcript({ generatedUrl }) {
  const { recapId } = useParams();
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    const handleTranscript = async () => {
      const data = await fetch(
        `http://127.0.0.1:8000/recaps/${recapId}/transcript/`
      );
      const res = await data.json();
      setTranscript(res);
    };
    handleTranscript();
  }, [recapId]);

  return (
    <div className={styles.wrapper}>
      <h1>Transcript</h1>
      <p>{transcript}</p>
    </div>
  );
}
