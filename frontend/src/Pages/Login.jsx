/* eslint-disable react/no-children-prop */
import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';

const Login = ({ userLogin, fetchError }) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Имя пользователя обязательно для заполнения'),
      password: Yup.string()
        .min(5, 'Длина пароля должна быть не менее 5 символов')
        .required('Пароль обязателен для заполнения'),
    }),
    onSubmit: (values) => {
      userLogin(values);
    },
  });
  return (
    <div className="d-flex flex-column h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Container fluid className="h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <Card className="shadow-sm">
                <Card.Body className="p-5">
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">{t('forms.login.title')}</h1>
                    <Form.Group className="mb-3" id="username">
                      <FloatingLabel label={t('forms.login.name')}>
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
                      <FloatingLabel label={t('forms.login.password')}>
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
                    <Button type="submit" variant="primary" className="w-100">{t('forms.login.loginButton')}</Button>
                  </Form>
                  {fetchError && <p className="text-danger align-center">{fetchError}</p>}
                </Card.Body>
                <Card.Footer className="p-4">
                  <div className="text-center">
                    {t('forms.login.toSignupText')}
                    <Link to="/signup">{t('forms.login.toSignupLink')}</Link>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </Container>
      </Row>
    </div>
  );
};

export default Login;
