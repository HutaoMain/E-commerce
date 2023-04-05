import React, { useState } from "react";
import useFetch from "../../contextAPI/useFetch";
import ProductMapping from "../products/ProductMapping";
import "./SearchComponent.css";
import { AiOutlineSearch } from "react-icons/ai";
import { UrlPath } from "../../UrlPath";

const SearchComponent = ({ id }) => {
  const { data } = useFetch(`${UrlPath}/api/category/list/${id}`);

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
      <ProductMapping data={search(data)} />
    </div>
  );
};

export default SearchComponent;
