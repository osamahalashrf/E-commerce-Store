import { Link } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CATEGORIES, CATEGORY } from "../../../Api/Api";
import { useEffect, useState } from "react";
import TableShow from "../../../Components/Dashboard/Table";

export default function Categories() {
  //States
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  //Get All Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATEGORIES}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    {
      key: "title",
      name: "title",
    },
    {
      key: "image",
      name: "Image",
    },
    {
      key: "created_at",
      name: "Created",
    },{
      key: "updated_at",
      name: "Updated",
    },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${CATEGORY}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="bg-white w-full px-5">
      <div className="flex items-center justify-between">
        <h1 className="text-center text-3xl text-stone-800 font-bold mt-3">
          Categories Page
        </h1>
        <Link
          to="/dashboard/category/add"
          className="py-2 px-6 mt-4 mr-1 border-0 rounded-md cursor-pointer bg-blue-600 text-lg text-white hover:bg-blue-800 duration-300"
        >
          Add Category
        </Link>
      </div>

      <TableShow
        header={header}
        data={categories}
        delete={handleDelete}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        loading={loading}
        total={total}
        search="title"
        searchLink={CATEGORY}
      />
    </div>
  );
}
