import Landing from "../../../Components/Website/Landing/Landing";
import ShowLatestProducts from "../../../Components/Website/Product/LatestProducts/ShowLatestProducts";
import ShowLatestSaleProducts from "../../../Components/Website/Product/SaleProducts/ShowLatestSaleProducts";
import ShowTopRated from "../../../Components/Website/Product/TopRated/ShowTopRated";
import "./Home.css";

export default function HomePage() {
  return (
    <>
      <Landing />
      <div className="container mx-auto px-4 py-6">
        <ShowLatestSaleProducts />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-6">
          <div className="justify-self-center">
            <ShowTopRated />
          </div>
          <div className="justify-self-center">
            <ShowLatestProducts />
          </div>
        </div>
      </div>
    </>
  );
}
