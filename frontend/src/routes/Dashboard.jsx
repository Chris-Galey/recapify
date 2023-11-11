import styles from "../styles/Dashboard.module.css";
import { Outlet } from "react-router-dom";
export default function Dashboard() {
  return (
    <div className={styles.dash_wrapper}>
      <Outlet />
    </div>
  );
}
