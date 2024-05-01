import React, { useState, useEffect } from 'react';
import './ResultCarousel.css';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { ReactComponent as RightChevron } from '../../../media/CommonAccess/MainCarousel/right-chevron.svg';
import { ReactComponent as LeftChevron } from '../../../media/CommonAccess/MainCarousel/left-chevron.svg';
import Period from './Period';

const ResultCarouselMobile = () => {
  const summary = useSelector((state) => state.histograms.histogramInfo);
  const [resultsLoaded, setResultsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const Arrow = ({ direction, ...props }) => {
    const Chevron = direction === 'left' ? LeftChevron : RightChevron;
    return <Chevron {...props} />;
  };

  const shouldShowArrows = resultsLoaded && summary && summary.length > 0;

  const settings = {
    slidesToScroll: 1,
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 1,
    swipeToSlide: true,
    nextArrow: shouldShowArrows ? <Arrow direction="right" /> : null,
    prevArrow: shouldShowArrows ? <Arrow direction="left" /> : null,
    key: currentSlide, // Обновляем ключ для принудительного перерендера Slider
  };

  useEffect(() => {
    // Устанавливаем, что результаты загружены при изменении summary
    if (summary && summary.length > 0) {
      setResultsLoaded(true);
    }
  }, [summary]);

  const handleAfterChange = (index) => {
    setCurrentSlide(index);
    setResultsLoaded(true);
  };

  return (
    <div className='blockMobile'>
      <div className='sectionsMobile'>
        {['Период', 'Всего', 'Риски'].map((label, index) => (
          <section key={index} className='sectionsMobile__item'>
            {label}
          </section>
        ))}
      </div>
      <div className='slider-wrapperMobile'>
        <Slider {...settings} afterChange={handleAfterChange}>
          {resultsLoaded &&
            summary &&
            summary.map((period, index) => (
              <Period
                key={index}
                className='periodItemCssMobile'
                date={period.date}
                total={period.total}
                risk={period.risk}
              />
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default ResultCarouselMobile;
