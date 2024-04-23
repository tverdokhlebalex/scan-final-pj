import React from "react";
import google from "../../../media/FormFooter/google.svg";
import yandex from "../../../media/FormFooter/yandex.svg";
import facebook from "../../../media/FormFooter/facebook.svg";
import "./FormFooter.css";

const FormFooter = () => {
  const icons = [
    { src: google, alt: "Google" },
    { src: facebook, alt: "Facebook" },
    { src: yandex, alt: "Yandex" },
  ];

  return (
    <div className="formFooterContainer">
      <section className="formFooterSection">Войти через:</section>
      <div className="formFooterBox">
        {icons.map((icon, index) => (
          <div key={index} className="formFooterBoxItem">
            <a className="formFooterBoxLink" href="xxx">
              <img src={icon.src} alt={icon.alt} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormFooter;
