import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const Header = ({ logout }) => (
  <Nav justify navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <Nav.Item>
      <Nav.Link eventKey="home">Home</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="logout" onClick={logout}>
        <Button>Выйти</Button>
      </Nav.Link>
    </Nav.Item>
  </Nav>
);

export default Header;
