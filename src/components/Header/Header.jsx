import './Header.css';
import { Link } from 'react-router-dom';
import headerLogo from '../../assets/images/logo.svg';
import Navigation from '../Navigation/Navigation';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = ({ isLoggedIn }) => (
  <header className="header">
    <Link to="/" className="header__link">
      <img className="header__logo" src={headerLogo} alt="логотип" />
    </Link>
    {isLoggedIn ? <Navigation /> : <AuthNavigation />}
  </header>
);

export default Header;
