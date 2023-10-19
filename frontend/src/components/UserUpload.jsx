import { useState, useRef } from "react";
import { assemblyGenerateUrl } from "../api/Api";

export default function UserAudioUpload({ onUserUploadUrlChange }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef();
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
        fileRef.current.value = null;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
    }
  };
  // const handleReset = () => {
  //   fileRef.current.value = null;
  // };
  return (
    <div>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <input
          type="file"
          name="audio"
          accept=".mp3, .wav, .ogg"
          onChange={handleFileChange}
          ref={fileRef}
        />
        <button type="submit">Upload</button>
        {/* <button type="button" onClick={handleReset}>
          Reset
        </button> */}
      </form>
      {isLoading && <p>Processing...</p>}
    </div>
  );
}
