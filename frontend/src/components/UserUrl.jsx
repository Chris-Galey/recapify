import { useState, useEffect } from "react";
import styles from "../styles/UserUrl.module.css";
// test url https://download.ted.com/talks/BodyStuffS002E001_Smell_2022V.mp3?apikey=acme-roadrunner
export default function UserFile({ userUrl }) {
  const [selectedUrl, setSelectedUrl] = useState("");

  useEffect(() => {
    userUrl(selectedUrl);
  }, [selectedUrl, userUrl]);

  const handleUrlChange = (e) => {
    setSelectedUrl(e.target.value);
  };

  const handleUrlPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    setSelectedUrl(selectedUrl + paste);
  };
  return (
    <div className={styles.wrapper}>
      <h1>Enter Audio URL</h1>
      <input
        type="text"
        value={selectedUrl}
        onPaste={handleUrlPaste}
        onChange={handleUrlChange}
      />
    </div>
  );
}
