import './SectionTitle.css';

const SectionTitle = ({ title, isTechs }) => (
  <h2 className={`section-title ${isTechs ? 'section-title_type_techs' : ''}`}>{title}</h2>
);

export default SectionTitle;
