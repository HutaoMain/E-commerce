import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../contextAPI/AuthContext";
import useFetch from "../../contextAPI/useFetch";
import { UrlPath } from "../../UrlPath";

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
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    modeOfPayment: "cod",
  });

  const [formValid, setFormValid] = useState(false);
  // const [error, setErrors] = useState({});

  const formIsValid = () => {
    if (
      shippingAddress.address !== "" &&
      shippingAddress.city !== "" &&
      shippingAddress.postalCode !== ""
    ) {
      setFormValid(true);
    }
  };
  // let errors = {};
  // let formIsValid = true;

  // if (!shippingAddress.address) {
  //   formIsValid = false;
  //   errors.address = "Address is required";
  // }

  // if (!shippingAddress.city) {
  //   formIsValid = false;
  //   errors.city = "City is required";
  // }

  // if (!shippingAddress.postalCode) {
  //   formIsValid = false;
  //   errors.postalCode = "Postal code is required";
  // }

  // if (!shippingAddress.modeOfPayment) {
  //   formIsValid = false;
  //   errors.modeOfPayment = "Mode of payment is required";
  // }

  // setErrors(errors);
  // setFormValid(formIsValid);

  console.log(formValid);

  const cart = useSelector((state) => state.cart);

  const { data } = useFetch(`${UrlPath}/api/product/list`);

  const { user } = useContext(AuthContext);

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
    const item = data.find((item) => item.id === product);

    const cartProduct = cart.products.find((item) => item.id === product);

    if (item.quantity > cartProduct.quantity) {
      dispatch(incrementQuantity(product));
    } else {
      alert(`Can't add more product, ${item.quantity} the only stock on hand`);
    }
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
                          <b>Product:</b> {product.productName}
                        </ProductName>
                        <ProductId>
                          <b>Description:</b> {product.productDes}
                        </ProductId>
                        <button
                          onClick={() => handleRemoveFromCart(product.id)}
                        >
                          Remove
                        </button>
                        {/* <ProductSize>
                          <b>Size:</b> 37.5
                        </ProductSize> */}
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
              {user ? (
                <div className="cart-shipping-container">
                  <hr style={{ borderBottom: "2px solid gray" }} />
                  <div className="cart-shippingaddress">
                    <h2>Shipping Address</h2>
                    <div className="cart-shippingaddress-itemlist">
                      <label>Address</label>
                      <input
                        type="text"
                        placeholder="Address"
                        onChange={(e) => {
                          setShippingAddress((data) => ({
                            ...data,
                            address: e.target.value,
                          }));
                          formIsValid();
                        }}
                      />
                    </div>
                    <div className="cart-shippingaddress-itemlist">
                      <label>City</label>
                      <input
                        type="text"
                        placeholder="City"
                        onChange={(e) => {
                          setShippingAddress((data) => ({
                            ...data,
                            city: e.target.value,
                          }));
                          formIsValid();
                        }}
                      />
                    </div>
                    <div className="cart-shippingaddress-itemlist">
                      <label>Postal Code</label>
                      <input
                        className="cart-postalcode"
                        type="number"
                        placeholder="Postal Code"
                        onChange={(e) => {
                          setShippingAddress((data) => ({
                            ...data,
                            postalCode: e.target.value,
                          }));
                          formIsValid();
                        }}
                      />
                    </div>
                    <div className="cart-shippingaddress-itemlist">
                      <label>Mode of Payment</label>
                      <select
                        className="cart-modeofpayment"
                        onChange={(e) => {
                          setShippingAddress((data) => ({
                            ...data,
                            modeOfPayment: e.target.value,
                          }));
                        }}
                      >
                        <option value="cod">COD</option>
                        <option value="gcash">GCash</option>
                        <option value="maya">MAYA</option>
                      </select>
                    </div>
                    {formValid ? null : (
                      <p style={{ color: "red" }}>
                        {/* {Object.values(error).join(", ")} */}
                        Please fill in all fields.
                      </p>
                    )}
                  </div>

                  <Button
                    className="checkout-btn"
                    disabled={!formValid || cart.total === 0}
                    onClick={toggleModal}
                  >
                    CHECKOUT NOW
                  </Button>
                </div>
              ) : (
                <span style={{ fontSize: "30px" }}>
                  Please login before checking out
                </span>
              )}
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
                shippingAddress={shippingAddress}
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
