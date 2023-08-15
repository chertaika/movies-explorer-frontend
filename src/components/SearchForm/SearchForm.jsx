import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => (
  <section className="search-form">
    <form className="search-form__form" name="search">
      <div className="search-form__search-bar">
        <input
          className="search-form__input"
          type="text"
          name="search"
          placeholder="Фильм"
          autoComplete="off"
          required
        />
        <button
          className="search-form__submit-btn button-hover"
          type="submit"
          aria-label="Поиск"
        />
      </div>
      <FilterCheckbox />
    </form>
  </section>
);

export default SearchForm;
