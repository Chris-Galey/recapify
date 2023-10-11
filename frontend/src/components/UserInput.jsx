import { useState } from "react";
import UserAudioUrl from "./UserAudioUrl";
import UserAudioUpload from "./UserAudioUpload";
export default function UserInput() {
  const [selectedUrl, setSelectedUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioOption, setAudioOption] = useState("url");
  const updateSelectedUrl = (url) => {
    setSelectedUrl(url);
  };
  const updateSelectedFile = (file) => {
    setSelectedFile(file);
  };
  return (
    <div>
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
      {audioOption == "url" ? (
        <UserAudioUrl updateSelectedUrl={updateSelectedUrl} />
      ) : (
        <UserAudioUpload updateSelectedFile={updateSelectedFile} />
      )}
      <button>Upload</button>
    </div>
  );
}
