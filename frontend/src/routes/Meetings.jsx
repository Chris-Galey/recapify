import { Outlet } from "react-router-dom";
import styles from "../styles/Meetings.module.css";
import MeetingsNav from "../components/MeetingsNav";

export default function Meetings() {
  return (
    <div className={styles.meeting_main}>
      <MeetingsNav />
      <Outlet />
    </div>
  );
}
