import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import {
  AUTH_ERROR_MESSAGE,
  INVALID_AUTH_DATA_ERROR_MESSAGE,
  INVALID_REG_DATA_MESSAGE,
  NOT_UNIQUE_EMAIL_ERROR_MESSAGE,
  REG_ERROR_MESSAGE, UPDATE_USER_ERROR_MESSAGE, UPDATE_USER_MESSAGE,
} from '../../utils/constants';

const App = () => {
  // состояние кнопок попапов
  const [buttonLogin, setButtonLogin] = useState({
    buttonText: 'Войти',
    block: false,
  });
  const [buttonRegister, setButtonRegister] = useState({
    buttonText: 'Зарегистрироваться',
    block: false,
  });
  const [buttonUpdateUser, setButtonUpdateUser] = useState({
    buttonText: 'Сохранить',
    block: false,
  });

  const [regErrorMessage, setRegErrorMessage] = useState('');
  const [authErrorMessage, setAuthErrorMessage] = useState('');
  const [updateUserInfo, setUpdateUserInfo] = useState({ message: '', isSuccess: true });
  // состояние авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // состояние страницы профиля
  const [isEditProfile, setIsEditProfile] = useState(false);
  // данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  // сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();

  const resetMessages = () => {
    setRegErrorMessage('');
    setAuthErrorMessage('');
    setUpdateUserInfo({ message: '', isSuccess: true });
  };

  const handleSaveMovie = async (movie) => {
    try {
      const savedMovie = await mainApi.saveMovie(movie);
      setSavedMovies([...savedMovies, savedMovie]);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const { _id: deleteMovieId } = await mainApi.deleteSavedMovie(movieId);
      const updatedSavedMovies = savedMovies.filter(({ _id }) => _id !== deleteMovieId);
      setSavedMovies(updatedSavedMovies);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
    }
  };

  const handleUpdateUser = async (userInfo) => {
    try {
      setUpdateUserInfo({ message: '', isSuccess: true });
      setButtonUpdateUser({ buttonText: 'Сохранение...', block: true });
      const user = await mainApi.updateUserInfo(userInfo);
      setCurrentUser(user);
      setUpdateUserInfo({ message: UPDATE_USER_MESSAGE, isSuccess: true });
      setIsEditProfile(false);
    } catch (error) {
      if (error === 409) {
        setUpdateUserInfo({ message: NOT_UNIQUE_EMAIL_ERROR_MESSAGE, isSuccess: false });
      } else {
        setUpdateUserInfo({ message: UPDATE_USER_ERROR_MESSAGE, isSuccess: false });
      }
      console.log(`Ошибка: ${error}`);
    } finally {
      setButtonUpdateUser({ buttonText: 'Сохранить', block: false });
    }
  };

  const handleRegistration = async (data) => {
    try {
      setButtonRegister({ buttonText: 'Регистрация...', block: true });
      await mainApi.registration(data);
      setRegErrorMessage('');
      navigate('/signin', { replace: true });
    } catch (error) {
      if (error === 409) {
        setRegErrorMessage(NOT_UNIQUE_EMAIL_ERROR_MESSAGE);
      } else if (error === 400) {
        setRegErrorMessage(INVALID_REG_DATA_MESSAGE);
      } else {
        setRegErrorMessage(REG_ERROR_MESSAGE);
      }
      console.log(`Ошибка: ${error}`);
    } finally {
      setButtonRegister({ buttonText: 'Зарегистрироваться', block: false });
    }
  };

  const handleAuthorization = async (data) => {
    try {
      setButtonLogin({ buttonText: 'Вход...', block: true });
      await mainApi.authorization(data);
      setAuthErrorMessage('');
      setIsLoggedIn(true);
    } catch (error) {
      if (error === 401) {
        setAuthErrorMessage(INVALID_AUTH_DATA_ERROR_MESSAGE);
      } else {
        setAuthErrorMessage(AUTH_ERROR_MESSAGE);
      }
      console.log(`Ошибка: ${error}`);
    } finally {
      setButtonLogin({ buttonText: 'Войти', block: false });
    }
  };

  const handleLogout = async () => {
    try {
      await mainApi.logout();
      setIsLoggedIn(false);
      navigate('/signin', { replace: true });
      localStorage.clear();
    } catch (error) {
      console.log(`Ошибка: ${error}`);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const [user, savedUserMovies] = await Promise.all([
          mainApi.getUserInfo(),
          mainApi.getSavedMovies(),
        ]);
        setCurrentUser(user);
        setSavedMovies(savedUserMovies);
        setIsLoggedIn(true);
        navigate('/movies', { replace: true });
      } catch (error) {
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
          element={<Main isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                buttonState={buttonUpdateUser}
                onEdit={setIsEditProfile}
                isEditProfile={isEditProfile}
                onSubmit={handleUpdateUser}
                requestStatus={updateUserInfo}
                resetRequestMessage={resetMessages}
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/movies"
          element={(
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Movies
                isLoggedIn={isLoggedIn}
                onSaveMovies={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
              />
            </ProtectedRoute>
          )}
        />

        <Route
          path="/saved-movies"
          element={(
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedMovies
                isLoggedIn={isLoggedIn}
                savedMovies={savedMovies}
                onDeleteMovie={handleDeleteMovie}
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/signup"
          element={(
            <Register
              onRegister={handleRegistration}
              requestErrorMessage={regErrorMessage}
              buttonState={buttonRegister}
              resetRequestError={resetMessages}
            />
          )}
        />
        <Route
          path="/signin"
          element={(
            <Login
              onLogin={handleAuthorization}
              requestErrorMessage={authErrorMessage}
              buttonState={buttonLogin}
              resetRequestError={resetMessages}
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
