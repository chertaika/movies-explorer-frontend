import './Register.css';
import Authentication from '../Authentication/Authentication';
import AuthInput from '../AuthInput/AuthInput';
import useFormValidator from '../../hooks/useFormValidator';

const Register = ({ requestErrorText }) => {
  const {
    inputValues, errorMessages, isValid, handleChange,
  } = useFormValidator();

  return (
    <Authentication
      title="Добро пожаловать!"
      formName="sign-up"
      buttonText="Зарегистрироваться"
      isValid={isValid}
      requestErrorText={requestErrorText}
      paragraphText="Уже зарегистрированы?"
      paragraphLink="/sign-in"
      paragraphButton="Войти"
    >
      <AuthInput
        type="text"
        placeholder="Имя"
        label
        name="name"
        minLength="2"
        maxLength="30"
        inputValue={inputValues.name}
        errorMessage={errorMessages.name}
        placeInput="auth"
        handleChange={handleChange}
        required
      />
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

export default Register;
