/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import axios from 'axios';
import {
  getInitialData,
  newMessage,
  addChannel,
  renameChannel,
  removeChannel,
} from './storeManager/chatSlice';
import Login from './Pages/Login';
// eslint-disable-next-line import/no-cycle
import Chats from './Pages/Chats';
import NotFoundPage from './Pages/NotFoundPage';
import UserContext from './context/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export const socket = io();
const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const initialData = useSelector((state) => state);
  const axiosReq = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = () => {
    console.log(initialData);
    axiosReq.get('/api/v1/data').then((response) => {
      dispatch(getInitialData(response.data));
    });
  };

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLogin(true);
      getData();
      navigate('/');
    } else {
      setIsLogin(false);
      navigate('/login');
    }
  };

  const userLogin = (data) => {
    axios.post('/api/v1/login', data)
      .then((res) => {
        const jwt = res.data.token;
        if (jwt) {
          setIsLogin(true);
          navigate('/');
          localStorage.setItem('jwt', jwt);
        }
        setUserInfo(res.data.username);
        localStorage.setItem('username', res.data.username);
        return res.data;
      });
  };

  useEffect(() => {
    checkToken();
    socket.on('newMessage', (payload) => {
      dispatch(newMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, []);

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  return (
    <UserContext.Provider value={userInfo}>
      <Routes>
        <Route path="/" element={<Chats />} />
        <Route path="/login" element={<Login userLogin={userLogin} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
