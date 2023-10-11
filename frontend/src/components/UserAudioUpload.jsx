import { useState } from "react";

export default function UserAudioUpload({ updateSelectedFile }) {
  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    updateSelectedFile(selectedFile);
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input
        type="file"
        accept=".mp3,.wav,.ogg"
        value={selectedFile}
        onChange={handleFileChange}
      />

      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </div>
  );
}
