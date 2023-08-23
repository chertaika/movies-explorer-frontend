import './Authentication.css';
import { Link } from 'react-router-dom';
import headerLogo from '../../assets/images/logo.svg';

const Authentication = ({
  title,
  formName,
  children,
  requestErrorMessage,
  isValid,
  paragraphText,
  paragraphLink,
  paragraphButton,
  onSubmit,
  buttonState: { buttonText, block },
}) => (
  <main className="authentication">
    <div className="authentication__container">
      <Link to="/" className="authentication__main-link button-hover">
        <img className="authentication__logo" src={headerLogo} alt="логотип" />
      </Link>
      <h1 className="authentication__title">{title}</h1>
      <form className="authentication__form" name={formName} onSubmit={onSubmit}>
        {children}
        <p className="authentication__request-error">{requestErrorMessage}</p>
        <button
          className="authentication__submit-btn button-hover"
          disabled={!isValid || block}
          type="submit"
        >
          {buttonText}
        </button>
      </form>
      <p className="authentication__paragraph">
        {paragraphText}
        <Link
          className="authentication__link link-hover"
          to={paragraphLink}
        >
          {paragraphButton}
        </Link>
      </p>
    </div>
  </main>
);

export default Authentication;
