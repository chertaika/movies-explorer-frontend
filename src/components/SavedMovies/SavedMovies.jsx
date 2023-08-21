import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {
  SEARCH_NOT_FOUND_MESSAGE,
  SEARCH_REQUEST_ERROR_MESSAGE,
} from '../../utils/constants';
import useMoviesFilter from '../../hooks/useMoviesFilter';

const SavedMovies = ({ isLoggedIn, savedMovies, onDeleteMovie }) => {
  const { filterMovies } = useMoviesFilter();
  const [message, setMessage] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [requestText, setRequestText] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);

  const handleDeleteMovie = ({ _id: movieId }) => {
    onDeleteMovie(movieId);
  };

  const handleCheckbox = () => {
    if (savedMovies) {
      setIsShortMovie(!isShortMovie);
    }
  };

  const handleSearchMovies = async (request, isShort) => {
    if (savedMovies) {
      setMessage('');
      setRequestText(request);
      setFilteredMovies(filterMovies(savedMovies, request, isShort));
    }
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
