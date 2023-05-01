import Rating from "@mui/material/Rating";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartRedux";

import { CgRemoveR } from "react-icons/cg";
import { BiAddToQueue } from "react-icons/bi";
import axios from "axios";
import { UrlPath } from "../../UrlPath";

const WishlistCard = ({ wishlist }) => {
  const [rating, setRating] = useState(wishlist.rating);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      wishlist.quantity >= quantity + 1 && setQuantity(quantity + 1);
    }

    if (quantity > wishlist.quantity) {
      setQuantity(0);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        id: wishlist.id,
        productName: wishlist.name,
        productDes: wishlist.description,
        productPrice: wishlist.price,
        imgUrl: wishlist.imageUrl,
        quantity,
        price: wishlist.price * quantity,
      })
    );
  };

  // handle remove to wishlist
  const handleRemoveWishlist = async () => {
    await axios.delete(`${UrlPath}/api/wishlist/delete/${wishlist.id}`);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={wishlist.imageUrl} alt={wishlist.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{wishlist.name}</h3>
        <p className="product-description">{wishlist.description}</p>
        <div className="product-rating">
          <Rating
            name="simple-controlled"
            value={rating}
            // onChange={(e, newValue) => {
            //   setRating(newValue);
            // }}
            readOnly={true}
          />
        </div>
        <div className="product-price">
          <span className="price-label">Price:</span>
          <span>{wishlist.price}</span>
        </div>
        <div className="product-quantity">
          <span className="quantity-label">Quantity:</span>
          <span>{wishlist.quantity}</span>
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
            disabled={wishlist.quantity === 0 || wishlist.quantity <= quantity}
          >
            Add to Cart
          </button>
          <button className="btn btn-wishlist" onClick={handleRemoveWishlist}>
            Remove to Wishlist
          </button>
          <button className="btn btn-buy">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
