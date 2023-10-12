import { useState } from "react";
// test url https://download.ted.com/talks/BodyStuffS002E001_Smell_2022V.mp3?apikey=acme-roadrunner
export default function UserAudioFile({ userUrl }) {
  const [selectedUrl, setSelectedUrl] = useState("");

  const handleUrlChange = (e) => {
    setSelectedUrl(e.target.value);
  };

  const handleUrlPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    setSelectedUrl(selectedUrl + paste);
  };
  const handleUserInput = () => {
    userUrl(selectedUrl);
    setSelectedUrl(null);
  };
  return (
    <div>
      <h1>Enter Audio URL</h1>
      <input
        type="text"
        value={selectedUrl}
        onPaste={handleUrlPaste}
        onChange={handleUrlChange}
      />
      <button onClick={handleUserInput}>Process Input</button>
    </div>
  );
}
