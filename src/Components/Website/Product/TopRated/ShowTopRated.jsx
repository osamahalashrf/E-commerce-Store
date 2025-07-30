import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { TopRatedApi } from "../../../../Api/Api";
import SkeletonShow from "../../Skeleton/SkeletonShow";
import TopRated from "./TopRated";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${TopRatedApi}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product, key) => (
    <TopRated
      key={key}
      title={product.title}
      img={product.images[0].image}
      description={product.description}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
    />
  ));

  return (
   
    <div className="border-[3px] border-blue-500 flex flex-col min-h-screen">
      <h1 className="py-5 font-bold text-3xl bg-blue-500 text-white text-center">
        Top Rated
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 flex-grow">
        {loading ? (
          <SkeletonShow width="130px" height="300px" length="4" classess="rounded-md" />
        ) : (
          productsShow
        )}
      </div>
    </div>
    
  );
}
