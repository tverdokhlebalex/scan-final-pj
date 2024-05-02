import React from "react";
import { useSelector } from "react-redux";
import "./CompanyInfo.css";
const CompanyInfo = () => {
  const companyQuantityInfo = useSelector((state) => state.profile.companyInfo);
  return (
    <div className="usageStats">
      <div className="usageStats__item">
        <span className="usageStats__label">Использовано компаний</span>
        <span className="usageStats__value usageStats__value--black">
          {companyQuantityInfo.eventFiltersInfo.usedCompanyCount}
        </span>
      </div>
      <div className="usageStats__item">
        <span className="usageStats__label">Лимит по компаниям</span>
        <span className="usageStats__value usageStats__value--green">
          {companyQuantityInfo.eventFiltersInfo.companyLimit}
        </span>
      </div>
    </div>
  );
};

export default CompanyInfo;
