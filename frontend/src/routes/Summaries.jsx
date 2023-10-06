import { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";

export default function Summaries() {
  const { meetingId } = useParams();
  const [summaries, setSummaries] = useState([]);
  console.log(summaries);
  useEffect(() => {
    const handleSummaries = async () => {
      const data = await fetch(
        `http://127.0.0.1:8000/meetings/${meetingId}/summaries/`
      );
      const res = await data.json();
      setSummaries(res);
    };
    handleSummaries();
  }, [meetingId]);

  return (
    <div>
      <button>New Summary</button>
      <ul>
        {summaries.map((summary) => (
          <li key={summary.id}>
            <Link to={`${summary.id}/`}>{summary.content}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
