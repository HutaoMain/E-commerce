import styled from "styled-components";
import { mobile } from "../../responsive";
import {
  BsFacebook,
  BsInstagram,
  BsMailbox,
  BsFillTelephoneFill,
  BsPinterest,
  BsTwitter,
  BsFillHouseDoorFill,
} from "react-icons/bs";
import stilogo from "../../images/logo.png";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column", margin: 0, padding: 0 })};
  margin-top: 10px;
  width: 95%;
  margin-left: 50px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
  margin-right: 0;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  padding-right: 0;
  margin-right: 0;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

// const Payment = styled.img`
//   width: 50%;
// `;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>
          RIMSti{" "}
          <img
            src={stilogo}
            alt="sti logo"
            style={{
              height: "60px",
              width: "auto",
              marginLeft: "5px",
            }}
          />
        </Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <BsFacebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <BsInstagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <BsTwitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <BsPinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <BsFillHouseDoorFill style={{ marginRight: "10px" }} /> Sta. Maria
          Bulacan, 3022
        </ContactItem>
        <ContactItem>
          <BsFillTelephoneFill style={{ marginRight: "10px" }} /> +1 234 567
        </ContactItem>
        <ContactItem>
          <BsMailbox style={{ marginRight: "10px" }} /> contact@rimsti.ph
        </ContactItem>
        {/* <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" /> */}
      </Right>
    </Container>
  );
};

export default Footer;
