import { useState } from "react";
import { createUrlApi } from "../api/AssemblyApi";

export default function UserAudioUpload({
  userUploadUrl,
  onUserUploadUrlChange,
}) {
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUserInput = async () => {
    if (selectedFile) {
      const generatedUrl = await createUrlApi(selectedFile);
      onUserUploadUrlChange(generatedUrl);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".mp3,.wav,.ogg"
        id="file"
        onChange={handleFileChange}
      />
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      <button onClick={handleUserInput}>Upload</button>
    </div>
  );
}
