import { useContext, useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CART, PRODUCT } from "../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import cart from "../../../assets/images/cart.png";
import SkeletonShow from "../../../Components/Website/Skeleton/SkeletonShow";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../../../Components/Website/PlusMinusBtn/PlusMinusBtn";

export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  const [productImages, setProductImages] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loading, setLoading] = useState(true);

  const { setIsChange } = useContext(Cart);
  const { id } = useParams();

  const roundStars = Math.round(product.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, key) => (
    <FontAwesomeIcon key={key} className="text-yellow-400" icon={solid} />
  ));

  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, key) => (
    <FontAwesomeIcon key={key} icon={regularStar} />
  ));

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((res) => {
        setProductImages(
          res.data[0].images.map((img) => {
            return {
              original: img.image,
              thumbnail: img.image,
            };
          })
        );
        setProduct(res.data[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  const checkStock = async () => {
    try {
      setLoadingCart(true);
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getItems.filter((item) => item.id == id)?.[0]?.count;
      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0),
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoadingCart(false);
    }
  };

  const handleSave = async () => {
    const check = await checkStock();

    if (check) {
      const getItems = JSON.parse(localStorage.getItem("product")) || [];

      const productExist = getItems.findIndex((pro) => pro.id == id);

      if (productExist !== -1) {
        if (getItems[productExist].count) {
          getItems[productExist].count += count;
        } else {
          getItems[productExist].count = count;
        }
      } else {
        if (count > 1) {
          product.count = count;
        }
        getItems.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getItems));
      setIsChange((prev) => !prev);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="flex items-center flex-wrap">
        {loading ? (
          <>
            <div className="">
              <SkeletonShow heigth="250px" length="1" classess="" />
              <div className="flex mt-1">
                <SkeletonShow heigth="100px" length="1" classess="" />
                <SkeletonShow heigth="100px" length="1" classess="" />
                <SkeletonShow heigth="100px" length="1" classess="" />
              </div>
            </div>

            <div className="">
              <div className="lg:ms-5">
                <SkeletonShow heigth="20px" length="1" classess="" />
                <SkeletonShow heigth="20px" length="1" classess="" />
                <hr className="" />
                <div className="flex items-center justify-between">
                  <SkeletonShow heigth="20px" length="1" classess="mt-2" />
                  <SkeletonShow heigth="20px" length="1" classess=" mt-2" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="">
              <ImageGallery items={productImages} />
            </div>

            <div className="">
              <div className="ms-4">
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <p>{product.About}</p>
                <h3>{product.description}</h3>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    <div>
                      {product.stock === 1 && (
                        <p className="text-red-500">This is only 1 left</p>
                      )}
                      {showGoldStars}
                      {showEmptyStars}
                    </div>
                    <div className="flex space-x-2">
                      <h5 className="m-0 text-blue-500">{product.discount}$</h5>
                      <h6
                        className="m-0"
                        style={{
                          color: "gray",
                          textDecoration: "line-through",
                        }}
                      >
                        {product.price}$
                      </h6>
                    </div>
                  </div>
                  {product.stock === 0 ? (
                    <p>This product is unvilable</p>
                  ) : (
                    <div className="flex items-center gap-4">
                      <PlusMinusBtn setCount={(data) => setCount(data)} />
                      <div
                        onClick={handleSave}
                        className="rounded cursor-pointer"
                      >
                        {loadingCart ? (
                          "Loading..."
                        ) : (
                          <img src={cart} alt="cart" width={"30px"} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
