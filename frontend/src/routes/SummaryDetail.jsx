import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SummaryDetail() {
  const { summaryId } = useParams();
  const { meetingId } = useParams();
  const [summary, setSummary] = useState({});
  useEffect(() => {
    const handleSummary = async () => {
      const data = await fetch(
        `http://127.0.0.1:8000/meetings/${meetingId}/summaries/${summaryId}/`
      );
      const res = await data.json();
      setSummary(res);
    };
    handleSummary();
  }, [summaryId, meetingId]);

  return (
    <div>
      <h2>{summary.content}</h2>
    </div>
  );
}
