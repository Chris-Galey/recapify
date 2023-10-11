import { useState } from "react";

export default function UserAudioUpload({ updateSelectedFile }) {
  const [selectedFile, setSelectedFile] = useState(null);

  //   const fetchSummary = async () => {
  //     const audioUrl = await createUrlApi(selectedFile);
  //     const summary = await summarizeApi(audioUrl);
  //     console.log(summary);
  //   };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    updateSelectedFile(selectedFile);
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" accept=".mp3,.wav,.ogg" onChange={handleFileChange} />

      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          {/* Display additional information about the selected file */}
          <p>File Type: {selectedFile.type}</p>
          <p>File Size: {selectedFile.size} bytes</p>
        </div>
      )}
    </div>
  );
}
