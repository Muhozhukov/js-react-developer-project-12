/* eslint-disable react/no-children-prop */
import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Header from './Components/Header';

const Signup = ({ createNewUser, fetchError }) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Имя пользователя обязательно для заполнения')
        .min(3, 'Имя должно содержать минимум 3 символа')
        .max(20, 'Имя должно содержать максимум 20 символов'),
      password: Yup.string()
        .min(6, 'Длина пароля должна быть не менее 6 символов')
        .required('Пароль обязателен для заполнения'),
      repeatPassword: Yup.string()
        .min(6, 'Длина пароля должна быть не менее 6 символов')
        .required('Пароль обязателен для заполнения')
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
    }),
    onSubmit: (values) => {
      createNewUser(values);
    },
  });
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container fluid>
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="p-5">
                <Form onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('forms.signup.title')}</h1>
                  <Form.Group className="mb-3" id="username">
                    <FloatingLabel label={t('forms.signup.name')}>
                      <Form.Control
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Введите имя пользователя"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </FloatingLabel>
                    {formik.touched.username && formik.errors.username && (
                    <Form.Text className="text-danger">{formik.errors.username}</Form.Text>)}
                  </Form.Group>
                  <Form.Group className="mb-3" id="password">
                    <FloatingLabel label={t('forms.signup.password')}>
                      <Form.Control
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Введите пароль"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </FloatingLabel>
                    {formik.touched.password && formik.errors.password && (
                    <Form.Text className="text-danger">{formik.errors.password}</Form.Text>)}
                  </Form.Group>
                  <Form.Group className="mb-3" id="repeatPassword">
                    <FloatingLabel label={t('forms.signup.repeatPassword')}>
                      <Form.Control
                        id="repeatPassword"
                        name="repeatPassword"
                        type="password"
                        placeholder="Введите пароль"
                        value={formik.values.repeatPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </FloatingLabel>
                    {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                    <Form.Text className="text-danger">{formik.errors.repeatPassword}</Form.Text>)}
                  </Form.Group>
                  <Form.Control type="submit" className="btn btn-primary" value={t('buttons.enter')} />
                </Form>
                {fetchError && <p className="text-danger align-center">{fetchError}</p>}
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
