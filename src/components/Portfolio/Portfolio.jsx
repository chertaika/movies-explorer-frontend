import './Portfolio.css';
import { Link } from 'react-router-dom';

const Portfolio = () => (
  <article className="portfolio">
    <h3 className="portfolio__title">Портфолио</h3>
    <ul className="portfolio__links">
      <li className="portfolio__links-item">
        <Link
          className="portfolio__link"
          to="https://ekipirovka70.ru/"
          target="_blank"
        >
          Адаптивный сайт сети розничных магазинов
          <span className="portfolio__link-icon" />
        </Link>
      </li>
      <li className="portfolio__links-item">
        <Link
          className="portfolio__link"
          to="https://github.com/chertaika/react-mesto-api-full-gha"
          target="_blank"
        >
          Mesto - приложение-соцсеть с фотографиями
          <span className="portfolio__link-icon" />
        </Link>
      </li>
      <li className="portfolio__links-item">
        <Link
          className="portfolio__link"
          to="https://chertaika.github.io/react-burgers-landing/"
          target="_blank"
        >
          Адаптивный лендинг бургерной
          <span className="portfolio__link-icon" />
        </Link>
      </li>
    </ul>
  </article>
);

export default Portfolio;
