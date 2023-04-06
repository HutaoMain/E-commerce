import styled from "styled-components";
import CategoryCard from "./CategoryCard";
import { mobile } from "../../responsive";
import useFetch from "../../contextAPI/useFetch";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "0", marginLeft: "-3px" })};
`;

const CategoryMapping = () => {
  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/category/list`
  );

  return (
    <Container>
      {data?.map((item) => (
        <CategoryCard item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default CategoryMapping;
