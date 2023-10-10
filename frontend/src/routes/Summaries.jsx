import { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";

export default function Summaries() {
  const { recapId } = useParams();
  const [summaries, setSummaries] = useState([]);
  console.log(summaries);
  useEffect(() => {
    const handleSummaries = async () => {
      const data = await fetch(
        `http://127.0.0.1:8000/recaps/${recapId}/summaries/`
      );
      const res = await data.json();
      setSummaries(res);
    };
    handleSummaries();
  }, [recapId]);

  return (
    <div>
      <ul>
        <h3>Summaries</h3>
        <button>New Summary</button>
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
