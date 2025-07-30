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
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="font-bold text-2xl sm:text-3xl text-center sm:text-left mb-4">
        Latest Sale Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? <SkeletonShow width="150px" height="300px" length="4" /> : productsShow}
      </div>
    </div>
  );
}
