// import React, { useState } from "react";
// import useFetch from "../../contextAPI/useFetch";
// import CategoryMapping from "../category/CategoryMapping";
import "./SearchComponent.css";
import { AiOutlineSearch } from "react-icons/ai";

const SearchComponent = ({ id }) => {
  // const { data } = useFetch(
  //   `${process.env.REACT_APP_BACKEND_URL}/api/category/list/${id}`
  // );

  // const [query, setQuery] = useState("");

  // let pattern = RegExp(query, "gi");

  // const search = () => {
  //   return data.products?.filter((item) => item.name.match(pattern));
  // };

  return (
    <div>
      <div className="searchInputContainer">
        <AiOutlineSearch className="searchIcon" />
        <input
          className="searchInput"
          type="text"
          placeholder="Search Product Name Here...."
          // onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/* <CategoryMapping data={search(data)} /> */}
    </div>
  );
};

export default SearchComponent;
