import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SummaryDetail() {
  const { summaryId } = useParams();
  const { recapId } = useParams();
  const [summary, setSummary] = useState({});
  useEffect(() => {
    const handleSummary = async () => {
      const data = await fetch(
        `http://127.0.0.1:8000/recaps/${recapId}/summaries/${summaryId}/`
      );
      const res = await data.json();
      setSummary(res);
    };
    handleSummary();
  }, [summaryId, recapId]);

  return (
    <div>
      <p>{summary.content}</p>
      <button>Edit</button>
      <button>Save</button>
      <button>AI Summary</button>
      <button>Delete</button>
    </div>
  );
}
