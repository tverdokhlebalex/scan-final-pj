import React from 'react';
import google from '../../../media/FormFooter/google.svg';
import yandex from '../../../media/FormFooter/yandex.svg';
import facebook from '../../../media/FormFooter/facebook.svg';
import './FormFooter.css';
const FormFooter = () => {
  return (
    <div className='formFooterContainer'>
      <section className='formFooterSection'>Войти через:</section>
      <div className='formFooterBox'>
        <div className='formFooterBoxItem'>
          <a className='formFooterBoxLink' href='xxx'>
            <img src={google} alt='GoogleLink' />
          </a>
        </div>
        <div className='formFooterBoxItem'>
          <a className='formFooterBoxLink' href='xxx'>
            <img src={facebook} alt='Facebook' />
          </a> 
        </div>
        <div className='formFooterBoxItem'>
          <a className='formFooterBoxLink' href='xxx'>
            <img src={yandex} alt='Yandex' />
          </a> 
        </div>
      </div> 
    </div>
  )
}

export default FormFooter;
