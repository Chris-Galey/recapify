import { useState } from "react";
import { assemblyGenerateUrl } from "../api/Api";

export default function UserAudioUpload({ onUserUploadUrlChange }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log(selectedFile);
  const handleFileChange = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <input
          type="file"
          name="audio"
          accept=".mp3, .wav, .ogg"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      {isLoading && <p>Processing...</p>}
    </div>
  );
}
