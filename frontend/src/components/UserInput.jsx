import { useState } from "react";
import UserUrl from "./UserUrl";
import UserUpload from "./UserUpload";
import styles from "../styles/UserInput.module.css";

export default function UserInput({ generatedUrl }) {
  const [url, setUrl] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [audioOption, setAudioOption] = useState("url");

  const userUrl = (url) => {
    setUrl(url);
  };

  const userUploadUrl = (url) => {
    setUploadUrl(url);
  };
  const handleSaveUrl = () => {
    if (audioOption === "url") {
      setCurrentUrl(url);
      generatedUrl(currentUrl);
      // save to db
    } else {
      setCurrentUrl(uploadUrl);
      generatedUrl(currentUrl);
      // save to db
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>UserInput</h1>
        <p>Current File: {currentUrl}</p>
      </div>

      <div className={styles.select}>
        <label htmlFor="input">
          Input Type:
          <select
            name="input"
            id="input"
            onChange={(e) => {
              setAudioOption(e.target.value);
            }}
          >
            <option value="url">URL</option>
            <option value="upload">Upload</option>
          </select>
        </label>
      </div>

      <div className={styles.input}>
        {audioOption == "url" ? (
          <UserUrl userUrl={userUrl} />
        ) : (
          <UserUpload userUploadUrl={userUploadUrl} />
        )}
      </div>
      <button onClick={handleSaveUrl}>Generate Link</button>
    </div>
  );
}
