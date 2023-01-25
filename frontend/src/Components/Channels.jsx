import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeChannel, manipulateModal } from '../storeManager/chatSlice';
// import addChannel from '../images/addChannel.svg';

const Channels = () => {
  const { t } = useTranslation();
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
        <span>{t('Channels title')}</span>
        <Button className="p-0" variant="light" onClick={openAddChannelPopup}>
          +
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          channel.removable ? (
            <li key={channel.id} className="d-flex nav-item w-100">
              <Dropdown className="w-100" as={ButtonGroup}>
                <Button
                  variant={currentChannel === channel.id && 'secondary'}
                  className="w-100 rounded-0 text-start text-truncate"
                  onClick={() => dispatch(changeChannel(channel.id))}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>

                <Dropdown.Toggle split variant={currentChannel === channel.id && 'secondary'}>
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="light" title="">
                  <Dropdown.Item eventKey="1" onClick={() => openRemoveChannelPopup(channel.id)}>{t('buttons.delete')}</Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={() => openRenameChannelPopup(channel.id)}>{t('buttons.rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ) : (
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
                <Dropdown.Item eventKey="1" onClick={() => openRemoveChannelPopup(channel.id)}>{t('buttons.delete')}</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => openRenameChannelPopup(channel.id)}>{t('buttons.rename')}</Dropdown.Item>
              </DropdownButton>
              )}
            </li>
          )
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
