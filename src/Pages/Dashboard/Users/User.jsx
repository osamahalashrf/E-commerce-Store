import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // Fetched Id
  const { id }= useParams();
  //console.log(id)

  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => nav("/dashboard/users/page/404", { replace: true }));
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
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
      <h1 className="text-4xl font-bold pb-5 text-stone-800">
        Information Updated
      </h1>
      <div className="mb-5">
        <label htmlFor="name" className=" text-lg font-bold transition-[0.4]">
          User Name
        </label>
        <input
          required
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name.."
          className=" py-5 px-5 outline-none rounded border-0 bg-white w-full border-b[3px,solid,transparent] font-[Lato,sans-serif] shadow-[0_0_10px_rgb(153,152,152)inset]"
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
          className=" py-5 px-5 outline-none rounded border-0 bg-white w-full border-b[3px,solid,transparent] font-[Lato,sans-serif] shadow-[0_0_10px_rgb(153,152,152)inset]"
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
          className=" py-5 px-5 outline-none rounded border-0 bg-white w-full border-b[3px,solid,transparent] font-[Lato,sans-serif] shadow-[0_0_10px_rgb(153,152,152)inset]"
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="1995">Admin</option>
          <option value="1996">Writter</option>
          <option value="2001">User</option>
        </select>
      </div>

      <button
        disabled={disable}
        className="py-2 px-6 border-0 rounded-md cursor-pointer bg-blue-600 text-lg text-white hover:bg-blue-800 duration-300"
      >
        Save
      </button>
    </form>
  );
}
