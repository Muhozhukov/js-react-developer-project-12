/* eslint-disable consistent-return */
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { socket } from '../utils/socket';
import 'react-toastify/dist/ReactToastify.css';

const PopupBody = ({ closeModal }) => {
  const { t } = useTranslation();
  const modalInfo = useSelector((state) => state.chat.modal);
  const channels = useSelector((state) => state.chat.channels);
  const handleValidateChannelName = (value) => channels.some((i) => i.name === value);

  const handleSubmit = (data) => {
    if (handleValidateChannelName(data.channelName)) {
      // eslint-disable-next-line no-use-before-define
      formik.errors.channelName = 'Такое название уже существует';
      toast.error('Канал с таким названием уже существует!');
    } else {
      closeModal();
      switch (modalInfo.type) {
        case 'addChannel': {
          return socket.emit('newChannel', { name: data.channelName });
        }
        case 'renameChannel': {
          return socket.emit('renameChannel', { id: modalInfo.extra.id, name: data.channelName });
        }
        case 'removeChannel': {
          return socket.emit('removeChannel', { id: modalInfo.extra.id });
        }
        default: return null;
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: Yup.object({
      channelName: Yup.string()
        .required('Название канала обязательно для заполнения')
        .min(3, 'Название должно быть не менее 3 символов'),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  switch (modalInfo.type) {
    case 'addChannel': return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>{t('forms.addChannel.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" id="channelName">
              <Form.Label>{t('forms.addChannel.label')}</Form.Label>
              <Form.Control
                id="channelName"
                name="channelName"
                type="text"
                placeholder={t('forms.addChannel.placeholder')}
                value={formik.values.channelName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.channelName && formik.errors.channelName && (
              <Form.Text className="text-danger">{formik.errors.channelName}</Form.Text>)}
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => closeModal()}>{t('buttons.close')}</Button>
              <Button variant="primary" type="submit">{t('buttons.send')}</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </>
    );
    case 'renameChannel': return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>{t('forms.renameChannel.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" id="channelName">
              <Form.Label>{t('forms.renameChannel.label')}</Form.Label>
              <Form.Control
                id="channelName"
                name="channelName"
                type="text"
                placeholder={t('forms.addChannel.placeholder')}
                value={formik.values.channelName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.channelName && formik.errors.channelName && (
              <Form.Text className="text-danger">{formik.errors.channelName}</Form.Text>)}
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => closeModal()}>{t('buttons.close')}</Button>
              <Button variant="primary" type="submit">{t('buttons.send')}</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </>
    );
    case 'removeChannel': return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>{t('forms.removeChannel.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal()}>{t('buttons.close')}</Button>
          <Button variant="danger" type="submit" onClick={(e) => handleSubmit(e)}>{t('buttons.delete')}</Button>
        </Modal.Footer>
      </>
    );
    default: return 'Модальное окно';
  }
};

export default PopupBody;
