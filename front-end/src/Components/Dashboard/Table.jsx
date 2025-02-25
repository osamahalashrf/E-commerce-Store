import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PaginatedItems from "../Dashboard/Pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import TransformDate from "../../helpers/TransformDate";

export default function TableShow(props) {
  const currentUser = props.currentUser || {
    name: "",
  };

  // const start = (props.page - 1) * props.limit;
  // const end = Number(start) + Number(props.limit);
  // const final = props.data.slice(start, end);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filteredDataByDate =
    date.length !== 0
      ? props.data.filter((item) => TransformDate(item.created_at) === date)
      : props.data;

  const filterSearchByDate =
    date.length !== 0
      ? filteredData.filter((item) => TransformDate(item.created_at) === date)
      : filteredData;

  const showWhichData =
    search.length > 0 ? filterSearchByDate : filteredDataByDate;

  async function getSearchData() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFilteredData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchData() : setSearchLoading(false);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  //header show
  const headerShow = props.header.map((item, key) => (
    <th key={key} className="py-4 text-lg md:text-xl">
      {item.name}
    </th>
  ));

  //body show
  const dataShow = showWhichData.map((item, key) => (
    <tr key={key} className="odd:bg-neutral-400 even:bg-white">
      <td className="py-3">{key+1}</td>
      {props.header.map((item2, key2) => (
        <td key={key2} className="text-center text-sm md:text-lg col-span-12 py-3">
          {item2.key === "image" ? (
            <div className="flex justify-center">
              <img width={"50px"} src={item[item2.key]} alt="" />
            </div>
          ) : item2.key === "images" ? (
            <div className="flex items-center justify-start flex-wrap gap-2">
              {item[item2.key].map((img,key) => (
                <img width="50px" src={img.image} alt="" key={key} />
              ))}
            </div>
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDate(item[item2.key])
          ) : item[item2.key] === "1995" ? (
            "Admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1996" ? (
            "Writter"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : (
            item[item2.key]
          )}
          {currentUser && item[item2.key] === currentUser.name && " (You) "}
        </td>
      ))}
      <td className="flex items-center justify-center gap-4 py-3">
        <Link to={`${item.id}`}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            fontSize={"19px"}
            color="blue"
          />
        </Link>
        {currentUser.name !== item.name && (
          <FontAwesomeIcon
            onClick={() => props.delete(item.id)}
            icon={faTrash}
            fontSize={"19px"}
            color="red"
            cursor={"pointer"}
          />
        )}
      </td>
    </tr>
  ));

  //return Data
  return (
    <>
      <input
        name=""
        type="search"
        onChange={(e) => {
          setSearch(e.target.value);
          setSearchLoading(true);
        }}
        placeholder="Search..."
        className="w-full border py-2 px-2 mt-2 outline-none focus:shadow focus:shadow-cyan-400 border-gray-300 rounded-md focus-within:border-blue-400"
      />

      <input
        name=""
        type="date"
        onChange={(e) => {
          setDate(e.target.value);
        }}
        className="w-1/3 border py-2 px-2 mt-2 outline-none focus:shadow focus:shadow-cyan-400 border-gray-300 rounded-md focus-within:border-blue-400"
      />

      <table className="table-fixed mt-1 w-full text-center">
        <thead className="bg-stone-800 text-white rounded-lg">
          <tr className="">
            <th>id</th>
            {headerShow}
            <th className="">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr className="text-center">
              <td>Loading...</td>
            </tr>
          ) : searchLoading ? (
            <tr className="text-center">
              <td>Searching...</td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </table>
      <div className="mt-3 space-x-4 flex items-center justify-end flex-wrap">
        <div>
          <select
            onChange={(e) => props.setLimit(e.target.value)}
            className="border w-20 text-center py-3 px-2 outline-none border-gray-300 rounded-md focus-within:border-blue-400"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>

        <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.limit}
          data={props.data}
          total={props.total}
        />
      </div>
    </>
  );
}
