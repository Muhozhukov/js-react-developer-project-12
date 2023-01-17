import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
// eslint-disable-next-line import/no-cycle
import { socket } from '../../App';

const PopupBody = ({ closeModal }) => {
  const [value, setValue] = useState('');
  const modalInfo = useSelector((state) => state.chat.modal);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    closeModal();
    switch (modalInfo.type) {
      case 'addChannel': return socket.emit('newChannel', { name: value });
      case 'renameChannel': return socket.emit('renameChannel', { id: modalInfo.extra.id, name: value });
      case 'removeChannel': return socket.emit('removeChannel', { id: modalInfo.extra.id });
      default: return null;
    }
  };
  switch (modalInfo.type) {
    case 'addChannel': return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Название канала</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название канала"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal()}>Закрыть</Button>
          <Button variant="primary" onClick={handleSubmit}>Отправить</Button>
        </Modal.Footer>
      </>
    );
    case 'renameChannel': return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Название канала</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название канала"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal()}>Закрыть</Button>
          <Button variant="primary" onClick={handleSubmit}>Отправить</Button>
        </Modal.Footer>
      </>
    );
    case 'removeChannel': return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal()}>Закрыть</Button>
          <Button variant="danger" onClick={(e) => handleSubmit(e)}>Удалить</Button>
        </Modal.Footer>
      </>
    );
    default: return 'Модальное окно';
  }
};

export default PopupBody;
