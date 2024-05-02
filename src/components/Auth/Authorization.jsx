import React from "react";
import "./Authorization.css";
import peopleWithKey from "../../media/Authorization/peopleWithKey.svg";
import padlock from "../../media/Authorization/padlock.svg";
import FormAuthorization from "./Form/Form";
import { useSelector } from "react-redux";

const Authorization = () => {
  const newWidth = useSelector((state) => state.app.width);

  const isShown = newWidth < 1270 ? true : false;
  return (
    <main className="subscription">
      <div className="subscription__container">
        <div className="subscription__info">
          <h1 className="subscription__heading">
            Для оформления подписки на тариф, необходимо авторизоваться.
          </h1>
          <img
            className="subscription__image"
            src={peopleWithKey}
            alt="peopleWithKey"
            hidden={isShown}
          />
        </div>
        <div className="subscription__auth">
          <img className="subscription__icon" src={padlock} alt="padlock" />
          <FormAuthorization />
        </div>
        <img
          className="subscription__image"
          src={peopleWithKey}
          alt="peopleWithKey"
          hidden={!isShown}
        />
      </div>
    </main>
  );
};

export default Authorization;
