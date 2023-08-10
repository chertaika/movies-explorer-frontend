import './NavTab.css';
import { HashLink as Link } from 'react-router-hash-link';

const NavTab = () => (
  <nav className="nav-tab">
    <ul className="nav-tab__links">
      <li>
        <Link
          className="nav-tab__link link-hover"
          smooth
          to="home-page#about-project"
        >
          О проекте
        </Link>
      </li>
      <li>
        <Link
          className="nav-tab__link link-hover"
          smooth
          to="home-page#techs"
        >
          Технологии
        </Link>
      </li>
      <li>
        <Link
          className="nav-tab__link link-hover"
          smooth
          to="home-page#about-me"
        >
          Студент
        </Link>
      </li>
    </ul>
  </nav>
);

export default NavTab;
