import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = () => {
  return (
    <div>
      <Carousel autoPlay showThumbs={false} infiniteLoop showArrows={false}>
        <div>
          <img
            src="https://res.cloudinary.com/alialcantara/image/upload/v1667913746/svhr5mdqcawslpvqch68.jpg"
            alt="slider"
          />
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/alialcantara/image/upload/v1667913751/v9lhswk7mpqjgy4fzify.jpg"
            alt="slider"
          />
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/alialcantara/image/upload/v1667913754/ip0dpusjhzamlj98irit.jpg"
            alt="slider"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
