import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import StringSlice from "../../../../helpers/StringSlice";
import cart from "../../../../assets/images/cart.png";
import uploadimg from "../../../../assets/images/upload.png";
import { NavLink } from "react-router-dom";
export default function SaleProduct(props) {
  
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, key) => (
    <FontAwesomeIcon key={key} className="text-yellow-400" icon={solid} />
  ));

  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, key) => (
    <FontAwesomeIcon key={key} icon={regularStar} />
  ));

  return (
    <NavLink to={`/product/${props.id}`} className={"border rounded p-3 h-full flex flex-col items-center justify-center"} >
        <div className="pb-3">
          <p style={{ color: "gray" }}>{StringSlice(props.title, 35)}</p>
          <p>{StringSlice(props.description, 35)}</p>
          <div className="px-5 py-4 relative">
            {props.sale && (
              <p
                className="m-0 absolute top-0 start-0 bg-blue-500 rounded-full text-white text-center uppercase inline-block"
                style={{ width: "50px", height: "50px", lineHeight: "50px" }}
              >
                Sale
              </p>
            )}
            <img src={props.img} alt="img" className="" />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <div>
              {showGoldStars}
              {showEmptyStars}
            </div>
            <div className="flex space-x-2">
              <h5 className="m-0 text-blue-500">{props.discount}$</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {props.price}$
              </h6>
            </div>
          </div>
          <div className="rounded cursor-pointer">
            <img src={cart} alt="cart" width={"30px"} />
          </div>
        </div>
    </NavLink>
  );
}
