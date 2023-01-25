import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { manipulateModal } from '../storeManager/chatSlice';
import PopupBody from './PopupBody';

const Popup = () => {
  const modalInfo = useSelector((state) => state.chat.modal);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(manipulateModal({
      isOpened: false,
      type: null,
      extra: null,
    }));
  };
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={modalInfo.isOpened} onHide={() => closeModal()}>
        <PopupBody closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default Popup;
