import { useState } from "react";
import UserAudioUrl from "./UserAudioUrl";
import UserAudioUpload from "./UserAudioUpload";
import styles from "../styles/UserInput.module.css";
export default function UserInput({ audioInput }) {
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioOption, setAudioOption] = useState("url");
  console.log(selectedUrl);
  const updateSelectedUrl = (updateSelectedUrl) => {
    setSelectedUrl(updateSelectedUrl);
  };
  const updateSelectedFile = (file) => {
    setSelectedFile(file);
  };
  const handleAudio = () => {
    if (audioOption == "url") {
      audioInput(selectedUrl);
    } else if (audioOption == "upload") {
      audioInput(selectedFile);
    }
  };
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
          <UserAudioUrl updateSelectedUrl={updateSelectedUrl} />
        ) : (
          <UserAudioUpload updateSelectedFile={updateSelectedFile} />
        )}
      </div>
      <button onClick={handleAudio}>Done</button>
    </div>
  );
}
