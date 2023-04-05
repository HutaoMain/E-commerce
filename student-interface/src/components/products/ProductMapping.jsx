import styled from "styled-components";
import ProductCard from "./ProductCard";
import { mobile } from "../../responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "0", marginLeft: "-3px" })};
`;

const ProductMapping = ({ data }) => {
  return (
    <Container>
      {data?.map((item) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default ProductMapping;
