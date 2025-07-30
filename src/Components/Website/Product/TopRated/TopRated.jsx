import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import StringSlice from "../../../../helpers/StringSlice";
import cart from "../../../../assets/images/cart.png";
//import uploadimg from "../../../../assets/images/upload.png";
import { NavLink } from "react-router-dom";
export default function TopRated(props) {
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, key) => (
    <FontAwesomeIcon key={key} className="text-yellow-400" icon={solid} />
  ));

  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, key) => (
    <FontAwesomeIcon key={key} icon={regularStar} />
  ));

  return (
    <NavLink
      to={`/product/${props.id}`}
      className="m-2 rounded p-3 h-full flex flex-col md:flex-row items-center md:justify-start justify-center border"
    >
      <div className="px-5 py-4">
        <img src={props.img} alt="img" className="w-full object-cover rounded-md" />
      </div>

      <div className="flex flex-col justify-between mt-2">
        <div>
          <p style={{ color: "gray" }}>{StringSlice(props.title, 35)}</p>
          <p>{StringSlice(props.description, 35)}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-center gap-3">
            <div>
              {showGoldStars}
              {showEmptyStars}
            </div>
            <div className="flex flex-row">
              <h5 className="m-0 text-blue-500">{props.discount}$</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {props.price}$
              </h6>
            </div>
          </div>
          <div className="p-2 rounded cursor-pointer">
            <img src={cart} alt="cart" width={"30px"} />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
