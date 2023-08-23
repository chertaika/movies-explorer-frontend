import './FilterCheckbox.css';

const FilterCheckbox = ({ onChange, value }) => (
  <label
    className="filter-checkbox button-hover"
    htmlFor="checkbox"
  >
    <input
      className="filter-checkbox__checkbox"
      type="checkbox"
      name="checkbox"
      id="checkbox"
      onChange={onChange}
      checked={value}
    />
    <span
      className="filter-checkbox__slider"
    />
    Короткометражки
  </label>
);

export default FilterCheckbox;
