import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Transcript() {
  const { recapId } = useParams();
  const [transcript, setTranscript] = useState([]);
  console.log(transcript);
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
    <div>
      <h1>Transcript</h1>
      <p>{transcript ? transcript.raw_transcript : "No Transcript"}</p>
      <div>
        <button>Edit</button>
        <button>Save</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
