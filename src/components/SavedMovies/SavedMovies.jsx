import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = ({ movies }) => (
  <>
    <Header />
    <main>
      <SearchForm />
      <MoviesCardList movies={movies} isSavedMovies />
    </main>
    <Footer />
  </>

);

export default Movies;
