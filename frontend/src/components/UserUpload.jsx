import { useState, useRef } from "react";
import { assemblyGenerateUrl } from "../api/Api";
import styles from "../styles/UserUpload.module.css";

export default function UserUpload({ onUserUploadUrlChange }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log(selectedFile);
  const fileRef = useRef();
  console.log(selectedFile, fileRef);
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
    <div className={styles.upload_wrapper}>
      <form
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
        className={styles.upload_form}
      >
        <div className={styles.upload_file}>
          <label htmlFor="file" className={styles.file_input_container}>
            Choose File
          </label>
          <input
            id="file"
            type="file"
            name="audio"
            accept=".mp3, .wav, .ogg"
            onChange={handleFileChange}
            ref={fileRef}
            className={styles.file_input}
          />

          <button className={styles.upload_button} type="submit">
            Upload
          </button>
          {isLoading && <p>Processing...</p>}
        </div>
        <p>
          Current File: {selectedFile ? selectedFile.name : "No File Selected"}
        </p>
      </form>
    </div>
  );
}
