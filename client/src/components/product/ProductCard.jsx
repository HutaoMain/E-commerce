import "./ProductCard.css";
import { Rating } from "react-simple-star-rating";

import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartRedux";

import { CgRemoveR } from "react-icons/cg";
import { BiAddToQueue } from "react-icons/bi";
import { AuthContext } from "../../contextAPI/AuthContext";
import axios from "axios";

const ProductCard = ({ product }) => {
  const [rating, setRating] = useState(product.finalRating);
  const [messageWishList, setMessageWishList] = useState("Add to Wishlist");
  const [messageAddToCart, setMessageAddToCart] = useState("Add to Cart");
  const [disabled, setDisabled] = useState(false);

  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      product.quantity >= quantity + 1 && setQuantity(quantity + 1);
    }

    if (quantity > product.quantity) {
      setQuantity(0);
    }
  };

  // handle add wishlist

  const handleAddToWishlist = async () => {
    try {
      // Check if product is already in user's wishlist
      const wishlist = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/wishlist/${user}`
      );

      if (wishlist.data.find((item) => item.productId === product.id)) {
        // If product is already in wishlist, disable the button and set message
        setMessageWishList("Product already in wishlist");
        setDisabled(true);
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/wishlist/create`,
          {
            productId: product.id,
            email: user,
          }
        );
        // Set success message and disable button for 5 seconds
        setMessageWishList("Added to wishlist");
        setDisabled(true);
        setTimeout(() => setDisabled(false), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        id: product.id,
        productName: product.name,
        productDes: product.description,
        productPrice: product.price,
        imgUrl: product.imageUrl,
        quantity,
        price: product.price * quantity,
      })
    );
    setMessageAddToCart("Added to Cart");
    setTimeout(() => {
      setMessageAddToCart("Add to Cart");
    }, 5000);
  };

  const saveRating = async (newRating, productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/productRating/rate`,
        {
          rating: parseFloat(newRating),
          email: user,
          productId: productId,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {product.bestSeller === true ? (
          <div className="best-seller-badge">Best Seller</div>
        ) : (
          <div></div>
        )}
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-rating">
          <Rating
            initialValue={rating}
            allowFraction={true}
            onClick={(rate) => saveRating(rate, product.id)}
          />
        </div>
        <div className="product-price">
          <span className="price-label">Price:</span>
          <span>{product.price}</span>
        </div>
        <div className="product-quantity">
          <span className="quantity-label">Quantity:</span>
          <span>{product.quantity}</span>
        </div>
        <div className="product-quantity">
          <span className="quantity-label">Sold:</span>
          <span>{product.sold}</span>
        </div>
        <div className="product-quantity-btns">
          <CgRemoveR
            onClick={() => handleQuantity("dec")}
            style={{ cursor: "pointer" }}
          />
          <span className="product-amount">{quantity}</span>
          <BiAddToQueue
            onClick={() => handleQuantity("inc")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="product-buttons">
          <button
            className="btn btn-cart"
            onClick={handleAddToCart}
            disabled={product.quantity === 0 || product.quantity <= quantity}
          >
            {messageAddToCart}
          </button>
          <button
            className="btn btn-wishlist"
            onClick={handleAddToWishlist}
            disabled={disabled}
          >
            {messageWishList}
          </button>

          {/* <button >Add to Wishlist</button> */}
          <button className="btn btn-buy">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
