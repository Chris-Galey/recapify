import { useState, useEffect } from "react";
import UserAudioUrl from "./UserAudioUrl";
import UserAudioUpload from "./UserAudioUpload";
import styles from "../styles/UserInput.module.css";

export default function UserInput({ generatedUrl }) {
  const [customUrl, setCustomUrl] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [audioOption, setAudioOption] = useState("url");

  const userUrl = (url) => {
    setCustomUrl(url);
  };

  const userUploadUrl = (url) => {
    setUploadUrl(url);
  };
  useEffect(() => {
    if (audioOption === "url") {
      generatedUrl(customUrl);
      console.log(customUrl);
    } else if (audioOption === "upload") {
      generatedUrl(uploadUrl);
      console.log(uploadUrl);
    }
  }, [audioOption, customUrl, uploadUrl, generatedUrl]);

  return (
    <div className={styles.user__main}>
      <div className={styles.user__select}>
        <h1>UserInput</h1>
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
      </div>
      <div className={styles.user__input}>
        {audioOption == "url" ? (
          <UserAudioUrl userUrl={userUrl} />
        ) : (
          <UserAudioUpload userUploadUrl={userUploadUrl} />
        )}
      </div>
    </div>
  );
}
