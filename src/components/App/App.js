import "./App.css";
import React, { useEffect } from "react";
import { setScreenWidth } from "../../requests/app";
import { getCompanyInfo } from "../../requests/profile";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

const App = () => {
  const companyQuantityInfo = useSelector((state) => state.profile.companyInfo);
  const dispatch = useDispatch();

  const handleResize = () => {
    dispatch(setScreenWidth(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && !companyQuantityInfo && dispatch(getCompanyInfo());
  }, [dispatch, companyQuantityInfo]);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
