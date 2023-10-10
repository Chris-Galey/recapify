import { Outlet } from "react-router-dom";
import styles from "../styles/Recaps.module.css";
import RecapsNav from "../components/RecapsNav";

export default function Recaps() {
  return (
    <div className={styles.meeting_main}>
      <RecapsNav />
      <Outlet />
    </div>
  );
}
