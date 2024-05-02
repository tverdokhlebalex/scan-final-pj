import React from "react";
import "./MainCarousel.css";
import Carousel from "./Carousel/Carousel";

const MainCarousel = () => {
  return (
    <div className="MainSlider">
      <h2 className="MainSlider__title">
        <Carousel />
      </h2>
    </div>
  );
};

export default MainCarousel;
