import './Login.css';
import Authentication from '../Authentication/Authentication';
import useFormValidator from '../../hooks/useFormValidator';
import AuthInput from '../AuthInput/AuthInput';

const Login = ({ requestErrorText }) => {
  const {
    inputValues, errorMessages, isValid, handleChange,
  } = useFormValidator();

  return (
    <Authentication
      title="Рады видеть!"
      formName="sign-in"
      buttonText="Войти"
      isValid={isValid}
      requestErrorText={requestErrorText}
      paragraphText="Ещё не зарегистрированы?"
      paragraphLink="/signup"
      paragraphButton="Регистрация"
    >
      <AuthInput
        type="email"
        placeholder="E-mail"
        label
        name="email"
        inputValue={inputValues.email}
        errorMessage={errorMessages.email}
        placeInput="auth"
        handleChange={handleChange}
        required
      />
      <AuthInput
        type="password"
        placeholder="Пароль"
        label
        name="password"
        inputValue={inputValues.password}
        errorMessage={errorMessages.password}
        placeInput="auth"
        handleChange={handleChange}
        required
      />
    </Authentication>
  );
};

export default Login;
