import './Profile.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import useFormValidator from '../../hooks/useFormValidator';

const Profile = ({ onLogout }) => {
  const [isEditProfile, setIsEditProfile] = useState(false);

  const {
    inputValues,
    errorMessages,
    isValid,
    handleChange,
    setInputValues,
  } = useFormValidator();

  const handleClickEditProfile = (evt) => {
    evt.preventDefault();
    setIsEditProfile(!isEditProfile);
  };

  useEffect(() => {
    setInputValues({ name: 'Екатерина', email: 'test@test.ru' });
  }, []);

  return (
    <>
      <Header />
      <main className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, Екатерина!</h1>
          <form className="profile__form" name="profile">
            <label className="profile__field">
              <span className="profile__label">Имя</span>
              <input
                className={`profile__input ${isEditProfile ? 'profile__input_active' : ''} ${errorMessages.name ? 'profile__input_active-error' : ''}`}
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
              />
              <span
                className="profile__error"
              >
                {errorMessages.email}
              </span>
            </label>
            {isEditProfile
            && (
              <>
                <p className="profile__request-error">
                  При обновлении профиля произошла ошибка.
                </p>
                <button
                  className="profile__submit-btn button-hover"
                  type="submit"
                  disabled={!isValid}
                >
                  Сохранить
                </button>
              </>
            )}
            {!isEditProfile
            && (
            <>
              <button
                className="profile__edit-btn button-hover"
                type="button"
                onClick={handleClickEditProfile}
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
