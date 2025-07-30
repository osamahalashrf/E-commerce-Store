import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { Axios } from "../../../Api/axios";
import Err403 from "../Errors/403";

export default function RequireAuth({ allowedRole }) {
  //user
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );



  // const [user, setUser] = useState("");
  // const [isLoading, setIsLoading] = useState(true); // حالة اللودينج
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // التأكد من أن الكوكي موجود
  //   const cookie = Cookie();
  //   const token = cookie.get("e-commerce");

  //   if (!token) {
  //     navigate("/login", { replace: true });
  //     return;
  //   }

  //   // طلب بيانات المستخدم
  //   Axios.get(`/${USER}`)
  //     .then((data) => {
  //       setUser(data.data);
  //       setIsLoading(false); // إخفاء اللودينج
  //     })
  //     .catch(() => {
  //       setIsLoading(false); // إخفاء اللودينج عند الفشل
  //       navigate("/login", { replace: true });
  //     });
  // }, [navigate]);

  // // عرض المحتوى بناءً على حالة اللودينج والتوكن
  // return isLoading ? (
  //   <Loading />
  // ) : user && allowedRole.includes(user.role) ? (
  //   <Outlet />
  // ) : (
  //   <Err403 role={user.role} />
  // );

}
