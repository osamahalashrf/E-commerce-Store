import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CATEGORIES } from "../../../Api/Api";

import logo from "../../../assets/images/logo.png";
import cart from "../../../assets/images/cart.png";
import profile from "../../../assets/images/profile.png";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../Skeleton/SkeletonShow";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../PlusMinusBtn/PlusMinusBtn";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const { isChange } = useContext(Cart);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((res) => setCategories(res.data.slice(-8)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // const getProducts = JSON.parse(localStorage.getItem("product")) || [] /* الشرط الأخير الذي فيه المصفوفه إستغنينا عنه بعلامة الإستفهام لما عملنا للبرودكت ماب */
    const getProducts = JSON.parse(localStorage.getItem("product")) || []; /* عادي نستخدم وهنا وهناك المصفوفه */
    setProducts(getProducts);
  }, [isChange]);

  const handleDelete = (id) => {
    const filterProduct = products.filter((product) => product.id !== id);
    setProducts(filterProduct);
    localStorage.setItem("product", JSON.stringify(filterProduct));
  };

  const changeCount = (id, btnCount)=> {
    const getProducts = JSON.parse(localStorage.getItem("product")) || []
    const findProduct = getProducts.find((product)=> product.id === id);
    findProduct.count = btnCount
    localStorage.setItem("product", JSON.stringify(getProducts));
  }

  const productsShow = products?.map((product, key) => (
    <div className="mb-4 relative" key={key}>
      <div
        onClick={() => handleDelete(product.id)}
        className="top-0 end-0 absolute rounded-full flex items-center justify-center bg-red-600 text-white"
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
      >
        <FontAwesomeIcon width={"10px"} icon={faXmark} />
      </div>
      <div className="flex items-start flex-wrap gap-2">
        <img
          src={product.images[0].image}
          height={"80px"}
          style={{ objectFit: "cover" }}
          className="rounded"
          alt="product"
        />
        <div className="">
          <h6>{product.title}</h6>
          <p className="">{product.description}</p>
          <div className="flex items-center gap-3">
            <h5 className="">{product.discount}</h5>
            <h6 className="m-0 line-through text-gray-400">{product.price}</h6>
          </div>
        </div>
        <PlusMinusBtn
          id={product.id}
          count={product.count || 1}
          setCount={setCount}
          changeCount={changeCount}
        />
      </div>
    </div>
  ));

  const categoriesShow = categories.map((category, key) => (
    <Link
      key={key}
      to={`/category/${category.id}`}
      className=" m-0 text-black hover:text-gray-400"
    >
      {StringSlice(category.title, 4)}
    </Link>
  ));

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <FontAwesomeIcon icon={faCartShopping} />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Shoping Cart
                    </DialogTitle>
                    <div className="mt-2">
                      {/* <p className="text-sm text-gray-500">
                      Are you sure you want to deactivate your account? All of your data will be permanently removed.
                      This action cannot be undone.
                    </p> */}

                      {productsShow}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-600 sm:ml-3 sm:w-auto"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:text-white ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-red-500 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

        <div className="container mx-6 py-6">
          <div className="flex items-center justify-between flex-wrap md:flex-nowrap">
            <Link to={"/"} className="order-1 md:order-1">
              <img src={logo} alt="logo" width="" className="md:w-52 w-36" />
            </Link>
            <div className="order-3 md:order-2 mt-2 mx flex items-center justify-center">
              <input
                name=""
                type="search"
                placeholder="Search..."
                className="border md:w-96 py-3 px-2 md:py-4 outline-none focus:shadow border-r-0 focus:shadow-cyan-400 border-gray-300 rounded-md rounded-r-none focus-within:border-blue-400"
              />
              <h3 className="md:py-4 py-3 cursor-pointer text-white bg-blue-600 hover:bg-blue-800 top-0 end-0 px-4 rounded-md rounded-l-none">
                Search
              </h3>
            </div>
            <div className="order-2 md:order-3 flex items-center justify-end gap-4">
              <div
                onClick={() => setOpen((priv) => !priv)}
                className=" cursor-pointer"
              >
                <img src={cart} alt="cart" width="50px" />
              </div>
              <Link to="/profile">
                <img
                  src={profile}
                  alt="profile"
                  width="40px"
                  className="cursor-pointer rounded-full"
                />
              </Link>{" "}
            </div>
          </div>
          <div className="mt-3 gap-5 flex items-center justify-start">
            {loading ? (
              <SkeletonShow height="30px" width="80px" />
            ) : (
              categoriesShow
            )}
            <Link
              className="text-black hover:text-gray-400 duration-200"
              to="/categories"
            >
              Show All
            </Link>
          </div>
        </div>
    </>
  );
}
