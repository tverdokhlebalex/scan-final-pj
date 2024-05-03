import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import document from "../../../media/S-Page/document.svg";
import { useDispatch } from "react-redux";
import { getHistogramInfo, getPublication } from "../../../requests/histograms";
import { useNavigate } from "react-router-dom";
import validateInn from "../../../applications/valid_inn";

const SearchForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inn, setInn] = useState("");
  const [accessedDocs, setAccessedDocs] = useState("");
  const [maxFullness, setMaxFullness] = useState(false);
  const [inBusinessNews, setInBusinessNews] = useState(false);
  const [onlyMainRole, setOnlyMainRole] = useState(false);
  const [excludeAnnouncements, setExcludeAnnouncements] = useState(false);
  const [tonality, setTonality] = useState("any");
  const [isInnValid, setIsInnValid] = useState(true);
  const [isDocQuantityValid, setIsDocQuantityValid] = useState(true);
  const [isDateValid, setIsDateValid] = useState(true);
  const [innTouched, setInnTouched] = useState(false);
  const [docQuantityTouched, setDocQuantityTouched] = useState(false);
  const [dateTouched, setDateTouched] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeStartDate = (evt) => {
    setDateTouched(true);
    const newValue = evt.target.value;
    if (
      new Date(newValue).getTime() < new Date().getTime() &&
      new Date(newValue).getTime() <= new Date(endDate).getTime()
    ) {
      setIsDateValid(true);
    } else {
      setIsDateValid(false);
    }
    setStartDate(newValue);
  };

  const onChangeEndDate = (evt) => {
    setDateTouched(true);
    const newValue = evt.target.value;
    if (
      new Date(newValue).getTime() < new Date().getTime() &&
      new Date(newValue).getTime() >= new Date(startDate).getTime()
    ) {
      setIsDateValid(true);
    } else {
      setIsDateValid(false);
    }
    setEndDate(newValue);
  };

  const onChangeInn = (evt) => {
    setInnTouched(true);
    const newValue = evt.target.value;
    const isValid = validateInn(newValue);
    setIsInnValid(isValid);
    setInn(newValue);
  };

  const onChangeQuantity = (evt) => {
    setDocQuantityTouched(true);
    const newValue = evt.target.value;
    if (+newValue > 0 && +newValue <= 1000 && Number.isInteger(+newValue)) {
      setIsDocQuantityValid(true);
    } else {
      setIsDocQuantityValid(false);
    }
    setAccessedDocs(newValue);
  };

  const onCheckHandle = (evt, setInputChecked) => {
    setInputChecked((checked) => !checked);
  };

  const onSelectHandle = (evt) => {
    setTonality(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const requestBody = {
      issueDateInterval: {
        startDate,
        endDate,
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              sparkId: null,
              entityId: null,
              inn,
              maxFullness,
              inBusinessNews,
            },
          ],
          onlyMainRole,
          tonality,
          onlyWithRiskFactors: false,
          riskFactors: {
            and: [],
            or: [],
            not: [],
          },
          themes: {
            and: [],
            or: [],
            not: [],
          },
        },
        themesFilter: {
          and: [],
          or: [],
          not: [],
        },
      },
      searchArea: {
        includedSources: [],
        excludedSources: [],
        includedSourceGroups: [],
        excludedSourceGroups: [],
      },
      attributeFilters: {
        excludeTechNews: true,
        excludeAnnouncements,
        excludeDigests: true,
      },
      similarMode: "duplicates",
      limit: 1000,
      sortType: "sourceInfluence",
      sortDirectionType: "desc",
      intervalType: "month",
      histogramTypes: ["totalDocuments", "riskFactors"],
    };
    dispatch(getHistogramInfo(requestBody));
    dispatch(getPublication(requestBody));
    navigate("/result");
  };

  const submitDisabled = !(isDateValid && isInnValid && isDocQuantityValid);

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <div className="searchForm__wrapper">
        <img className="toggleSvg" src={document} alt="document" />
        <div className="searchForm__inputs">
          <label className="label" htmlFor="inn">
            ИНН компании
            <sup className={!isInnValid && innTouched ? "errorSup" : ""}>*</sup>
          </label>
          <input
            className={isInnValid || !innTouched ? "input" : "inputError"}
            type="text"
            id="inn"
            placeholder="10 цифр"
            name="inn"
            value={inn}
            onChange={onChangeInn}
          />
          {!isInnValid && innTouched && (
            <section className="innError">Введите корректные данные</section>
          )}
          <label htmlFor="tone">Тональность</label>
          <select
            className="input"
            id="tone"
            value={tonality}
            onChange={onSelectHandle}
          >
            <option value="positive">позитивная</option>
            <option value="negative">негативная</option>
            <option value="any">любая</option>
          </select>
          <label className="label" htmlFor="documentQuantity">
            Количество документов в выдаче
            <sup
              className={
                !isDocQuantityValid && docQuantityTouched ? "errorSup" : ""
              }
            >
              *
            </sup>
          </label>
          <input
            className={
              isDocQuantityValid || !docQuantityTouched ? "input" : "inputError"
            }
            type="number"
            id="documentQuantity"
            placeholder="От 0 до 1000"
            min="0"
            max="1000"
            name="documentQuantity"
            value={accessedDocs}
            onChange={onChangeQuantity}
          />
          {!isDocQuantityValid && docQuantityTouched && (
            <section className="innError">Обязательное поле</section>
          )}
          <label htmlFor="start">
            Диапазон поиска
            <sup className={!isDateValid && dateTouched ? "errorSup" : ""}>
              *
            </sup>
          </label>
          <div className="dateSpan">
            <input
              className={isDateValid || !dateTouched ? "input" : "inputError"}
              type="date"
              id="start"
              name="startDate"
              placeholder="Дата начала"
              value={startDate}
              onChange={onChangeStartDate}
            />
            <input
              className={isDateValid || !dateTouched ? "input" : "inputError"}
              type="date"
              id="end"
              name="endDate"
              placeholder="Дата конца"
              value={endDate}
              onChange={onChangeEndDate}
            />
          </div>
          {!isDateValid && dateTouched && (
            <section className="innError dateError">
              Введите корректные данные
            </section>
          )}
          <div className="searchForm__btn toggle-btn">
            <button
              type="submit"
              disabled={submitDisabled}
              style={{ opacity: submitDisabled ? "50%" : "100%" }}
              className="requestForm__button"
            >
              Поиск
            </button>
            <span className="searchForm__span">
              * Обязательные к заполнению поля
            </span>
          </div>
        </div>
        <div className="searchForm__checkBoxesAndBtn">
          <div className="searchForm__checkBoxes">
            <div className="check">
              <input
                className="checkBox"
                type="checkbox"
                id="first"
                name="maxFullness"
                onChange={(evt) => onCheckHandle(evt, setMaxFullness)}
                checked={maxFullness}
              />
              <label htmlFor="first">Признак максимальной полноты</label>
            </div>
            <div className="check">
              <input
                className="checkBox"
                type="checkbox"
                id="second"
                name="inBusinessNews"
                onChange={(evt) => onCheckHandle(evt, setInBusinessNews)}
                checked={inBusinessNews}
              />
              <label htmlFor="second">Упоминания в бизнес-контексте</label>
            </div>
            <div className="check">
              <input
                className="checkBox"
                type="checkbox"
                id="third"
                name="onlyMainRole"
                onChange={(evt) => onCheckHandle(evt, setOnlyMainRole)}
                checked={onlyMainRole}
              />
              <label htmlFor="third">Главная роль в публикации</label>
            </div>
            <div className="check disabled">
              <input
                className="checkBox"
                type="checkbox"
                id="fourth"
                name="checkBox"
                disabled
              />
              <label htmlFor="fourth">Публикации только с риск-факторами</label>
            </div>
            <div className="check disabled">
              <input
                className="checkBox"
                type="checkbox"
                id="fifth"
                name="checkBox"
                disabled
              />
              <label htmlFor="fifth">Включать технические новости рынков</label>
            </div>
            <div className="check">
              <input
                className="checkBox"
                type="checkbox"
                id="sixth"
                name="excludeAnnouncements"
                onChange={(evt) => onCheckHandle(evt, setExcludeAnnouncements)}
                checked={excludeAnnouncements}
              />
              <label htmlFor="sixth">Включать анонсы и календари</label>
            </div>
            <div className="check disabled">
              <input
                className="checkBox"
                type="checkbox"
                id="seventh"
                name="checkBox"
                disabled
              />
              <label htmlFor="seventh">Включать сводки новостей</label>
            </div>
          </div>
          <div className="searchForm__btn">
            <button
              className="requestForm__button"
              type="submit"
              disabled={submitDisabled}
              style={{ opacity: submitDisabled ? "50%" : "100%" }}
            >
              Поиск
            </button>
            <span className="searchForm__span">
              * Обязательные к заполнению поля
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
