/* eslint-disable react/no-children-prop */
import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';

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
        .min(3, t('forms.signup.nameValidationError'))
        .max(20, t('forms.signup.nameValidationError')),
      password: Yup.string()
        .min(6, t('forms.signup.passwordValidationError'))
        .required('Пароль обязателен для заполнения'),
      repeatPassword: Yup.string()
        .required('Пароль обязателен для заполнения')
        .oneOf([Yup.ref('password'), null], t('forms.signup.confirmPasswordValidationError')),
    }),
    onSubmit: (values) => {
      createNewUser(values);
    },
  });
  return (
    <div className="d-flex flex-column h-100">
      <Container fluid>
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="p-5">
                <Form onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('forms.signup.title')}</h1>
                  <FloatingLabel controlId="username" className="mb-3" label={t('forms.signup.name')}>
                    <Form.Control
                      // id="username"
                      name="username"
                      type="text"
                      placeholder="Введите имя пользователя"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isValid={formik.touched.username && !formik.errors.username}
                      isInvalid={formik.touched.username && !!formik.errors.username}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel className="mb-3" controlId="password" label={t('forms.signup.password')}>
                    <Form.Control
                        // id="password"
                      name="password"
                      type="password"
                      placeholder="Введите пароль"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isValid={formik.touched.password && !formik.errors.password}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel className="mb-3" controlId="repeatPassword" label={t('forms.signup.repeatPassword')}>
                    <Form.Control
                        // id="repeatPassword"
                      name="repeatPassword"
                      type="password"
                      placeholder="Введите пароль"
                      value={formik.values.repeatPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isValid={formik.touched.repeatPassword && !formik.errors.repeatPassword}
                      isInvalid={formik.touched.repeatPassword && !!formik.errors.repeatPassword}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.repeatPassword}</Form.Control.Feedback>
                  </FloatingLabel>
                  <Button type="submit" variant="outline-primary" className="w-100">{t('forms.signup.signupButton')}</Button>
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
