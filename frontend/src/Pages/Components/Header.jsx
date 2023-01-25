import React from 'react';
import { useTranslation } from 'react-i18next';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Header = ({ logout }) => {
  const { t } = useTranslation();
  return (
    <Nav justify navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Nav.Item>
        <Link to="/">{t('links.main')}</Link>
      </Nav.Item>
      {logout && (
      <Nav.Item>
        <Nav.Link eventKey="logout" onClick={logout}>
          <Button>{t('links.exit')}</Button>
        </Nav.Link>
      </Nav.Item>
      )}
    </Nav>
  );
};

export default Header;
