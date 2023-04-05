import styled from "styled-components";
import { mobile } from "../../responsive";
import CategoryItem from "./CategoryItem";
import useFetch from "../../contextAPI/useFetch";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { UrlPath } from "../../UrlPath";

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  ${mobile({ padding: "0px" })};
`;

const ContainerContent = styled.div`
  white-space: nowrap;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Categories = () => {
  const { data } = useFetch(`${UrlPath}/api/category/list`);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 1000;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 1000;
  };

  return (
    <Container>
      <BsArrowLeftCircle
        style={{
          position: "absolute",
          left: "0",
          zIndex: "5",
          fontSize: "30px",
          cursor: "pointer",
        }}
        onClick={slideLeft}
      />
      <ContainerContent id="slider">
        {data.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </ContainerContent>
      <BsArrowRightCircle
        style={{
          position: "absolute",
          right: "0",
          zIndex: "5",
          fontSize: "30px",
          cursor: "pointer",
        }}
        onClick={slideRight}
      />
    </Container>
  );
};

export default Categories;
