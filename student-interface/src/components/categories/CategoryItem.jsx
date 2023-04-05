import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";

const Container = styled.div`
  margin: 5px;
  height: 70vh;
  width: 25%;
  position: relative;
  display: inline-block;
  background-color: white;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px rgb(0 0 0 / 12%);
  ${mobile({ height: "40vh" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  ${mobile({ height: "20vh", objectFit: "cover", marginTop: "30px" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  background-color: rgb(0, 113, 194, 0.7);
  border-radius: 10px;
  padding: 3px;
  margin-bottom: 20px;
  ${mobile({
    color: "black",
    marginTop: "130px",
    marginBottom: "0",
    fontSize: "15px",
  })}
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/category/${item.id}`}>
        <Image src={item.imageUrl} />
        <Info>
          <Title> {item.categoryName} </Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
