import { Link } from "react-router-dom";
import "./403.css";

export default function Err403({ role }) {
  return (
    <div className="text-wrapper">
      <div className="title" data-content={403}>
        403 - ACCESS DENIED
      </div>
      <div className="subtitle">
        Oops, You dont have permission to access this page.
        <Link
          to={role === "1996" ? "/dashboard/writer" : "/"}
          className="block text-center text-white rounded-lg w-full bg-blue-600 hover:bg-blue-700 py-2 px-3"
        >
          {role === "1996" ? "Go To Writer Page" : "Go To Home Page"}
        </Link>
      </div>
    </div>
  );
}
