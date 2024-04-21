import React from "react";
import {Navigate, Route,Routes} from "react-router-dom";
import { useSelector } from "react-redux";
import CommonAccess from "../Common/CommonAccess";
import AuthorizationMain from "../Auth/Authorization";
import SearchPage from "../S-Page/SearchPage";
import ResultPage from "../R-Page/ResultPage";

const Main = () => {
  let companyInfo = useSelector(state => state.profile.companyInfo)
  return companyInfo ? (
        <Routes> 
          <Route path="/" element={<CommonAccess />}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/result" element={<ResultPage/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes> 
  ) : (
    <Routes>
        <Route path="/" element={<CommonAccess />}/>
        <Route path="/login" element={<AuthorizationMain/>} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
};


export default Main;
