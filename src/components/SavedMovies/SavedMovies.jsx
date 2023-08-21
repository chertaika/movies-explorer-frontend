import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { NO_SAVED_FOUND, SEARCH_NOT_FOUND } from '../../utils/constants';

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

  const filterShortMovies = movie => movie.filter(({ duration }) => duration <= 40);

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
    const filteredFilms = filterMovies(savedMovies, requestText, isShortMovie);
    if (filteredFilms.length === 0) {
      setMessage(SEARCH_NOT_FOUND);
    }
    setFilteredMovies(filteredFilms);
  }, [isShortMovie, requestText, savedMovies]);

  useEffect(() => {
    if (savedMovies.length === 0) setMessage(NO_SAVED_FOUND);
    setFilteredMovies(savedMovies);
  }, []);

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
