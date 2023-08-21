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

  const [requestErrorMessage, setRequestErrorMessage] = useState('');
  // состояние авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  // сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();

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

  const handleRegistration = async (data) => {
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
  };

  const handleAuthorization = async (data) => {
    try {
      setButtonLogin({ buttonText: 'Вход...', block: true });
      await mainApi.authorization(data);
      setIsLoggedIn(true);
    } catch (error) {
      if (error === 401) {
        setRequestErrorMessage('Вы ввели неправильный логин или пароль.');
      } else {
        setRequestErrorMessage('Что-то пошло не так! Попробуйте еще раз');
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
              <Profile isLoggedIn={isLoggedIn} onLogout={handleLogout} />
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
