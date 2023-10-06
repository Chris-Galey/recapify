import { Outlet, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/MeetingDetail.module.css";

export default function MeetingDetail() {
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState({});

  useEffect(() => {
    const handleMeeting = async () => {
      const data = await fetch(`http://127.0.0.1:8000/meetings/${meetingId}/`);
      const res = await data.json();
      setMeeting(res);
    };
    handleMeeting();
  }, [meetingId]);

  return (
    <div className={styles.main}>
      <h2>{meeting.title}</h2>
      <p>{meeting.description}</p>
      <p>{meeting.created_at}</p>
      <Link to="transcript"> View Transcript</Link>
      <Link to="summaries"> View Summary</Link>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
