import useFetch from "../../contextAPI/useFetch";
import ProductCard from "./ProductCard";
import Footer from "../footer/Footer";
import { useLocation } from "react-router-dom";
import "./ProductMapping.css";
import { UrlPath } from "../../UrlPath";

const ProductMapping = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, loading } = useFetch(`${UrlPath}/api/category/list/${id}`);

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
