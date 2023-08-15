import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';

const AboutProject = () => (
  <section className="about-project" id="about-project">
    <SectionTitle title="О проекте" />
    <div className="about-project__info">
      <div className="about-project__info-item">
        <h3 className="about-project__info-title">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="about-project__info-text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
      </div>
      <div className="about-project__info-item">
        <h3 className="about-project__info-title">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about-project__info-text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
    </div>
    <div className="about-project__time-info">
      <div className="about-project__time-interval">
        <div className="about-project__time-line">1 неделя</div>
        <span className="about-project__time-caption">Back-end</span>
      </div>
      <div className="about-project__time-interval">
        <div className="about-project__time-line about-project__time-line_type_front">4 недели</div>
        <span className="about-project__time-caption">Front-end</span>
      </div>
    </div>
  </section>
);

export default AboutProject;
