import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTranscript } from "../api/Api";
import styles from "../styles/Transcript.module.css";

export default function Transcript({ transcript }) {
  const { recapId } = useParams();
  const [text, setText] = useState();

  useEffect(() => {
    const handleInitialData = async () => {
      const transcriptData = await getTranscript(recapId);
      console.log(transcriptData);
      setText(transcriptData.raw_transcript);
    };
    handleInitialData();
  }, [recapId]);

  useEffect(() => {
    setText(transcript);
  }, [recapId, transcript]);

  return (
    <div className={styles.wrapper}>
      <h1>Transcript</h1>
      <p>{text ? text : "No Transcript"}</p>
    </div>
  );
}
