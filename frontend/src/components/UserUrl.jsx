import styles from "../styles/UserUrl.module.css";

// test url https://download.ted.com/talks/BodyStuffS002E001_Smell_2022V.mp3?apikey=acme-roadrunner
export default function UserFile({ userUrl, onUserUrlChange }) {
  const handleUrlChange = (e) => {
    onUserUrlChange(e.target.value);
  };

  const handleUrlPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    onUserUrlChange(userUrl + paste);
  };
  return (
    <div className={styles.wrapper}>
      <label htmlFor="id">URL:</label>
      <input
        type="text"
        id="id"
        value={userUrl}
        placeholder="Enter direct link to audio file."
        onPaste={handleUrlPaste}
        onChange={handleUrlChange}
      />
    </div>
  );
}
