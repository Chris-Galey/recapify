import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserInput from "../components/UserInput";
import Customize from "../components/Customize";
import Transcript from "../components/Transcript";
import Summary from "../components/Summary";
import styles from "../styles/RecapDetail.module.css";

export default function RecapDetail() {
  const { recapId } = useParams();
  const [recap, setRecap] = useState({});
  const [url, setUrl] = useState(null);
  console.log(url);
  useEffect(() => {
    const handleRecap = async () => {
      const data = await fetch(`http://127.0.0.1:8000/recaps/${recapId}/`);
      const res = await data.json();
      setRecap(res);
    };
    handleRecap();
  }, [recapId]);

  const audioUrl = (url) => {
    setUrl(url);
  };

  const handleUserRecap = async () => {};
  return (
    <div className={styles.wrapper}>
      <UserInput generatedUrl={audioUrl} />
      <Customize />
      <div className={styles.content}>
        <Transcript generatedUrl={url} />
        <Summary generatedUrl={url} />
      </div>
      <button onClick={handleUserRecap}>Recapify!</button>
    </div>
  );
}
