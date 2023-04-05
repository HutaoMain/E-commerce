import React from "react";

const StarRating = (rating) => {
  const starsTotal = 5;
  const starPercentage = (rating / starsTotal) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  return (
    <div className="star-rating">
      <div className="back-stars">
        <span className="stars" style={{ width: starPercentageRounded }}></span>
      </div>
      <div className="front-stars">
        <span className="stars"></span>
      </div>
    </div>
  );
};

export default StarRating;
