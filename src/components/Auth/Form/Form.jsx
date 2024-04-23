import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Inputs from "../Inputs/Inputs";
import "./Form.css";
import FormFooter from "../FormFooter/FormFooter";
import { dropStatus, signIn } from "../../../requests/profile";

const FormAuthorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signInStatus = useSelector((state) => state.profile.status);

  useEffect(() => {
    if (signInStatus === "done") {
      navigate("/");
      dispatch(dropStatus());
    } else if (signInStatus === "error") {
      setError(true);
    }
  }, [signInStatus, navigate, dispatch]);

  const handleSubmit = async () => {
    if (login && password) {
      dispatch(signIn({ login, password }));
    }
  };

  const submitDisabled = !(login && password);

  return (
    <div className="form__container">
      <div className="form__linkBox">
        <a className="form__link" href="xxx">
          Войти
        </a>
        <a className="form__link form__link_inactive" href="xxx">
          Зарегистрироваться
        </a>
      </div>
      <Inputs
        login={login}
        password={password}
        setLogin={setLogin}
        setPassword={setPassword}
        error={error}
      />
      <button
        className="form__button"
        onClick={handleSubmit}
        disabled={submitDisabled}
        style={{ opacity: submitDisabled ? "0.5" : "1" }}
      >
        Войти
      </button>
      <a className="form__ResumeLink" href="xxx">
        Восстановить пароль
      </a>
      <FormFooter />
    </div>
  );
};

export default FormAuthorization;
