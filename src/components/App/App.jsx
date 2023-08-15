import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { testMovies } from '../../utils/constants';
import PageNotFound from '../PageNotFound/PageNotFound';

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
      path="/movies"
      element={<Movies movies={testMovies} />}
    />
    <Route
      path="/saved-movies"
      element={<SavedMovies movies={testMovies} />}
    />
    <Route
      path="/signup"
      element={<Register requestErrorText="Что-то пошло не так..." />}
    />
    <Route
      path="/signin"
      element={<Login />}
    />
    <Route
      path="*"
      element={<PageNotFound />}
    />
  </Routes>

);

export default App;
