import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useState } from 'react';

const Navigation = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <nav className="navigation">
      <button
        type="button"
        className={`navigation__burger
        ${isMenuOpened && 'navigation__burger_active'}`}
        onClick={handleOpenMenu}
      >
        <span className={`navigation__burger-line
        ${isMenuOpened && 'navigation__burger-line_active'}`}
        />
      </button>
      <nav className={`navigation__links-container
      ${isMenuOpened && 'navigation__links-container_opened'}`}
      >
        <ul className={`navigation__links
        ${isMenuOpened && 'navigation__links_opened'}`}
        >
          <li className="navigation__links-item navigation__links-item_type_main">
            <NavLink
              to="/"
              onClick={handleOpenMenu}
              className={({ isActive }) => `navigation__link
            ${isActive ? 'navigation__link_active' : ''
              }`}
            >
              Главная
            </NavLink>
          </li>
          <li className="navigation__links-item">
            <NavLink
              to="/movies"
              onClick={handleOpenMenu}
              className={({ isActive }) => `navigation__link
            ${isActive ? 'navigation__link_active' : ''
              }`}
            >
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__links-item">
            <NavLink
              to="/saved-movies"
              onClick={handleOpenMenu}
              className={({ isActive }) => `navigation__link
            ${isActive ? 'navigation__link_active' : ''}`}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className="navigation__links-item">
            <NavLink
              to="/profile"
              onClick={handleOpenMenu}
              className="navigation__link navigation__link_type_profile"
            >
              Аккаунт
              <span className="navigation__profile-icon" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </nav>
  );
};

export default Navigation;
