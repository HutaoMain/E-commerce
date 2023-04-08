import useFetch from "../../contextAPI/useFetch";
import ProductCard from "./ProductCard";
import Footer from "../footer/Footer";
import { useLocation } from "react-router-dom";
import "./ProductMapping.css";

const ProductMapping = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, loading } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/category/list/${id}`
  );

  console.log(data);

  return (
    <>
      <div className="product-mapping">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <section>
            {data?.products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        )}
      </div>
      <hr style={{ opacity: "0.4" }} />
      <Footer />
    </>
  );
};

export default ProductMapping;
