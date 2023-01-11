import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import NotFoundPage from './Pages/NotFoundPage';

const App = () => (
  <Routes>
    <Route path="/" element={<div>hello world</div>} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
