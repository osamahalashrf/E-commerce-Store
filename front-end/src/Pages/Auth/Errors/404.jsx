import { Link } from "react-router-dom";
import "./404.css";

export default function Err404({ role }) {
  return (
    <section className="page_404">
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          <div className=" col-span-12 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2 text-3xl">Look like youre lost</h3>
                <p>the page you are looking for not avaible!</p>

                <Link to={"/"} className="link_404 hover:bg-green-700 rounded-md">
                  Go to Home
                </Link>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
