import './App.css';
import {
  Navigate, Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
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
  AUTH_ENDPOINT,
  AUTH_ERROR_MESSAGE,
  BUTTON_AUTH_BLOCKED_TEXT,
  BUTTON_AUTH_TEXT,
  BUTTON_REG_BLOCKED_TEXT,
  BUTTON_REG_TEXT,
  BUTTON_SAVE_BLOCKED_TEXT,
  BUTTON_SAVE_TEXT,
  ERROR,
  ERROR_CODE_400,
  ERROR_CODE_401,
  ERROR_CODE_409,
  INVALID_AUTH_DATA_ERROR_MESSAGE,
  INVALID_REG_DATA_MESSAGE,
  MOVIES_ENDPOINT,
  NOT_UNIQUE_EMAIL_ERROR_MESSAGE,
  PROFILE_ENDPOINT,
  REG_ENDPOINT,
  REG_ERROR_MESSAGE,
  SAVED_MOVIES_ENDPOINT,
  UNAUTHORIZED_ERROR_MESSAGE,
  UPDATE_USER_ERROR_MESSAGE,
  UPDATE_USER_MESSAGE,
} from '../../utils/constants';
import Preloader from '../Preloader/Preloader';

const App = () => {
  // состояние кнопок попапов
  const [buttonLogin, setButtonLogin] = useState({
    buttonText: BUTTON_AUTH_TEXT,
    block: false,
  });
  const [buttonRegister, setButtonRegister] = useState({
    buttonText: BUTTON_REG_TEXT,
    block: false,
  });
  const [buttonUpdateUser, setButtonUpdateUser] = useState({
    buttonText: BUTTON_SAVE_TEXT,
    block: false,
  });

  // анимация загрузки
  const [isLoading, setIsLoading] = useState(true);

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
  const { pathname } = useLocation();

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
      console.log(`${ERROR}: ${error}`);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const { _id: deleteMovieId } = await mainApi.deleteSavedMovie(movieId);
      const updatedSavedMovies = savedMovies.filter(({ _id }) => _id !== deleteMovieId);
      setSavedMovies(updatedSavedMovies);
    } catch (error) {
      console.log(`${ERROR}: ${error}`);
    }
  };

  const handleUpdateUser = async (userInfo) => {
    try {
      setUpdateUserInfo({ message: '', isSuccess: true });
      setButtonUpdateUser({ buttonText: BUTTON_SAVE_BLOCKED_TEXT, block: true });
      const user = await mainApi.updateUserInfo(userInfo);
      setCurrentUser(user);
      setUpdateUserInfo({ message: UPDATE_USER_MESSAGE, isSuccess: true });
      setIsEditProfile(false);
    } catch (error) {
      if (error === ERROR_CODE_409) {
        setUpdateUserInfo({ message: NOT_UNIQUE_EMAIL_ERROR_MESSAGE, isSuccess: false });
      } else {
        setUpdateUserInfo({ message: UPDATE_USER_ERROR_MESSAGE, isSuccess: false });
      }
      console.log(`${ERROR}: ${error}`);
    } finally {
      setButtonUpdateUser({ buttonText: BUTTON_SAVE_TEXT, block: false });
    }
  };

  const handleAuthorization = async (data) => {
    try {
      setIsLoading(true);
      setButtonLogin({ buttonText: BUTTON_AUTH_BLOCKED_TEXT, block: true });
      await mainApi.authorization(data);
      setAuthErrorMessage('');
      setIsLoggedIn(true);
    } catch (error) {
      if (error === ERROR_CODE_401) {
        setAuthErrorMessage(INVALID_AUTH_DATA_ERROR_MESSAGE);
      } else {
        setAuthErrorMessage(AUTH_ERROR_MESSAGE);
      }
      console.log(`${ERROR}: ${error}`);
    } finally {
      setIsLoading(false);
      setButtonLogin({ buttonText: BUTTON_AUTH_TEXT, block: false });
    }
  };

  const handleRegistration = async (data) => {
    try {
      setIsLoading(true);
      setButtonRegister({ buttonText: BUTTON_REG_BLOCKED_TEXT, block: true });
      await mainApi.registration(data);
      setRegErrorMessage('');
      await handleAuthorization(data);
    } catch (error) {
      if (error === ERROR_CODE_409) {
        setRegErrorMessage(NOT_UNIQUE_EMAIL_ERROR_MESSAGE);
      } else if (error === ERROR_CODE_400) {
        setRegErrorMessage(INVALID_REG_DATA_MESSAGE);
      } else {
        setRegErrorMessage(REG_ERROR_MESSAGE);
      }
      console.log(`${ERROR}: ${error}`);
    } finally {
      setIsLoading(false);
      setButtonRegister({ buttonText: BUTTON_REG_TEXT, block: false });
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await mainApi.logout();
      setIsLoggedIn(false);
      navigate('/', { replace: true });
      localStorage.clear();
    } catch (error) {
      console.log(`${ERROR}: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const currentPath = pathname;
        const [user, savedUserMovies] = await Promise.all([
          mainApi.getUserInfo(),
          mainApi.getSavedMovies(),
        ]);
        setCurrentUser(user);
        setSavedMovies(savedUserMovies);
        setIsLoggedIn(true);
        navigate(currentPath, { replace: true });
      } catch (error) {
        if (error === ERROR_CODE_401) {
          console.log(`${ERROR}: ${error} ${UNAUTHORIZED_ERROR_MESSAGE}`);
          return;
        }
        console.log(`${ERROR}: ${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isLoading
        ? <Preloader />
        : (
          <Routes>
            <Route
              path="/"
              element={<Main isLoggedIn={isLoggedIn} />}
            />
            <Route
              path={PROFILE_ENDPOINT}
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
              path={MOVIES_ENDPOINT}
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
              path={SAVED_MOVIES_ENDPOINT}
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
              path={REG_ENDPOINT}
              element={isLoggedIn
                ? <Navigate to={MOVIES_ENDPOINT} replace />
                : (
                  <Register
                    onRegister={handleRegistration}
                    requestErrorMessage={regErrorMessage}
                    buttonState={buttonRegister}
                    resetRequestError={resetMessages}
                  />
                )}
            />
            <Route
              path={AUTH_ENDPOINT}
              element={isLoggedIn
                ? <Navigate to={MOVIES_ENDPOINT} replace />
                : (
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
        )}
    </CurrentUserContext.Provider>
  );
};

export default App;
