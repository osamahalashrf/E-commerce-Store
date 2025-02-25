import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="hand flex items-center justify-between flex-wrap">
        <div className="container my-0 mx-auto">
          <div className="lg:columns-5 md:columns-8 columns-12 flex flex-col space-y-2 md:space-y-7 md:text-start text-center">
            <h1 className="text-5xl font-bold">Shampoo Nice</h1>
            <h5 className="font-normal text-white">
              Another Nice Things Which used by someone i dont Know (just random
              text)
            </h5>
            <Link
              to="/shop"
              className=" text-white font-bold hover:text-yellow-400 py-4 px-4 bg-blue-400 hover:bg-blue-600 rounded-xl w-32"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
  )
}
