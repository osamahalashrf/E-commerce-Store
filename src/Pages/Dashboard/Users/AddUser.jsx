import { useEffect, useRef, useState } from "react";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  //Ref
  const focus = useRef("");

  //handle focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white w-full pt-4 px-5">
      {loading && <Loading />}
      <h1 className="text-4xl font-bold pb-2 text-stone-800">
        Add User Page
      </h1>
      <div className="mb-5">
        <label htmlFor="name" className=" text-lg font-bold transition-[0.4]">
          User Name
        </label>
        <input
          required
          ref={focus}
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name.."
          className="w-full border py-3 px-2 outline-none border-gray-300 rounded-md focus:shadow focus:shadow-cyan-400 focus-within:border-blue-400"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className=" text-lg font-bold -top-5 left-0 transition-[0.4]"
        >
          Email
        </label>
        <input
          required
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email.."
          className="w-full border py-3 px-2 outline-none border-gray-300 rounded-md focus:shadow focus:shadow-cyan-400 focus-within:border-blue-400"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className=" text-lg font-bold -top-5 left-0 transition-[0.4]"
        >
          Password
        </label>
        <input
          required
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password.."
          className="w-full border py-3 px-2 outline-none border-gray-300 rounded-md focus:shadow focus:shadow-cyan-400 focus-within:border-blue-400"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="role"
          className=" text-lg font-bold -top-5 left-0 transition-[0.4]"
        >
          Role
        </label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter your role.."
          className="w-full border py-3 px-2 outline-none border-gray-300 rounded-md focus:shadow focus:shadow-cyan-400 focus-within:border-blue-400"
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="1995">Admin</option>
          <option value="1996">Writter</option>
          <option value="1999">Product Manger</option>
          <option value="2001">User</option>
        </select>
      </div>

      <button
        disabled={
          name.length > 1 &&
          email.length > 1 &&
          password.length > 6 &&
          role !== ""
            ? false
            : true
        }
        className="py-2 px-6 border-0 rounded-md cursor-pointer bg-blue-600 text-lg text-white hover:bg-blue-800 duration-300"
      >
        Save
      </button>
    </form>
  );
}
