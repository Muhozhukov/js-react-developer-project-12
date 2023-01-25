import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import sendMessage from '../../images/sendMessage.svg';
// eslint-disable-next-line import/no-cycle
import { socket } from '../../utils/socket';

import 'react-toastify/dist/ReactToastify.css';

const SendMsgForm = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector((state) => state.chat.currentChannelId);
  const [msgText, setMsgText] = useState('');
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (msgText.length) socket.emit('newMessage', { body: msgText, channelId: currentChannel, username: localStorage.getItem('username') });
    const objDiv = document.getElementById('messages-box');
    objDiv.scrollTop = objDiv.scrollHeight + 24;
    setMsgText('');
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={handleSendMessage}>
        <Form.Group className="input-group has-validation">
          <Form.Control
            className="border-0 p-0 ps-2 form-control"
            placeholder={t('forms.sendMessage.placeholder')}
            aria-label="Сообщение"
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
          />
          <Button variant className="btn btn-group-vertical" type="submit"><img src={sendMessage} alt="12" /></Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SendMsgForm;
