import React from "react";
import google from "../../../media/FormFooter/google.svg";
import yandex from "../../../media/FormFooter/yandex.svg";
import facebook from "../../../media/FormFooter/facebook.svg";
import "./FormFooter.css";
const FormFooter = () => {
  return (
    <div className="authFooterContainer">
      <section className="authFooterTitle">Войти через:</section>
      <div className="authFooterSocials">
        <div className="authFooterSocialItem">
          <a className="authFooterSocialLink" href="xxx">
            <img src={google} alt="Google link" />
          </a>
        </div>
        <div className="authFooterSocialItem">
          <a className="authFooterSocialLink" href="xxx">
            <img src={facebook} alt="Facebook link" />
          </a>
        </div>
        <div className="authFooterSocialItem">
          <a className="authFooterSocialLink" href="xxx">
            <img src={yandex} alt="Yandex link" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FormFooter;
