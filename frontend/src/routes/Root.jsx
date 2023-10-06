import { Outlet } from "react-router-dom";
import RootHeader from "../components/RootHeader";

export default function Root() {
  return (
    <>
      <RootHeader />
      <Outlet />
    </>
  );
}
