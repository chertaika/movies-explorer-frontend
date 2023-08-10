import './AboutMe.css';
import { Link } from 'react-router-dom';
import SectionTitle from '../SectionTitle/SectionTitle';
import studentPhoto from '../../assets/images/stedent-photo.jpg';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => (
  <section className="about-me" id="about-me">
    <SectionTitle title="Студент" />
    <div className="about-me__info">
      <div className="about-me__desc">
        <h3 className="about-me__title">Екатерина</h3>
        <p className="about-me__subtitle">Фронтенд-разработчик, 34 года</p>
        <p className="about-me__text">
          Мне очень близок процесс созидания и баланс творчества и точности,
          которые четко прослеживаются во фронтенд-разработке. Именно поэтому я
          пошла на курс по веб-разработке от Яндекс.Практикум. Очень хочу
          заниматься близким мне по духу делом и вносить свой вклад в улучшение
          повседневной жизни людей.
        </p>
        <p className="about-me__text">
          Я стараюсь использовать все доступные мне каналы получения информации
          для совершенствования в этой профессии. В развитии мне очень
          помогает целеустремленность и ориентированность на результат.
          Стремление к саморазвитию и наполненности не дает остановиться на
          достигнутом.
        </p>
        <ul className="about-me__links">
          <li>
            <Link
              className="about-me__link link-hover"
              to="https://github.com/chertaika"
              target="_blank"
            >
              Github
            </Link>
          </li>
          <li>
            <Link
              className="about-me__link link-hover"
              to="https://www.codewars.com/users/chertaika"
              target="_blank"
            >
              Codewars
            </Link>
          </li>
        </ul>
      </div>
      <img
        className="about-me__photo"
        src={studentPhoto}
        alt="Екатерина Юркова, веб-разработчик, фронтенд-разработчик"
      />
    </div>
    <Portfolio />
  </section>
);

export default AboutMe;
