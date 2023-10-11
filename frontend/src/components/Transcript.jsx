import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createUrlApi, summarizeApi } from "../api/AssemblyApi";

export default function Transcript({ audioInput }) {
  const { recapId } = useParams();
  const [transcript, setTranscript] = useState([]);
  console.log(audioInput);
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

  // const handleFetchTranscript = async (audioInput) => {
  //   console.log(audioInput);
  //   if (transcript != null) {
  //     const audioUrl = await createUrlApi(audioInput);
  //     const transcript = await summarizeApi(audioUrl);
  //     console.log(transcript);
  //   } else {
  //     console.log("Transcript already exists");
  //   }
  // };

  return (
    <div>
      <h1>Transcript</h1>
      <p>{transcript ? transcript.raw_transcript : "No Transcript"}</p>
      <div>
        <button>Save</button>
        <button>Delete</button>
        {/* <button onClick={handleFetchTranscript}>Get Transcript</button> */}
      </div>
    </div>
  );
}
