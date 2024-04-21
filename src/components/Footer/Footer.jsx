import React from 'react'
import  './Footer.css'
import logo from '../../media/Footer/logo.svg';


const Footer = () => {
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <div className='footer__wrapper'>
      <img src={logo} alt='logo'/>
        <div className='footer__connectInfo'>
          <div>г. Москва, Цветной б-р, 40</div>
          <div>+7 4212 36 21 11</div>
          <div>info@skan.ru</div>
          <p>Copyright. {currentYear}</p>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
