import { SHORT_MOVIES_DURATION } from '../utils/constants';

const useMoviesFilter = () => {
  const filterShortMovies = movie => movie
    .filter(({ duration }) => duration <= SHORT_MOVIES_DURATION);

  const filterMovies = (movies, request, isShort) => {
    const searchedMovies = movies
      .filter(({
        nameRU,
        nameEN,
      }) => nameRU.toLowerCase()
        .includes(request.toLowerCase())
        || nameEN.toLowerCase()
          .includes(request.toLowerCase()));
    if (isShort) {
      return filterShortMovies(searchedMovies);
    }
    return searchedMovies;
  };

  return { filterMovies, filterShortMovies };
};

export default useMoviesFilter;
