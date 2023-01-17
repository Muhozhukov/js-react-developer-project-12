import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Channels from './Components/Channels';
import Header from './Components/Header';
// eslint-disable-next-line import/no-cycle
import Messages from './Components/Messages';
import Popup from './Components/Popup';

const Chats = () => {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  };
  return (
    <div className="d-flex flex-column h-100">
      <Popup />
      <Header logout={logout} />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
    </div>
  );
};

export default Chats;
