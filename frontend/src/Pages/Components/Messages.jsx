import React from 'react';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
// eslint-disable-next-line import/no-cycle
import SendMsgForm from './SendMsgForm';

const Messages = () => {
  const { currentChat, messages } = useSelector((state) => {
    const { chat } = state;
    const channel = chat.channels.find((i) => i.id === chat.currentChannelId);
    const filteredMessages = chat.messages.filter((m) => m.channelId === chat.currentChannelId);
    return { currentChat: channel, messages: filteredMessages };
  });
  return (
    <Col className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${currentChat?.name}`}</b></p>
          <span className="text-muted">321 сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 " style={{ 'min-height': '550px', 'max-height': '550px' }}>
          {messages.map((msg) => (
            <div key={msg.id} className="text-break mb-2">
              <b>{msg.username}</b>
              :
              {' '}
              {typeof msg.body === 'string' ? msg.body : null}
            </div>
          ))}
        </div>
        <SendMsgForm />
      </div>
    </Col>
  );
};

export default Messages;
