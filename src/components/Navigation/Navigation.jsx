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
      <button type="button" className="navigation__burger" onClick={handleOpenMenu}>
        <span className={`navigation__burger-line
        ${isMenuOpened && 'navigation__burger-line_active'}`}
        />
      </button>
      <div className={`navigation__links-container
      ${isMenuOpened && 'navigation__links-container_opened'}`}
      >
        <div className={`navigation__links
        ${isMenuOpened && 'navigation__links_opened'}`}
        >
          <NavLink
            to="/"
            onClick={handleOpenMenu}
            className={({ isActive }) => `navigation__link navigation__link_type_main
            ${isActive ? 'navigation__link_active' : ''
            }`}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            onClick={handleOpenMenu}
            className={({ isActive }) => `navigation__link
            ${isActive ? 'navigation__link_active' : ''
            }`}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            onClick={handleOpenMenu}
            className={({ isActive }) => `navigation__link
            ${isActive ? 'navigation__link_active' : ''}`}
          >
            Сохранённые
            фильмы
          </NavLink>
          <NavLink
            to="/profile"
            onClick={handleOpenMenu}
            className="navigation__link navigation__link_type_profile"
          >
            Аккаунт
            <span className="navigation__profile-icon" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
