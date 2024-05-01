import React from 'react';
import './ResultPage.css';
import aim from '../../media/R-Page/womenAim.svg';
import { useSelector } from 'react-redux';
import PublicationCards from './Pub-Cards/PublicationCards';
import ResultCarouselDesktop from './Res-Carousel/ResultCarouselDesktop';
import ResultCarouselMobile from './Res-Carousel/ResultCarouselMobile';

const ResultPage = () => {
  let Docs = useSelector(state => state.histograms.histogramInfo)
  const newWidth = useSelector(state => state.app.width)
  const isMobile = newWidth < 700
  const ChosenCarousel = isMobile ? ResultCarouselMobile : ResultCarouselDesktop
 
  return (
    <main className='resultMain'>
      <div className='resultMain__wrapper'>  
        <div className='resultMain__upper'>
          <div className='upper__box'>
            <h1 className='upper__title'>Ищем. Скоро будут результаты</h1>
            <section>Поиск может занять некоторое время, просим сохранять терпение.</section>
          </div>
          <div className='img__box'>
            <img src={aim} alt='aim'/>
          </div>
        </div>
        <div className='resultMain__middle'>
          <div className='upper__box'>
            <h1 className='upper__title upper__title_middle'>Общая сводка</h1>
            <section className='resultMain__section'>Найдено {Docs?.length||0} варианта(ов)</section>
          </div>
          <ChosenCarousel /> 
        </div>
        <div className='resultMain__lower'>
          <div className='lower__box'>
            <h1 className='upper__title upper__title_middle'>cписок документов</h1>
            <PublicationCards />
          </div>
        </div>
      </div>  
    </main>
  )
};

export default ResultPage;
