import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecapDetail, updateTranscript, updateSummary } from "../api/Api";
import UserInput from "../components/UserInput";
import Customize from "../components/Customize";
import Transcript from "../components/Transcript";
import Summary from "../components/Summary";
import { transcriptResultApi } from "../api/AssemblyApi";
import styles from "../styles/RecapDetail.module.css";

export default function RecapDetail() {
  const { recapId } = useParams();
  const [recap, setRecap] = useState([]);
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleRecap = async () => {
      const data = await getRecapDetail(recapId);
      setRecap(data);
    };
    handleRecap();
  }, [recapId]);

  const generatedUrl = (url) => {
    setUrl(url);
  };

  const handleUserRecap = async () => {
    if (!url) {
      alert("Please upload a file");
      return;
    } else {
      const data = await transcriptResultApi(url);
      console.log(data);
      setData(data);
    }
  };

  const handleSaveRecap = async () => {
    const updateTranscriptResponse = await updateTranscript(recapId, data.text);
    const updateSummaryResponse = await updateSummary(recapId, data.summary);
    console.log(updateTranscriptResponse, updateSummaryResponse);
  };

  return (
    <div className={styles.wrapper}>
      <h1>{recap.title}</h1>
      <UserInput generatedUrl={generatedUrl} />
      <Customize sharedState={sharedState} />
      <div className={styles.content}>
        <Transcript transcript={data.text} />
        <Summary summary={data.summary} />
      </div>
      <div>
        <button onClick={handleUserRecap}>Recapify!</button>
        <button onClick={handleSaveRecap}>Save Recap</button>
        <p>Status: {data.status}</p>
      </div>
    </div>
  );
}
