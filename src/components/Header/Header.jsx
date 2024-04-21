import React from 'react';
import { useSelector } from 'react-redux';
import './Header.css';
import AccountBeforeAuthorization from './AccountBeforeAuthorization/AccountBeforeAuthorization';
import AccountAfterAuthorization from './AccountAfterAuthorization/AccountAfterAuthorization';
import NavBar from './Navbar/Navbar';
import MobileMenu from './MobileVersion/MobileMenu';
import logo from '../../media/Header/logo.svg';

function Header() {
  const accountInfo = useSelector((state)=>state.profile.companyInfo);
  const AccountElement = accountInfo ? AccountAfterAuthorization : AccountBeforeAuthorization
  return (
    <header className='header'>
      <div className='header__wrapper'>
      <div className='logo'>
        <img src={logo} alt='logo'/>
    </div>
        <NavBar />
        <AccountElement /> 
        <MobileMenu />       
      </div>  
    </header>
  )
};

export default Header;
