import { useState, useEffect } from 'react';
import {
  Routes, Route, useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as leoProfanity from 'leo-profanity';
import { ToastContainer, toast } from 'react-toastify';
import {
  getInitialData,
  newMessage,
  addChannel,
  renameChannel,
  removeChannel,
} from './storeManager/chatSlice';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { socket } from './utils/socket';
import Chats from './Pages/Chats';
import NotFoundPage from './Pages/NotFoundPage';
import UserContext from './context/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';

const App = () => {
  const { t } = useTranslation;
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [fetchError, setFetchError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const russianDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(russianDictionary);

  const getData = () => {
    const axiosReq = axios.create({
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    axiosReq.get('/api/v1/data').then((response) => {
      dispatch(getInitialData(response.data));
    });
  };

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
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
        setFetchError('');
        localStorage.setItem('username', res.data.username);
        return res.data;
      })
      .catch(() => toast.error(t('alerts.loginFail')));
  };

  const createNewUser = (data) => {
    axios.post('/api/v1/signup', { username: data.username, password: data.password })
      .then((res) => {
        setFetchError('');
        localStorage.setItem('jwt', res.data.token); // => { token: ..., username: 'newuser' }
        localStorage.setItem('username', res.data.username);
        checkToken();
      })
      .catch(() => toast.error(t('alerts.signupFail')));
  };

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(newMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      toast.success(t('alerts.newChannel'));
      dispatch(addChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      toast.info(t('alerts.removeChannel'));
      dispatch(removeChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      toast.success(t('alerts.renameChannel'));
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  };

  return (
    <UserContext.Provider value={userInfo}>
      <div className="h-100">
        <ToastContainer />
        <Header logout={logout} isLogin={isLogin} />
        <Routes>
          <Route path="/" element={<Chats />} />
          <Route path="/login" element={<Login userLogin={userLogin} fetchError={fetchError} />} />
          <Route path="/signup" element={<Signup createNewUser={createNewUser} fetchError={fetchError} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
