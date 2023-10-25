import { useState, useEffect } from "react";
import TranscriptContent from "./TranscriptContent";
import { getTranscript } from "../api/Api";
import { useParams } from "react-router-dom";
import styles from "../styles/Transcript.module.css";

export default function Transcript({ transcript, confidence, autoHighlights }) {
  console.log(transcript, confidence, autoHighlights);
  const [text, setText] = useState("");
  const { recapId } = useParams();
  useEffect(() => {
    setText("");
    if (!transcript) {
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
        <h3>Transcript</h3>
      </div>
      {(transcript && autoHighlights.results.length > 0 && (
        <TranscriptContent
          transcript={transcript}
          confidence={confidence}
          autoHighlights={autoHighlights}
        />
      )) || (
        <div className={styles.no_transcript}>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}
