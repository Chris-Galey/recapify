import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecapDetail } from "../api/Api";
import UserInput from "../components/UserInput";
import Customize from "../components/Customize";
import Transcript from "../components/Transcript";
import Summary from "../components/Summary";
import styles from "../styles/RecapDetail.module.css";

export default function RecapDetail() {
  const { recapId } = useParams();
  const [recap, setRecap] = useState([]);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const handleRecap = async () => {
      const data = await getRecapDetail(recapId);
      setRecap(data);
    };
    handleRecap();
  }, [recapId]);

  const audioUrl = (url) => {
    setUrl(url);
  };

  return (
    <div className={styles.wrapper}>
      <UserInput generatedUrl={audioUrl} />
      <Customize />
      <div className={styles.content}>
        <Transcript generatedUrl={url} />
        <Summary generatedUrl={url} />
      </div>
      {/* <button onClick={handleUserRecap}>Recapify!</button> */}
    </div>
  );
}
