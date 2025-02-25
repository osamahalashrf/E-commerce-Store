import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard relative">
      <TopBar />
      <div style={{marginTop: "70px"}} className="flex gap-4">
      <SideBar />
      <Outlet />
      </div>
    </div>
  );
}
