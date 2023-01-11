import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="userName">
        Имя пользователя
        <input
          id="userName"
          name="userName"
          type="text"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      {formik.touched.userName && formik.errors.userName && (
        <div>{formik.errors.userName}</div>)}
      <label htmlFor="password">
        Пароль
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </label>
      {formik.touched.password && formik.errors.password && (
        <div>{formik.errors.password}</div>)}
    </form>
  );
};

export default Login;
