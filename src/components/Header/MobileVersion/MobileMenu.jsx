import React from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import './MobileMenu.css';
import logo from '../../../media/Footer/logo.svg';
import mobile from '../../../media/MobileMenu/mobile.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../../requests/profile';

const LoginButton = () => {
  const companyInfo = useSelector(state => state.profile.companyInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate('/login');
    if (companyInfo) {
      dispatch(signOut());
    }
  };

  const titleButton = companyInfo ? 'Выйти' : 'Войти';

  return (
    <button className='button' type='button' onClick={handleClick}>
      {titleButton}
    </button>
  );
};

const ReturnMain = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return <Nav.Link href='/' onClick={handleClick}>Главная</Nav.Link>;
};

const MobileMenu = () => {
  const expand = false;

  return (
    <Navbar key={expand} expand={expand} className='mb-3 MobileMenu'>
      <Container fluid>
        <Navbar.Toggle bg='*' aria-controls={`offcanvasNavbar-expand-${expand}`} className='own MobileMenu border-0 shadow-none'>
          <img src={mobile} alt='mobile' />
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement='end'
        >
          <Offcanvas.Header closeButton className='MobileMenu__header closeButton d-flex'>
            <div className='logo'>
              <img src={logo} alt='logo' />
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body className='MobileMenu__body'>
            <Nav className='text-center nav'>
              <ReturnMain />
              <Nav.Link href='###' style={{ pointerEvents: 'none' }}>Тарифы</Nav.Link>
              <Nav.Link href='###' style={{ pointerEvents: 'none' }}>FAQ</Nav.Link>
            </Nav>
            <a className='MobileMenu__link' href='XXX' >Зарегистрироваться</a>
            <LoginButton />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MobileMenu;
