import { useEffect, useRef, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATEGORIES, PRODUCT } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import uploadImage from "../../../assets/images/upload.png";
import "../Dashboard";

export default function AddProduct() {
  //state
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 33,
    discount: 0,
    About: "dummy",
    stock: 0,
  };

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [idCat, setIdCat] = useState();
  const nav = useNavigate();

  //Ref
  const foucs = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  //handle foucs
  useEffect(() => {
    foucs.current.focus();
  }, []);

  function handleOpenImage() {
    openImage.current.click();
  }

  //Get All Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);
  
  
  //handle Submit Form
  async function handleSubmitForm() {
    try {
      const res = await Axios.post(`${PRODUCT}/add`, dummyForm);
      setIdCat(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle Edit
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await Axios.post(`${PRODUCT}/edit/${idCat}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  //handleChange
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1);
    if (sent !== 1) {
      handleSubmitForm();
    }
  }

  //Handle Change Images

  const j = useRef(-1);

  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);

    const imagesAsFiles = e.target.files;

    const data = new FormData();
    for (let i = 0; i < imagesAsFiles.length; i++) {
      j.current++;
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", idCat);
      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  //Handle Delete Image
  async function handleImageDelete(key, img) {
    const findId = ids.current[key];
    try {
      const res = await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i !== findId);
      j.current--;
    } catch (err) {
      console.log(err);
    }
  }

  //mapping
  const categoryShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  const imagesShow = images.map((img, key) => (
    <div key={key} className="border p-2 w-full mt-3">
      <div className="flex items-center justify-between gap-2">
        <img src={URL.createObjectURL(img)} width="80px"></img>
        <div>
          <p className="mb-1">{img.name}</p>
          <p>
            {img.size / 1024 < 900
              ? (img.size / 1024).toFixed(2) + "KB"
              : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
          </p>
        </div>
        <button
        onClick={() => handleImageDelete(key, img)}
        className="bg-red-600 hover:bg-red-700 rounded py-2 px-5 text-white font-medium duration-200"
      >
        Delete
      </button>
      </div>
      <div className="custom-progress mt-6">
        <span
          ref={(e) => (progress.current[key] = e)}
          // percent={`${progress[key]}%`}

          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  return (
    <form onSubmit={handleEdit} className="bg-white w-full pt-4 px-5">
      {loading && <Loading />}
      <h1 className="text-4xl font-bold pb-1 text-stone-800">
        Add Product Page
      </h1>

      <div className="mb-5">
        <label
          htmlFor="category"
          className="text-lg text-gray-700 font-bold -top-5 left-0 transition-[0.4]"
        >
          Category
        </label>
        <select
          ref={foucs}
          name="category"
          value={form.category}
          onChange={handleChange}
          id="category"
          className="w-full border py-3 px-2 outline-none border-gray-300 rounded-md focus:shadow focus:shadow-cyan-400 focus-within:border-blue-400"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categoryShow}
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-lg text-gray-700 font-bold transition-[0.4]"
        >
          Title
        </label>
        <input
          required
          id="name"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="title..."
          className="w-full border py-2 px-2 outline-none border-gray-300 rounded-md focus:shadow focus:shadow-cyan-400 focus-within:border-blue-400"
          disabled={!sent}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="desc"
          className="text-lg text-gray-700 font-bold transition-[0.4]"
        >
          Description
        </label>
        <input
          required
          id="desc"
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder="description..."
          className="w-full border py-2 px-2 outline-none border-gray-300 rounded-md focus:shadow focus:shadow-cyan-400 focus-within:border-blue-400"
          disabled={!sent}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="price"
          className="text-lg text-gray-700 font-bold transition-[0.4]"
        >
          Price
        </label>
        <input
          required
          id="price"
          name="price"
          type="text"
          value={form.price}
          onChange={handleChange}
          placeholder="price..."
          className="w-full border py-2 px-2 outline-none border-gray-300 rounded-md focus:shadow focus:shadow-cyan-400 focus-within:border-blue-400"
          disabled={!sent}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="discount"
          className="text-lg text-gray-700 font-bold transition-[0.4]"
        >
          Discount
        </label>
        <input
          required
          id="discount"
          name="discount"
          type="text"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount..."
          className="w-full border py-2 px-2 outline-none border-gray-300 rounded-md focus:shadow focus:shadow-cyan-400 focus-within:border-blue-400"
          disabled={!sent}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="about"
          className="text-lg text-gray-700 font-bold transition-[0.4]"
        >
          About
        </label>
        <input
          required
          id="about"
          name="About"
          type="text"
          value={form.About}
          onChange={handleChange}
          placeholder="About..."
          className="w-full border py-2 px-2 outline-none border-gray-300 rounded-md focus:shadow focus:shadow-cyan-400 focus-within:border-blue-400"
          disabled={!sent}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="stock"
          className="text-lg text-gray-700 font-bold transition-[0.4]"
        >
          Stock
        </label>
        <input
          required
          id="stock"
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="stock..."
          className="w-full border py-2 px-2 outline-none border-gray-300 rounded-md focus:shadow focus:shadow-cyan-400 focus-within:border-blue-400"
          disabled={!sent}
        />
      </div>

      <div className="mt-3 space-y-1">
        <label htmlFor="img" className="text-lg font-bold transition-[0.4]">
          Images
        </label>
        <input
          ref={openImage}
          hidden
          id="img"
          type="file"
          multiple
          onChange={handleImagesChange}
          className="outline-none rounded-lg w-full py-2 px-3 border focus-within:border-blue-300"
          disabled={!sent}
        />
      </div>

      <div
        onClick={handleOpenImage}
        className="flex flex-col items-center justify-center gap-2 py-3 mb-2 rounded w-full"
        style={{
          border: !sent ? "3px dashed gray" : "3px dashed #0086fe",
          cursor: sent && "pointer",
        }}
      >
        <img
          src={uploadImage}
          alt="Upload Here"
          style={{ filter: !sent && "grayscale(1)", width: "100px" }}
        />
        <p
          style={{ color: !sent ? "gray" : "#0086fe" }}
          className="font-bold mb-0"
        >
          Upload Image
        </p>
      </div>

      <div className="flex flex-col items-start gap-2">{imagesShow}</div>

      <button className="py-2 px-6 my-5 w-full border-0 rounded-md cursor-pointer bg-blue-600 text-lg text-white hover:bg-blue-800 duration-200">
        Save
      </button>
    </form>
  );
}
