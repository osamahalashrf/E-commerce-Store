import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="hand flex items-center justify-between flex-wrap">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4 md:space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Shampoo Nice
          </h1>
          <h5 className="font-normal text-white text-sm md:text-base">
            Another Nice Things Which used by someone I dont know (just random
            text)
          </h5>
          <Link
            to="/shop"
            className="text-white font-bold hover:text-yellow-400 py-3 px-6 bg-blue-400 hover:bg-blue-600 rounded-xl w-40 mx-auto md:mx-0"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
