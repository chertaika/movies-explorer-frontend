import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {
  SEARCH_NOT_FOUND_MESSAGE,
  SEARCH_REQUEST_ERROR_MESSAGE,
  SHORT_MOVIES_DURATION,
} from '../../utils/constants';

const SavedMovies = ({ isLoggedIn, savedMovies, onDeleteMovie }) => {
  const [message, setMessage] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [requestText, setRequestText] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);

  const handleDeleteMovie = ({ _id: movieId }) => {
    onDeleteMovie(movieId);
  };

  const handleCheckbox = () => {
    setIsShortMovie(!isShortMovie);
  };

  const filterShortMovies = movie => movie
    .filter(({ duration }) => duration <= SHORT_MOVIES_DURATION);

  const filterMovies = (movies, request, isShort) => {
    const searchedMovies = movies
      .filter(({ nameRU }) => nameRU.toLowerCase().includes(request.toLowerCase()));
    if (isShort) {
      return filterShortMovies(searchedMovies);
    }
    return searchedMovies;
  };

  const handleSearchMovies = async (request, isShort) => {
    setMessage('');
    setRequestText(request);
    setFilteredMovies(filterMovies(savedMovies, request, isShort));
  };

  useEffect(() => {
    if (savedMovies) {
      const filteredFilms = filterMovies(savedMovies, requestText, isShortMovie);
      if (filteredFilms.length === 0) {
        setMessage(SEARCH_NOT_FOUND_MESSAGE);
      }
      setFilteredMovies(filteredFilms);
      return;
    }
    setMessage(SEARCH_REQUEST_ERROR_MESSAGE);
  }, [isShortMovie, requestText, savedMovies]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm
          onSubmit={handleSearchMovies}
          onChange={handleCheckbox}
          isShortMovie={isShortMovie}
        />
        <MoviesCardList movies={filteredMovies} messageText={message} onClick={handleDeleteMovie} />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
