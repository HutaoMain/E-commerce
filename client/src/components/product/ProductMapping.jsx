import useFetch from "../../contextAPI/useFetch";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";
import "./ProductMapping.css";

const ProductMapping = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, loading } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/category/list/${id}`
  );

  console.log(data);

  return (
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
  );
};

export default ProductMapping;
