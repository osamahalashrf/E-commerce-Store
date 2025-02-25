import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { Latest } from "../../../../Api/Api";
import SaleProduct from "../SaleProducts/SaleProduct";
import SkeletonShow from "../../Skeleton/SkeletonShow";

export default function ShowLatestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${Latest}`)
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
      <h1 className="font-bold text-3xl">Latest Products</h1>
      <div className="flex flex-wrap md:grid md:grid-cols-2 gap-2 my-2">
        {loading ? <SkeletonShow height="300px" length="4" /> : productsShow}
      </div>
    </div>
  );
}
