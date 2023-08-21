import './Movies.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import {
  SEARCH_NOT_FOUND_MESSAGE,
  SEARCH_REQUEST_ERROR_MESSAGE,
} from '../../utils/constants';
import useMoviesFilter from '../../hooks/useMoviesFilter';

const Movies = ({
  isLoggedIn,
  onDeleteMovie,
  onSaveMovies,
  savedMovies,
}) => {
  const { filterMovies, filterShortMovies } = useMoviesFilter();
  const savedCheckbox = JSON.parse(localStorage.getItem('isShortMovie')) ?? false;
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShortMovie, setIsShortMovie] = useState(savedCheckbox);

  const handleClickMovie = (movie) => {
    const savedMovie = savedMovies.find(savedFilm => savedFilm.movieId === movie.id);
    if (savedMovie) {
      onDeleteMovie(savedMovie._id);
      return;
    }
    onSaveMovies(movie);
  };

  const handleCheckbox = () => {
    setIsShortMovie(!isShortMovie);
    localStorage.setItem('isShortMovie', JSON.stringify(!isShortMovie));
  };

  const handleFilterMovies = (movies, request, isShort) => {
    const filteredFilms = filterMovies(movies, request);
    localStorage.setItem('filteredMovies', JSON.stringify(filteredFilms));
    if (!filteredFilms.length) {
      setMessage(SEARCH_NOT_FOUND_MESSAGE);
    }
    setFilteredMovies(isShort
      ? filterShortMovies(filteredFilms)
      : filteredFilms);
  };

  const handleSearchMovies = async (request, isShort) => {
    setIsLoading(true);
    setMessage('');
    if (!allMovies.length) {
      try {
        const initialMovies = await moviesApi.getInitialMovies();
        setAllMovies(initialMovies);
        handleFilterMovies(initialMovies, request, isShort);
      } catch (error) {
        setMessage(SEARCH_REQUEST_ERROR_MESSAGE);
        console.log(`Ошибка: ${error}`);
        setIsLoading(false);
      }
    } else {
      handleFilterMovies(allMovies, request, isShort);
    }
    localStorage.setItem('request', request);
    localStorage.setItem('isShortMovie', isShort);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const defaultMovies = JSON.parse(localStorage.getItem('filteredMovies'));
    if (defaultMovies) {
      if (defaultMovies.length !== 0) {
        setIsShortMovie(JSON.parse(localStorage.getItem('isShortMovie')));
        setFilteredMovies(isShortMovie
          ? filterShortMovies(defaultMovies)
          : defaultMovies);
      } else {
        setMessage(SEARCH_NOT_FOUND_MESSAGE);
      }
    }
    setIsLoading(false);
  }, [isShortMovie]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm
          onSubmit={handleSearchMovies}
          onChange={handleCheckbox}
          isShortMovie={isShortMovie}
        />
        {isLoading
          ? <Preloader />
          : (
            <MoviesCardList
              movies={filteredMovies}
              messageText={message}
              onClick={handleClickMovie}
              savedMovies={savedMovies}
            />
          )}
      </main>
      <Footer />
    </>

  );
};

export default Movies;
