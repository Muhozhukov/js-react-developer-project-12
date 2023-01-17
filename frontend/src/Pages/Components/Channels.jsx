import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { changeChannel, manipulateModal } from '../../storeManager/chatSlice';
import addChannel from '../../images/addChannel.svg';

const Channels = () => {
  const dispatch = useDispatch();
  const openAddChannelPopup = () => {
    dispatch(manipulateModal({
      type: 'addChannel',
      extra: null,
      isOpened: true,
    }));
  };
  const openRenameChannelPopup = (id) => {
    dispatch(manipulateModal({
      type: 'renameChannel',
      isOpened: true,
      extra: { id },
    }));
  };
  const openRemoveChannelPopup = (id) => {
    dispatch(manipulateModal({
      type: 'removeChannel',
      isOpened: true,
      extra: { id },
    }));
  };
  const channels = useSelector((state) => state.chat.channels);
  const currentChannel = useSelector((state) => state.chat.currentChannelId);
  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button className="p-0" variant="light" onClick={openAddChannelPopup}>
          <img src={addChannel} alt="Добавить канал" />
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <li key={channel.id} className="d-flex nav-item w-100">
            <Button
              variant={currentChannel === channel.id && 'secondary'}
              className="w-100 rounded-0 text-start text-truncate"
              onClick={() => dispatch(changeChannel(channel.id))}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
            {channel.removable && (
              <DropdownButton variant="light" as={ButtonGroup} title="" id="bg-nested-dropdown">
                <Dropdown.Item eventKey="1" onClick={() => openRemoveChannelPopup(channel.id)}>Удалить</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => openRenameChannelPopup(channel.id)}>Переименовать</Dropdown.Item>
              </DropdownButton>
            )}
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
