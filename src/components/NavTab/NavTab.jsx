import './NavTab.css';
import { HashLink as Link } from 'react-router-hash-link';

const NavTab = () => (
  <nav className="nav-tab">
    <ul className="nav-tab__links">
      <li>
        <Link
          className="nav-tab__link link-hover"
          smooth
          to="#about-project"
        >
          О проекте
        </Link>
      </li>
      <li>
        <Link
          className="nav-tab__link link-hover"
          smooth
          to="#techs"
        >
          Технологии
        </Link>
      </li>
      <li>
        <Link
          className="nav-tab__link link-hover"
          smooth
          to="#about-me"
        >
          Студент
        </Link>
      </li>
    </ul>
  </nav>
);

export default NavTab;
