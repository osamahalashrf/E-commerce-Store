import { useEffect, useState } from "react";
import { CATEGORIES } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../../../Components/Website/Skeleton/SkeletonShow";

export default function WibSiteCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }, []);

  const showCategories = categories.map((item, key) => (
    <div key={key} className="rounded">
      <div className="p-3 m-1 bg-white border flex items-center justify-start gap-3 rounded py-2 h-full">
        <img className=" ms-3" width={"50px"} src={"https://backendfore-commerce-production.up.railway.app" + item.image} alt="img" />
        <p className=" m-0">{StringSlice(item.title, 15)}</p>
      </div>
    </div>
  ));

  return (
    <>
      <div className="bg-blue-200 py-5">
        <div className="container mx-6 py-6">
          <div className="flex items-stretch justify-between flex-wrap gap-y-2">
            {loading ? (
              <SkeletonShow length="5" height="70px" baseColor="white" />
            ) : (
              showCategories
            )}
          </div>
        </div>
      </div>
    </>
  );
}
