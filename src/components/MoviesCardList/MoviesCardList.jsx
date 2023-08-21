import './MoviesCardList.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MOVIES_PER_PAGE_1280,
  MOVIES_PER_PAGE_320,
  MOVIES_PER_PAGE_768,
} from '../../utils/constants';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  movies, messageText, onClick, savedMovies,
}) => {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [initialCount, setInitialCount] = useState(Number);
  const [step, setStep] = useState(Number);
  const [currentPage, setCurrentPage] = useState(0);
  const { pathname } = useLocation();
  const isSavedMovies = pathname === '/saved-movies';

  const checkWindowSize = () => {
    const currentWidth = window.innerWidth;
    if (currentWidth >= 1280) {
      setInitialCount(MOVIES_PER_PAGE_1280.initial);
      setStep(MOVIES_PER_PAGE_1280.step);
    } else if (currentWidth >= 768) {
      setInitialCount(MOVIES_PER_PAGE_768.initial);
      setStep(MOVIES_PER_PAGE_768.step);
    } else {
      setInitialCount(MOVIES_PER_PAGE_320.initial);
      setStep(MOVIES_PER_PAGE_320.step);
    }
  };

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (isSavedMovies) {
      setCurrentMovies(movies);
      return;
    }
    checkWindowSize();
    setCurrentMovies(movies.slice(0, initialCount + currentPage * step));

    window.addEventListener('resize', () => {
      checkWindowSize();
    });
  }, [initialCount, currentPage, movies]);

  useEffect(() => {
    setCurrentPage(0);
  }, [movies]);

  const handleIsSaved = (movie) => {
    if (!isSavedMovies) {
      const savedMovie = savedMovies.find(film => film.movieId === movie.id);
      return !!savedMovie;
    }
    return true;
  };

  return (
    <section
      className={`movies-card-list ${isSavedMovies ? 'movies-card-list_type_saved-movies' : ''}`}
    >
      {movies.length !== 0
        ? (
          <div className="movies-card-list__container">
            {currentMovies.map(movie => (
              <MoviesCard
                movie={movie}
                key={isSavedMovies ? movie._id : movie.id}
                isSavedMovies={isSavedMovies}
                onClick={onClick}
                isSaved={handleIsSaved(movie)}
              />
            ))}
          </div>
        )

        : (
          <p
            className="movies-card-list__title"
          >
            {messageText || 'Нужно ввести ключевое слово'}
          </p>
        )}
      {movies.length > initialCount + currentPage * step
        && !isSavedMovies
        && (
          <button
            className="movies-card-list__btn button-hover"
            type="button"
            onClick={loadMore}
          >
            Ещё
          </button>
        )}
    </section>
  );
};

export default MoviesCardList;
