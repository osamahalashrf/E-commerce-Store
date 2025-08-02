import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PaginatedItems from "../Dashboard/Pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import TransformDate from "../../helpers/TransformDate";

export default function TableShow(props) {
  //هذه الحركه لكي لا يضرب خطأ لان هذا الكمبوننت (الذي هو الجدول)
  //يعرض البيانات من أكثر من صفحه من صفحة المستخدمين ومن صفحة المنتجات والفئات ووو
  //ولا يوجد الكرنت يوزر إلا في صفحة اليوزر فعملنا هذه الحركة إما أن يكون موجود الكرنت يوزر
  //وهو اصلا لن يستقبله هذا الجدول -الكبوننت- إلا من صفحة اليوزر
  // وإما أن يكون غير موجود فجعلنا النيم قيمة فاضية لأنه لا يوجد كرنت يوزر في بقية الصفحات

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

  /////////

  const filteredDataByDate =
    date.length !== 0
      ? props.data.filter((item) => TransformDate(item.created_at) === date)
      : props.data;

  /////////

  const filterSearchByDate =
    date.length !== 0
      ? filteredData.filter((item) => TransformDate(item.created_at) === date)
      : filteredData;

  //////////

  const showWhichData =
    search.length > 0 ? filterSearchByDate : filteredDataByDate;

  //////////

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
      <td className="py-3 text-xs md:text-sm lg:text-base">{key + 1}</td>
      {props.header.map((item2, key2) => (
        <td
          key={key2}
          className="text-center text-xs md:text-sm lg:text-base col-span-12 py-3"
        >
          {item2.key === "image" ? (
            <div className="flex justify-center">
              <img width={"50px"} src={"https://backendfore-commerce-production.up.railway.app" + item[item2.key]} alt="" />
            </div>
          ) : item2.key === "images" ? (
            <div className="flex items-center justify-start flex-wrap gap-2">
              {item[item2.key].map((img, key) => (
                <img
                  key={key}
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                  src={img.image}
                  alt=""
                />
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
      <td className="flex items-center justify-center gap-2 md:gap-4 py-3">
        <Link to={`${item.id}`}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            fontSize={"16px"}
            color="blue"
          />
        </Link>
        {currentUser.name != item.name && (
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

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <input
          type="search"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
          placeholder="Search..."
          className="w-full md:w-2/3 border py-2 px-2 outline-none focus:shadow focus:shadow-cyan-400 border-gray-300 rounded-md focus-within:border-blue-400"
        />

        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          className="w-full md:w-1/3 border py-2 px-2 outline-none focus:shadow focus:shadow-cyan-400 border-gray-300 rounded-md focus-within:border-blue-400"
        />
      </div>

      <div className="overflow-x-auto mt-3 rounded-md shadow-sm">
        <table className="min-w-full text-xs sm:text-sm md:text-base text-center border-collapse">
          <thead className="bg-stone-800 text-white">
            <tr>
              <th className="py-3 px-2">ID</th>
              {headerShow}
              <th className="py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {props.loading ? (
              <tr>
                <td colSpan={props.header.length + 2} className="py-4">
                  Loading...
                </td>
              </tr>
            ) : searchLoading ? (
              <tr>
                <td colSpan={props.header.length + 2} className="py-4">
                  Searching...
                </td>
              </tr>
            ) : (
              dataShow
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <select
            onChange={(e) => props.setLimit(e.target.value)}
            className="border w-24 text-center py-2 px-2 outline-none border-gray-300 rounded-md focus-within:border-blue-400"
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
    </div>
  );
}
