import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL, LOGIN } from "../../../Api/Api";
import Cookie from "cookie-universal";
import Loading from "../../../Components/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  //state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Error Mssage
  const [err, setErr] = useState("");

  //Ref
  const foucs = useRef("");

  useNavigate
  const nav = useNavigate();

  //Loading
  const [loading, setLoading] = useState(false);

  //cookie
  const cookie = Cookie();

  // handle form change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //handle foucs
  useEffect(() => {
    foucs.current.focus();
  }, []);

  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    //setErr("");
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      setLoading(false);
      const token = res.data.token;
      const role = res.data.user.role;
      const go = role === "1995" ? "users" : "writer";
      cookie.set("e-commerce", token);
      window.location.pathname = `/dashboard/${go}`;
      //nav(`/dashboard/${go}`);
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("Wrong Email Or Password!");
      } else {
        setErr("Internal Server ERR!");
      }
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="container my-0 mx-auto">
        <div className="row flex items-center justify-center h-lvh">
          <form
            onSubmit={handleSubmit}
            className="form w-full h-[30rem] rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.3)] p-5"
          >
            <div className="costum-form md:w-1/2">
              <h1 className="text-4xl font-bold pb-5">Login Now</h1>
              <div className="form-controller mb-5 relative">
                <input
                  required
                  ref={foucs}
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your Email.."
                  className="block py-5 px-5 outline-none rounded border-0 bg-white w-full md:w-4/5 border-b[3px,solid,transparent] font-[Lato,sans-serif] shadow-[0_0_10px_rgb(153,152,152)inset]"
                />
                <label
                  htmlFor="email"
                  className="block text-xs text-gray-400 font-bold absolute -top-5 left-0 transition-[0.4]"
                >
                  Email:
                </label>
              </div>

              <div className="mb-3">
                <input
                  required
                  minLength={6}
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your Password.."
                  className="block py-5 px-5 outline-none rounded border-0 bg-white w-full md:w-4/5 border-b[3px,solid,transparent] font-[Lato,sans-serif] shadow-[0_0_10px_rgb(153,152,152)inset]"
                />
                <label
                  htmlFor="password"
                  className="block text-xs text-gray-400 font-bold absolute -top-5 left-0 transition-[0.4]"
                >
                  Password:
                </label>
              </div>
              <div className="flex items-center gap-8">
                <button className="py-2 px-6 border-0 rounded-md cursor-pointer bg-green-500 text-lg text-white hover:bg-green-600 duration-300">
                  Login
                </button>
                <div className="sign-up text-blue-500 hover:text-gray-400">
                  <Link to={"/register"} className="underline">
                    Go To Register
                  </Link>
                </div>
              </div>

              <div className="google-btn w-[184px] h-11 bg-blue-500 rounded-sm shadow-[0_3px_4px_0_rgba(0,0,0,0.25)] cursor-pointer select-none mt-8 hover:shadow-[0_0_6px] hover:shadow-blue-500 active:bg-blue-700">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper absolute my-1 ml-1 w-10 h-10 rounded-sm bg-orange-100">
                    <img
                      src="http://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt="sign in with google"
                      className="google-icon absolute mt-3 ml-3 w-5 h-5"
                    />
                  </div>
                  <p className="btn-text float-right mt-3 mr-3 mb-0 ml-1 text-orange-100 text-sm tracking-extra-wide">
                    <b> Sign in with google</b>
                  </p>
                </a>
              </div>

              {err !== "" && (
                <span className="block w-full md:w-4/5 bg-orange-200 text-red-500 py-4 px-5 mt-5 rounded-xl">
                  {err}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
