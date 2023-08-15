import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { testMovies } from '../../utils/constants';
import PageNotFound from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const App = () => {
  // анимация загрузки
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  // состояние кнопок попапов
  const [buttonLogin, setButtonLogin] = useState({
    buttonText: 'Войти',
    block: false,
  });
  const [buttonRegister, setButtonRegister] = useState({
    buttonText: 'Зарегистрироваться',
    block: false,
  });
  // // текущая карточка
  // const [selectedCard, setSelectedCard] = useState(null);
  // // данные удаляемой карточки
  // const [deletedCardId, setDeletedCardId] = useState(null);
  // состояние регистрации
  const [requestErrorMessage, setRequestErrorMessage] = useState('');
  // состояние авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // // e-mail пользователя
  // const [userEmail, setUserEmail] = useState(null);
  // // данные пользователя
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const handleRegistration = useCallback(async (data) => {
    try {
      setButtonRegister({ buttonText: 'Регистрация...', block: true });
      await mainApi.registration(data);
      setRequestErrorMessage('');
      navigate('/signin', { replace: true });
    } catch (error) {
      if (error === 409) {
        setRequestErrorMessage('Пользователь с таким email уже существует');
      } else {
        setRequestErrorMessage('При регистрации пользователя произошла ошибка.');
      }
      console.log(`Ошибка: ${error}`);
    } finally {
      setButtonRegister({ buttonText: 'Зарегистрироваться', block: false });
    }
  }, []);

  const handleAuthorization = useCallback(async (data) => {
    try {
      setButtonLogin({ buttonText: 'Вход...', block: true });
      await mainApi.authorization(data);
      setIsLoading(true);
      setIsLoggedIn(true);
    } catch (error) {
      if (error === 401) {
        setRequestErrorMessage('Вы ввели неправильный логин или пароль.');
      } else {
        setRequestErrorMessage('Что-то пошло не так! Попробуйте еще раз');
      }
      setIsLoading(false);
      console.log(`Ошибка: ${error}`);
    } finally {
      setButtonLogin({ buttonText: 'Войти', block: false });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await mainApi.logout();
      setIsLoggedIn(false);
      navigate('/signin', { replace: true });
    } catch (error) {
      console.log(`Ошибка: ${error}`);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await mainApi.getUserInfo();
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate('/movies', { replace: true });
      } catch (error) {
        setIsLoading(false);
        if (error === 401) {
          console.log(`Ошибка: ${error} Необходима авторизация`);
          return;
        }
        console.log(`Ошибка: ${error}`);
      }
    })();
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={<Main />}
        />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile onLogout={handleLogout} />
            </ProtectedRoute>
        )}
        />
        <Route
          path="/movies"
          element={(
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Movies movies={testMovies} />
            </ProtectedRoute>
        )}
        />

        <Route
          path="/saved-movies"
          element={(
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedMovies movies={testMovies} />
            </ProtectedRoute>
        )}
        />
        <Route
          path="/signup"
          element={(
            <Register
              onRegister={handleRegistration}
              requestErrorMessage={requestErrorMessage}
              buttonState={buttonRegister}
            />
)}
        />
        <Route
          path="/signin"
          element={(
            <Login
              onLogin={handleAuthorization}
              requestErrorMessage={requestErrorMessage}
              buttonState={buttonLogin}
            />
)}
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
};

export default App;
