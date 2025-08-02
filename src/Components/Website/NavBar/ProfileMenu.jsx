import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function ProfileMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const cookie = Cookie();

  useEffect(() => {
    const token = cookie.get("e-commerce");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    cookie.remove("e-commerce");
    navigate("/login");
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FontAwesomeIcon
        icon={faUserCircle}
        className="text-3xl text-gray-700 dark:text-white cursor-pointer"
      />

      {isHovered && (
        <div className="absolute right-0 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/dashboard/users")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
