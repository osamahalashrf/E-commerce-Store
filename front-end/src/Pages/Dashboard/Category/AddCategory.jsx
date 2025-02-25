import { useEffect, useRef, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATEGORY } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddCategory() {
  //state
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
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
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATEGORY}/add`, form);
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
        Add Category Page
      </h1>
      <div className="mb-5">
        <label htmlFor="name" className="text-lg font-bold transition-[0.4]">
          Title
        </label>
        <input
          required
          ref={focus}
          id="name"
          name="name"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title..."
          className="w-full border py-2 px-2 outline-none border-gray-300 rounded-md focus:shadow focus:shadow-cyan-400 focus-within:border-blue-400"
        />
      </div>

      <div className="mt-3 space-y-1">
        <label htmlFor="img" className="text-lg font-bold transition-[0.4]">
          Image
        </label>
        <input
          id="img"
          type="file"
          onChange={(e) => setImage(e.target.files.item(0))}
          className="outline-none rounded-lg w-full py-2 px-3 border focus-within:border-blue-300"
        />
      </div>

      <button
        disabled={title.length > 1 ? false : true}
        className="py-2 px-6 mt-5 border-0 rounded-md cursor-pointer bg-blue-600 text-lg text-white hover:bg-blue-800 duration-300"
      >
        Save
      </button>
    </form>
  );
}
