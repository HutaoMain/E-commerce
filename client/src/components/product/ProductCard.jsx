import { useState } from "react";
import "./ProductCard.css";
import Rating from "@mui/material/Rating";

const ProductCard = ({ product }) => {
  const [rating, setRating] = useState(product.rating);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-rating">
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(e, newValue) => {
              setRating(newValue);
            }}
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
        <div className="product-buttons">
          <button className="btn btn-cart">Add to Cart</button>
          <button className="btn btn-wishlist">Add to Wishlist</button>
          <button className="btn btn-buy">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
