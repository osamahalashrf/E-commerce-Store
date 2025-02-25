import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { LatestSale } from "../../../../Api/Api";
import SaleProduct from "./SaleProduct";
import SkeletonShow from "../../Skeleton/SkeletonShow";

export default function ShowLatestSaleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LatestSale}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product, key) => (
    <SaleProduct
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
    <div>
      <h1 className="font-bold text-3xl">Latest Sale Products</h1>
      <div className="gap-2 my-5 grid grid-cols-1 md:flex md:flex-wrap items-center justify-between ">
          {loading ? <SkeletonShow height="300px" length="4" /> : productsShow}
        </div>
    </div>
  );
}
