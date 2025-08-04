import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CART, PRODUCT } from "../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import cart from "../../../assets/images/cart.png";
//import SkeletonShow from "../../../Components/Website/Skeleton/SkeletonShow"; استخدمت كاستم سكيليتون من خلال الاري فورم
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../../../Components/Website/PlusMinusBtn/PlusMinusBtn";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  const ["https://backendfore-commerce-production.up.railway.app" + productImages, set"https://backendfore-commerce-production.up.railway.app" + ProductImages] = useState([]);
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
        set"https://backendfore-commerce-production.up.railway.app" + ProductImages(
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
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {loading ? (
          <>
            <div className="w-full lg:w-1/2">
              <div className="animate-pulse bg-gray-200 rounded-md h-64 w-full"></div>
              <div className="flex mt-1 gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-200 rounded-md h-24 w-24"
                  ></div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="lg:ms-5">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-200 rounded-md h-6 w-full mb-4"
                  ></div>
                ))}
                <hr className="my-4" />
                <div className="flex items-center justify-between">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse bg-gray-200 rounded-md h-6 w-1/4"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full lg:w-1/2">
              <ImageGallery
                items={"https://backendfore-commerce-production.up.railway.app" + productImages}
                showPlayButton={false}
                showFullscreenButton={false}
                thumbnailPosition="bottom"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <div className="ms-4">
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <p className="text-gray-600">{product.About}</p>
                <h3 className="text-gray-800">{product.description}</h3>
                <div className="flex justify-between mt-4">
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
                      <h6 className="m-0 text-gray-400 line-through">
                        {product.price}$
                      </h6>
                    </div>
                  </div>
                  {product.stock === 0 ? (
                    <p className="text-red-500">This product is unavailable</p>
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
