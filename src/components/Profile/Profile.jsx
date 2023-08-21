import './Profile.css';
import { useContext, useEffect } from 'react';
import Header from '../Header/Header';
import useFormValidator from '../../hooks/useFormValidator';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { EMAIL_REGEX, NAME_REGEX } from '../../utils/constants';

const Profile = ({
  onLogout,
  isLoggedIn,
  onEdit,
  onSubmit,
  buttonState: { buttonText, block },
  isEditProfile,
  requestStatus: { message, isSuccess },
  resetRequestMessage,
}) => {
  const { name, email } = useContext(CurrentUserContext);

  const {
    inputValues,
    errorMessages,
    isValid,
    handleChange,
    setInputValues,
    setIsValid,
  } = useFormValidator();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(inputValues);
  };

  useEffect(() => {
    setInputValues({ name, email });
    onEdit(false);
  }, [name, email]);

  useEffect(() => {
    resetRequestMessage();
  }, []);

  useEffect(() => {
    if (inputValues.name === name && inputValues.email === email) {
      setIsValid(false);
    }
  }, [inputValues]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="profile">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${name}!`}</h1>
          <form className="profile__form" name="profile" onSubmit={handleSubmit}>
            <label className="profile__field">
              <span className="profile__label">Имя</span>
              <input
                className={`profile__input ${isEditProfile ? 'profile__input_active' : ''}`}
                type="text"
                placeholder="Имя"
                name="name"
                minLength="2"
                maxLength="30"
                required
                onChange={handleChange}
                value={inputValues.name ?? ''}
                autoComplete="off"
                disabled={!isEditProfile && true}
                pattern={NAME_REGEX}
              />
              <span
                className="profile__error"
              >
                {errorMessages.name}
              </span>
            </label>
            <label className="profile__field">
              <span className="profile__label">E-mail</span>
              <input
                className={`profile__input ${isEditProfile ? 'profile__input_active' : ''} ${errorMessages.email ? 'profile__input_active-error' : ''}`}
                type="email"
                placeholder="E-mail"
                name="email"
                required
                onChange={handleChange}
                value={inputValues.email ?? ''}
                autoComplete="off"
                disabled={!isEditProfile && true}
                pattern={EMAIL_REGEX}
              />
              <span
                className="profile__error"
              >
                {errorMessages.email}
              </span>
            </label>

            <p className={`profile__request-message ${!isSuccess ? 'profile__request-message_type_error' : ''}`}>
              {message}
            </p>
            {isEditProfile
                  && (
                  <button
                    className="profile__submit-btn button-hover"
                    type="submit"
                    disabled={!isValid || block}
                  >
                    {buttonText}
                  </button>
                  )}
            {!isEditProfile
            && (
            <>
              <button
                className="profile__edit-btn button-hover"
                type="button"
                onClick={() => onEdit(true)}
              >
                Редактировать
              </button>
              <button className="profile__logout button-hover" type="button" onClick={onLogout}>Выйти из аккаунта</button>
            </>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default Profile;
