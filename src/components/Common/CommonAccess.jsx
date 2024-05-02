import React from "react";
import "./CommonAccess.css";
import Description from "./Description/Description";
import MainCarousel from "./MainCarousel/MainCarousel";
import manWithTick from "../../media/CommonAccess/manWithTick.svg";
import Tariffs from "./Tariffs/Tariffs";

const CommonAccess = () => {
  return (
    <main className="contentArea">
      <div className="contentArea__wrapper">
        <Description />
        <MainCarousel />
        <img
          className="contentArea__image"
          src={manWithTick}
          alt="manWithTick"
        />
        <Tariffs />
      </div>
    </main>
  );
};

export default CommonAccess;
