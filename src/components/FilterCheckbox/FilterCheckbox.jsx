import './FilterCheckbox.css';
import { useState } from 'react';

const FilterCheckbox = () => {
  const [isShortFilm, setIsShortFilm] = useState(false);

  const handleChangeToggleSwitch = () => {
    setIsShortFilm(!isShortFilm);
  };

  return (
    <label
      className="filter-checkbox button-hover"
      htmlFor="checkbox"
    >
      <input
        className="filter-checkbox__checkbox"
        type="checkbox"
        id="checkbox"
        onChange={handleChangeToggleSwitch}
      />
      <span
        className={`filter-checkbox__slider ${isShortFilm ? 'filter-checkbox__slider_active' : ''}`}
      />
      Короткометражки
    </label>
  );
};

export default FilterCheckbox;
