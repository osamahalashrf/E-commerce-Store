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
   
      <div className="border-[3px] border-blue-500 flex flex-col">
        <h1 className="py-5 font-bold text-3xl bg-blue-500 text-white text-center">Top Rated</h1>
        <div className="gap-x-2 my-5">
          {loading ? <SkeletonShow height="800px" length="1" /> : productsShow}
        </div>
      </div>
    
  );
}
