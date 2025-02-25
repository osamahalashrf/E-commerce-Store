import Landing from "../../../Components/Website/Landing/Landing";
import ShowLatestProducts from "../../../Components/Website/Product/LatestProducts/ShowLatestProducts";
import ShowLatestSaleProducts from "../../../Components/Website/Product/SaleProducts/ShowLatestSaleProducts";
import ShowTopRated from "../../../Components/Website/Product/TopRated/ShowTopRated";
import "./Home.css";

export default function HomePage() {
  return (
    <>
      <Landing />
      <div className="container mx-6 py-6">
        <ShowLatestSaleProducts />
        <div className="flex flex-col items-start md:grid md:grid-cols-2 gap-2">
          <ShowTopRated />
          <ShowLatestProducts />
        </div>
      </div>
    </>
  );
}
