import { Link } from 'react-router-dom';
import './AuthNavigation.css';

const AuthNavigation = () => (
  <div className="auth-navigation">
    <Link className="auth-navigation__link auth-navigation__link_type_register" to="/sign-up">
      Регистрация
    </Link>
    <Link className="auth-navigation__link auth-navigation__link_type_authorization" to="/sign-in">
      Войти
    </Link>
  </div>
);

export default AuthNavigation;
