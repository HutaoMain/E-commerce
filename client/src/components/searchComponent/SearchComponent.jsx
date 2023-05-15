import { useState } from "react";
import useFetch from "../../contextAPI/useFetch";
import ProductCard from "../product/ProductCard";
import "./SearchComponent.css";
import { AiOutlineSearch } from "react-icons/ai";
import ProductMapping from "../product/ProductMapping";
import { useLocation } from "react-router-dom";

const SearchComponent = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/category/list/${id}`
  );

  console.log(data);

  const [query, setQuery] = useState("");

  let pattern = RegExp(query, "gi");

  const search = () => {
    return data.products?.filter((item) => item.name.match(pattern));
  };

  return (
    <div>
      <div className="searchInputContainer">
        <AiOutlineSearch className="searchIcon" />
        <input
          className="searchInput"
          type="text"
          placeholder="Search Product Name Here...."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/* <CategoryMapping data={search(data)} /> */}
      <ProductMapping data={search(data)} />
    </div>
  );
};

export default SearchComponent;
