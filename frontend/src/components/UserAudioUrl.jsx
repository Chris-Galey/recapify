import { useState } from "react";
// test url https://download.ted.com/talks/BodyStuffS002E001_Smell_2022V.mp3?apikey=acme-roadrunner
export default function UserAudioFile({ updateSelectedURL }) {
  const [selectedURL, setSelectedURL] = useState(null);

  //   const fetchSummary = async () => {
  //     const audioUrl = selectedURL;
  //     const summary = await summarizeApi(audioUrl);
  //     console.log(summary);
  //   };
  const handleURLChange = (e) => {
    const url = e.target.value;
    setSelectedURL(url);
    updateSelectedURL(selectedURL);
  };
  return (
    <div>
      <h1>Enter Audio URL</h1>
      <input type="text" onChange={handleURLChange} />
    </div>
  );
}
