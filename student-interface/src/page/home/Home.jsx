import "./Home.css";
import Slider from "../../components/slider/Slider";
import Footer from "../../components/footer/Footer";
import styled from "styled-components";
import Categories from "../../components/categories/Categories";

const FooterDiv = styled.div`
  margin-right: 0;
`;

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <Slider />
        <Categories />
        <hr style={{ opacity: "0.4" }} />
        <FooterDiv>
          <Footer />
        </FooterDiv>
      </div>
    </div>
  );
};

export default Home;
