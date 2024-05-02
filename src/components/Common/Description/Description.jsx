import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./Description.css";
import funMan from "../../../media/CommonAccess/Description/funMan.svg";

const Description = () => {
  const companyInfo = useSelector((state) => state.profile.companyInfo);
  const navigate = useNavigate();
  return (
    <div className="ServiceDescription__container">
      <div className="ServiceDescription__content">
        <h1 className="ServiceDescription__heading">
          Сервис по поиску публикаций о компании по его инн
        </h1>
        <br />
        <p className="ServiceDescription__text">
          Комплексный анализ публикаций, получение данных в формате PDF на
          электронную почту.
        </p>
        {companyInfo && (
          <button
            className="ServiceDescription__button"
            onClick={() => navigate("/search")}
          >
            Запросить данные
          </button>
        )}
      </div>
      <div className="ServiceDescription__imageContainer">
        <img className="ServiceDescription__image" src={funMan} alt="funMan" />
      </div>
    </div>
  );
};

export default Description;
