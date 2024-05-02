import React from "react";
import "./ResultPage.css";
import aim from "../../media/R-Page/womenAim.svg";
import { useSelector } from "react-redux";
import PublicationCards from "./Pub-Cards/PublicationCards";
import ResultCarouselDesktop from "./Res-Carousel/ResultCarouselDesktop";
import ResultCarouselMobile from "./Res-Carousel/ResultCarouselMobile";

const ResultPage = () => {
  let Docs = useSelector((state) => state.histograms.histogramInfo);
  const newWidth = useSelector((state) => state.app.width);
  const isMobile = newWidth < 700;
  const ChosenCarousel = isMobile
    ? ResultCarouselMobile
    : ResultCarouselDesktop;

  return (
    <main className="resultsContainer">
      <div className="resultsContainer__wrapper">
        <div className="resultsContainer__top">
          <div className="resultsContainer__section">
            <h1 className="resultsContainer__heading">
              Ищем. Скоро будут результаты
            </h1>
            <section>
              Поиск может занять некоторое время, просим сохранять терпение.
            </section>
          </div>
          <div className="resultsContainer__imageBox">
            <img src={aim} alt="aim" />
          </div>
        </div>
        <div className="resultsContainer__middle">
          <div className="resultsContainer__section">
            <h1 className="resultsContainer__heading resultsContainer__heading--medium">
              Общая сводка
            </h1>
            <section className="resultsContainer__details">
              Найдено {Docs?.length || 0} варианта(ов)
            </section>
          </div>
          <ChosenCarousel />
        </div>
        <div className="resultsContainer__bottom">
          <div className="resultsContainer__section">
            <h1 className="resultsContainer__heading resultsContainer__heading--medium">
              список документов
            </h1>
            <PublicationCards />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResultPage;
