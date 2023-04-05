import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import ProductMapping from "../../components/products/ProductMapping";
import SearchComponent from "../../components/searchComponent/SearchComponent";

const ProductPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  return (
    <div>
      {location.pathname === `/category/${id}` ? (
        <SearchComponent id={id} />
      ) : (
        <SearchComponent />
      )}
      <ProductMapping />
      <hr style={{ opacity: "0.4" }} />
      <Footer />
    </div>
  );
};

export default ProductPage;
