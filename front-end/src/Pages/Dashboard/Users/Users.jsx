import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";

export default function Users() {
  //States
  const [users, setUsers] = useState([]);
  //const [deleteUser, setDeleteUser] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  //Get Current User
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((res) => setCurrentUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  //Get All Usres
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USERS}?page=${page}&limit=${limit}`)
      .then((data)=>{
        setUsers(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [page, limit]);

  //Show Header
  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
    {
      key: "created_at",
      name: "Created",
    },{
      key: "updated_at",
      name: "Last Login",
    },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-full px-5 rounded">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-stone-800 font-bold mt-3">Users Page</h1>
        <Link
          to="/dashboard/user/add"
          className="py-2 px-6 mt-4 mr-1 border-0 rounded-md cursor-pointer bg-blue-600 text-lg text-white hover:bg-blue-800 duration-300"
        >
          Add User
        </Link>
      </div>

      <TableShow
        header={header}
        data={users}
        currentUser={currentUser}
        delete={handleDelete}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        loading={loading}
        total={total}
        search="name"
        searchLink={USER}
      />
    </div>
  );
}
