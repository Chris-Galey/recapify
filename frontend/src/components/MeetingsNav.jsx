import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/MeetingsNav.module.css";

export default function MeetingsNav() {
  const [meetings, setMeetings] = useState([]);
  console.log(meetings);
  useEffect(() => {
    const handleAllMeetings = async () => {
      const data = await fetch("http://127.0.0.1:8000/meetings/");
      const res = await data.json();
      console.log(res);
      setMeetings(res);
    };
    handleAllMeetings();
  }, []);
  return (
    <>
      <div className={styles.sidebar}>
        <h1>Meetings</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search Meetings"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            {meetings.map((meeting) => {
              return (
                <li key={meeting.id}>
                  <Link to={`/meetings/${meeting.id}`}>
                    <h2>{meeting.title}</h2>
                    <p>{meeting.description}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
