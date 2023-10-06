import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Transcript() {
  const { meetingId } = useParams();
  const [transcript, setTranscript] = useState({});
  console.log(transcript);
  useEffect(() => {
    const handleTranscript = async () => {
      const data = await fetch(
        `http://127.0.0.1:8000/meetings/${meetingId}/transcript/`
      );
      const res = await data.json();
      setTranscript(res);
    };
    handleTranscript();
  }, [meetingId]);

  return (
    <div>
      <h1>Transcript</h1>
      <p>{transcript.raw_transcript}</p>
      <div>
        <button>Start</button>
        <button>Stop</button>
        <button>Reset</button>
        <button>Process</button>
      </div>
    </div>
  );
}
