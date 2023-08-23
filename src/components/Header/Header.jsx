import './Header.css';
import { Link } from 'react-router-dom';
import headerLogo from '../../assets/images/logo.svg';
import Navigation from '../Navigation/Navigation';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = ({ isLanding = false, isLoggedIn }) => (
  <header className={`header ${isLanding ? 'header_type_landing' : ''}`}>
    <div className="header__container">
      <Link to="/" className="header__link button-hover">
        <img className="header__logo" src={headerLogo} alt="логотип" />
      </Link>
      { !isLoggedIn ? <AuthNavigation /> : <Navigation />}
    </div>

  </header>
);

export default Header;
