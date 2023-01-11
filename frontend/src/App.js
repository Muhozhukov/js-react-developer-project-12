import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Pages/Login';
import NotFoundPage from './Pages/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const userLogin = (data) => {
    axios.post('/api/v1/login', data)
      .then((res) => {
        const jwt = res.data.token;
        if (jwt) {
          setIsLogin(true);
          navigate('/');
          localStorage.setItem('jwt', jwt);
        }
        return res.data;
      });
  };

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLogin(true);
      navigate('/');
    } else {
      setIsLogin(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    checkToken();
    console.log(isLogin);
  }, []);

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  return (
    <Routes>
      <Route path="/" element={<div>hello world</div>} />
      <Route path="/login" element={<Login userLogin={userLogin} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
