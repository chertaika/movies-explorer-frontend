import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

const App = () => (
  <Routes>
    <Route
      path="/"
      element={<Main />}
    />
    <Route
      path="/profile"
      element={<Profile />}
    />
    <Route
      path="/sign-up"
      element={<Register requestErrorText="Пользователь с таким email уже существует." />}
    />
    <Route
      path="/sign-in"
      element={<Login requestErrorText="При авторизации произошла ошибка. Токен не передан или передан не в том формате." />}
    />
  </Routes>

);

export default App;
