/* eslint-disable react/no-children-prop */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Login = ({ userLogin }) => {
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
    <Container fluid>
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" id="username">
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Введите имя пользователя"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.username && formik.errors.username && (
                  <Form.Text className="text-danger">{formik.errors.username}</Form.Text>)}
                </Form.Group>
                <Form.Group className="mb-3" id="password">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Введите пароль"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                  <Form.Text className="text-danger">{formik.errors.password}</Form.Text>)}
                </Form.Group>
                <Form.Control type="submit" className="btn btn-primary" value="Войти" />
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Login;
