import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserUrl from "./UserUrl";
import UserUpload from "./UserUpload";
import styles from "../styles/UserInput.module.css";

export default function UserInput({ onUrlChange }) {
  const { recapId } = useParams();
  const [userUrl, setUserUrl] = useState("");
  const [userUploadUrl, setUserUploadUrl] = useState("");
  const [audioOption, setAudioOption] = useState("url");
  const [currentUrl, setCurrentUrl] = useState("");
  const onUserUrlChange = (newUrl) => {
    setUserUrl(newUrl);
  };
  const onUserUploadUrlChange = (newUrl) => {
    setUserUploadUrl(newUrl);
  };

  useEffect(() => {
    if (audioOption === "url") {
      setCurrentUrl(userUrl);
      onUrlChange(userUrl);
    } else {
      setCurrentUrl(userUploadUrl);
      onUrlChange(userUploadUrl);
    }
  }, [audioOption, userUrl, userUploadUrl]);

  useEffect(() => {
    setUserUrl("");
    setUserUploadUrl("");
  }, [recapId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p>Current Url:{currentUrl ? currentUrl : null}</p>
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
          <UserUrl userUrl={userUrl} onUserUrlChange={onUserUrlChange} />
        ) : (
          <UserUpload onUserUploadUrlChange={onUserUploadUrlChange} />
        )}
      </div>
    </div>
  );
}
