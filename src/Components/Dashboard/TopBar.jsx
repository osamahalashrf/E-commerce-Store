import "./Bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/axios";
import { LOGOUT, USER } from "../../Api/Api";
import { Link, Navigate } from "react-router-dom";
import BtnLogout from "./BtnLogout";
import Cookie from "cookie-universal"

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;


  const cookie = Cookie()

  const [name, setName] = useState("");
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);

  //Handle Logout
  async function handleLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce")
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="top-bar text-2xl">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-7">
          <Link to="/" className="text-blue-600 hover:text-blue-800">E-Commerce</Link>
          <FontAwesomeIcon
            className="text-blue-600"
            onClick={() => setIsOpen((prev) => !prev)}
            cursor={"pointer"}
            icon={faBars}
          />
        </div>
        <div className="">
          {/* تمرير اسم المستخدم ودالة الخروج للمكوّن */}
          <BtnLogout username={name} onLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
}
