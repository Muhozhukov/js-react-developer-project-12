import React from 'react';
import { useTranslation } from 'react-i18next';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Header = ({ isLogin }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  };
  return (
    <Nav justify navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Nav.Item>
        <Link to={isLogin ? '/' : '/login'}>{t('links.main')}</Link>
      </Nav.Item>
      {logout && isLogin && (
      <Nav.Item>
        <Nav.Link eventKey="logout" onClick={logout}>
          <Button>{t('links.logout')}</Button>
        </Nav.Link>
      </Nav.Item>
      )}
    </Nav>
  );
};

export default Header;
