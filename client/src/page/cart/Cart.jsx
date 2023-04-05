import { useEffect, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { CgRemoveR } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import {
  decreaseCart,
  getTotal,
  incrementQuantity,
  removeProduct,
} from "../../redux/cartRedux";
import "./Cart.css";
import { mobile } from "../../responsive";
import Modal from "react-modal";
import OrderConfirmationModal from "../../components/orders/orderConfirmationModal/OrderConfirmationModal";

const Container = styled.div`
  display: flex;
`;

const ProductPageContainer = styled.div`
  flex: 6;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 10px;
  ${mobile({ flexDirection: "column" })};
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const FooterDiv = styled.div`
  margin-right: 0;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    height: "15%",
  },
};

Modal.setAppElement("#root");

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (product) => {
    dispatch(removeProduct(product));
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleIncreaseCart = (product) => {
    dispatch(incrementQuantity(product));
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <ProductPageContainer>
        <Wrapper>
          <Bottom>
            <Info>
              {cart.products?.map((product) => (
                <>
                  <Product key={product.id}>
                    <ProductDetail>
                      <Image src={product.imgUrl} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.id}
                        </ProductId>
                        <button
                          onClick={() => handleRemoveFromCart(product.id)}
                        >
                          Remove
                        </button>
                        <ProductSize>
                          <b>Size:</b> 37.5
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <BiAddToQueue
                          style={{ cursor: "pointer" }}
                          onClick={() => handleIncreaseCart(product.id)}
                        />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <CgRemoveR
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDecreaseCart(product.id)}
                        />
                      </ProductAmountContainer>
                      <ProductPrice>
                        ₱ {product.price * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>₱ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>₱ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <Button disabled={cart.total === 0} onClick={toggleModal}>
                CHECKOUT NOW
              </Button>
            </Summary>
            {/* Modal start */}
            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog"
              style={customStyles}
            >
              <OrderConfirmationModal
                carttotal={cart.total}
                setIsOpen={setIsOpen}
              />
            </Modal>
            {/* Modal end */}
          </Bottom>
        </Wrapper>
        <hr style={{ opacity: "0.4" }} />
        <FooterDiv>
          <Footer />
        </FooterDiv>
      </ProductPageContainer>
    </Container>
  );
};

export default Cart;
