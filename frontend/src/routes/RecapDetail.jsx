import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecapDetail, updateTranscript, updateSummary } from "../api/Api";
import UserInput from "../components/UserInput";
import Customize from "../components/Customize";
import Transcript from "../components/Transcript";
import Summary from "../components/Summary";
import { assemblyGenerateTranscript } from "../api/Api";
import styles from "../styles/RecapDetail.module.css";

export default function RecapDetail() {
  const { recapId } = useParams();
  const [recap, setRecap] = useState([]);
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [customState, setCustomState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(url);
  useEffect(() => {
    setUrl("");
    setData([]);
    const handleRecap = async () => {
      const data = await getRecapDetail(recapId);
      setRecap(data);
    };
    handleRecap();
  }, [recapId]);

  const onUrlChange = (url) => {
    setUrl(url);
  };
  const onCustomStateChange = (newState) => {
    setCustomState(newState);
  };

  const handleUserRecap = async () => {
    try {
      if (!url) {
        alert("Please upload a file or enter a URL");
        return;
      }
      setIsLoading(true);
      const data = await assemblyGenerateTranscript(url, customState);
      await updateTranscript(recapId, data.text);
      await updateSummary(recapId, data.summary);
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.input}>
        <UserInput onUrlChange={onUrlChange} />
        <Customize
          customState={customState}
          onCustomStateChange={onCustomStateChange}
        />
      </div>
      <div className={styles.content}>
        <Transcript transcript={data.text} />
        <Summary summary={data.summary} />
      </div>
      <div>
        <button onClick={handleUserRecap}>Recapify!</button>
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
}
