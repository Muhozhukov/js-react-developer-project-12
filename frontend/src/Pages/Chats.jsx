import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Channels from '../Components/Channels';
import Messages from '../Components/Messages';
import Popup from '../Components/Popup';

const Chats = () => (
  <div className="d-flex flex-column h-100">
    <Popup />
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  </div>
);

export default Chats;
