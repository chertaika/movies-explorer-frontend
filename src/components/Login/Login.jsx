import './Login.css';
import { useEffect } from 'react';
import Authentication from '../Authentication/Authentication';
import useFormValidator from '../../hooks/useFormValidator';
import AuthInput from '../AuthInput/AuthInput';
import { EMAIL_REGEX } from '../../utils/constants';

const Login = ({
  onLogin,
  requestErrorMessage,
  buttonState,
  resetRequestError,
}) => {
  const {
    inputValues, errorMessages, isValid, handleChange,
  } = useFormValidator();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(inputValues);
  };

  useEffect(() => {
    resetRequestError();
  }, []);

  return (
    <Authentication
      title="Рады видеть!"
      formName="sign-in"
      isValid={isValid}
      requestErrorMessage={requestErrorMessage}
      paragraphText="Ещё не зарегистрированы?"
      paragraphLink="/signup"
      paragraphButton="Регистрация"
      onSubmit={handleSubmit}
      buttonState={buttonState}
    >
      <AuthInput
        type="email"
        placeholder="E-mail"
        name="email"
        inputValue={inputValues.email}
        errorMessage={errorMessages.email}
        handleChange={handleChange}
        pattern={EMAIL_REGEX}
        autoComplete="on"
        required
      />
      <AuthInput
        type="password"
        placeholder="Пароль"
        name="password"
        inputValue={inputValues.password}
        errorMessage={errorMessages.password}
        minLength="8"
        handleChange={handleChange}
        autoComplete="on"
        required
      />
    </Authentication>
  );
};

export default Login;
