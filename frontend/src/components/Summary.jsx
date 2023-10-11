import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SummaryDetail() {
  const { recapId } = useParams();
  const [summary, setSummary] = useState({});
  useEffect(() => {
    const handleSummary = async () => {
      const data = await fetch(
        `http://127.0.0.1:8000/recaps/${recapId}/summary/`
      );
      const res = await data.json();
      setSummary(res);
    };
    handleSummary();
  }, [recapId]);

  return (
    <div>
      <h3>Summary</h3>
      <p>{summary.content}</p>
      <button>Recapify</button>
      <button>Save</button>
      <button>Delete</button>
    </div>
  );
}
