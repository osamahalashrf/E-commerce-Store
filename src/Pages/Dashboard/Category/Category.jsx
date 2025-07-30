import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATEGORY } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function Category() {

    //state
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // Fetched Id
  //const id = Number(window.location.pathname.replace("/dashboard/categories/", ""));
  //console.log(id)

  const { id } = useParams()

  useEffect(() => {
    setLoading(true);
    Axios.get(`${CATEGORY}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => nav("/dashboard/categories/page/404", { replace: true }));
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATEGORY}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories";
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
        <label htmlFor="title" className=" text-lg font-bold transition-[0.4]">
          Title
        </label>
        <input
          required
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title..."
          className=" py-5 px-5 outline-none rounded border-0 bg-white w-full border-b[3px,solid,transparent] font-[Lato,sans-serif] shadow-[0_0_10px_rgb(153,152,152)inset]"
        />
      </div>

      <div className="mt-3 space-y-1">
            <label htmlFor="img" className="text-lg font-bold transition-[0.4]">
              Image
            </label>
            <input
              id="img"
              type="file"
              placeholder="Password..."
              onChange={(e) => setImage(e.target.files.item(0))}
              className="outline-none rounded-lg w-full py-2 px-3 border focus-within:border-blue-300"
            />
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
