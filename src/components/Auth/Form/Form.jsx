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
    }
    if (signInStatus === "error") {
      setError(true);
    }
  }, [error, signInStatus, navigate, dispatch]);

  const handleSubmit = async () => {
    dispatch(signIn({ login, password }));
  };

  const submitDisable = !(login && password);

  return (
    <div className="auth__container">
      <div className="auth__links">
        <a className="auth__link" href="xxx">
          Войти
        </a>
        <a className="auth__link auth__link--disabled" href="xxx">
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
        className="auth__submit-button"
        onClick={handleSubmit}
        disabled={submitDisable}
        style={{ opacity: submitDisable ? "50%" : "100%" }}
      >
        Войти
      </button>
      <a className="auth__recover-link" href="xxx">
        Восстановить пароль
      </a>
      <FormFooter />
    </div>
  );
};

export default FormAuthorization;
