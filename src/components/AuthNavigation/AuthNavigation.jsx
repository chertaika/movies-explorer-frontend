import { Link } from 'react-router-dom';
import './AuthNavigation.css';

const AuthNavigation = () => (
  <nav className="auth-navigation">
    <ul className="auth-navigation__links">
      <li>
        <Link
          className="
          auth-navigation__link
          auth-navigation__link_type_register
          link-hover"
          to="/signup"
        >
          Регистрация
        </Link>
      </li>
      <li>
        <Link
          className="
          auth-navigation__link
          auth-navigation__link_type_authorization
          button-hover"
          to="/signin"
        >
          Войти
        </Link>
      </li>
    </ul>

  </nav>
);

export default AuthNavigation;
