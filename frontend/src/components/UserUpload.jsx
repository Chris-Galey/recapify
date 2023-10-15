import { useState } from "react";
import { createUrlApi } from "../api/AssemblyApi";

export default function UserAudioUpload({ userUploadUrl }) {
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUserInput = async () => {
    if (selectedFile) {
      const generatedUrl = await createUrlApi(selectedFile);
      userUploadUrl(generatedUrl);
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" accept=".mp3,.wav,.ogg" onChange={handleFileChange} />

      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      <button onClick={handleUserInput}>Upload</button>
    </div>
  );
}
