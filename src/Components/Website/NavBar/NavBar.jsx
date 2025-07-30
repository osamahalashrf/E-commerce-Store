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
import ProfileMenu from "./ProfileMenu";

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
    const getProducts =
      JSON.parse(localStorage.getItem("product")) ||
      []; /* عادي نستخدم وهنا وهناك المصفوفه */
    setProducts(getProducts);
  }, [isChange]);

  const handleDelete = (id) => {
    const filterProduct = products.filter((product) => product.id !== id);
    setProducts(filterProduct);
    localStorage.setItem("product", JSON.stringify(filterProduct));
  };

  const changeCount = (id, btnCount) => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    const findProduct = getProducts.find((product) => product.id === id);
    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProducts));
  };

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

      <div className="container mx-auto px-4 py-4">
        {/* الرأس الأساسي */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* صف اللوجو والصور (صغير وميديم) */}
          <div className="flex items-center justify-between lg:block">
            {/* اللوجو (يسار في الشاشات الصغيرة) */}
            <div className="order-1">
              <Link to="/">
                <img src={logo} alt="logo" className="w-36 md:w-52" />
              </Link>
            </div>

            {/* الصور (يمين في الشاشات الصغيرة) */}
            <div className="flex items-center gap-4 lg:hidden order-2">
              <div
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer"
              >
                <img src={cart} alt="cart" className="w-8 md:w-10" />
              </div>
              <ProfileMenu />
            </div>
          </div>

          {/* البحث (أسفل في الشاشات الصغيرة، وسط في الشاشات الكبيرة) */}
          <div className="order-3 lg:order-2 w-full lg:flex-1 flex mt-4 lg:mt-0">
            <input
              type="search"
              placeholder="Search..."
              className="w-full py-2 md:py-3 px-3 border border-gray-300 rounded-l-md outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-600 text-white px-4 py-2 md:py-3 rounded-r-md hover:bg-blue-700">
              Search
            </button>
          </div>

          {/* الصور (للشاشات الكبيرة فقط) */}
          <div className="order-2 lg:order-3 hidden lg:flex items-center gap-4 justify-end">
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="cursor-pointer"
            >
              <img src={cart} alt="cart" className="w-8 md:w-10" />
            </div>
            <ProfileMenu />
          </div>
        </div>

        {/* التصنيفات */}
        <div className="mt-4 flex flex-wrap items-center gap-4 overflow-x-auto">
          {loading ? (
            <SkeletonShow height="30px" width="80px" />
          ) : (
            categoriesShow
          )}
          <Link
            className="text-black hover:text-gray-400 duration-200 whitespace-nowrap"
            to="/categories"
          >
            Show All
          </Link>
        </div>
      </div>
    </>
  );
}
