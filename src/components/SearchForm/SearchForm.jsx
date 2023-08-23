import './SearchForm.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormValidator from '../../hooks/useFormValidator';

const SearchForm = ({ onSubmit, onChange, isShortMovie }) => {
  const { pathname } = useLocation();
  const isSavedMovies = pathname === '/saved-movies';

  const {
    inputValues, errorMessages, handleChange, isValid, setInputValues,
  } = useFormValidator();

  const handleSearch = (evt) => {
    evt.preventDefault();
    onSubmit(inputValues.search, isShortMovie);
  };

  useEffect(() => {
    if (!isSavedMovies) {
      const savedSearch = localStorage.getItem('request');
      if (savedSearch) setInputValues({ search: savedSearch });
    }
  }, []);

  return (
    <section className="search-form">
      <form className="search-form__form" name="search" onSubmit={handleSearch} noValidate>
        <div className="search-form__search-bar">
          <input
            className={`search-form__input ${errorMessages.search ? 'search-form__input_type_error' : ''}`}
            type="text"
            name="search"
            placeholder="Фильм"
            autoComplete="off"
            required
            value={inputValues.search ?? ''}
            onChange={handleChange}
          />
          <button
            className="search-form__submit-btn button-hover"
            type="submit"
            aria-label="Поиск"
            disabled={!isValid}
          />
        </div>
        <span className="search-form__error">{errorMessages.search}</span>
        <FilterCheckbox onChange={onChange} value={isShortMovie} />
      </form>
    </section>
  );
};

export default SearchForm;
