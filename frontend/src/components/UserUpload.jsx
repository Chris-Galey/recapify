import { useState } from "react";
import { assemblyGenerateUrl } from "../api/Api";

export default function UserAudioUpload({ onUserUploadUrlChange }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUserInput = async () => {
    try {
      if (selectedFile) {
        setIsLoading(true);
        const generatedUrl = await assemblyGenerateUrl(selectedFile);
        onUserUploadUrlChange(generatedUrl);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
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
      <button onClick={handleUserInput}>Upload</button>
      {isLoading && <p>Processing...</p>}
    </div>
  );
}
