import './Register.css';
import Authentication from '../Authentication/Authentication';
import AuthInput from '../AuthInput/AuthInput';
import useFormValidator from '../../hooks/useFormValidator';

const Register = ({ onRegister, requestErrorMessage, buttonState }) => {
  const {
    inputValues, errorMessages, isValid, handleChange,
  } = useFormValidator();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(inputValues);
  };

  return (
    <Authentication
      title="Добро пожаловать!"
      formName="sign-up"
      isValid={isValid}
      requestErrorMessage={requestErrorMessage}
      paragraphText="Уже зарегистрированы?"
      paragraphLink="/signin"
      paragraphButton="Войти"
      onSubmit={handleSubmit}
      buttonState={buttonState}
    >
      <AuthInput
        type="text"
        placeholder="Имя"
        name="name"
        minLength="2"
        maxLength="30"
        inputValue={inputValues.name}
        errorMessage={errorMessages.name}
        handleChange={handleChange}
        required
      />
      <AuthInput
        type="email"
        placeholder="E-mail"
        name="email"
        inputValue={inputValues.email}
        errorMessage={errorMessages.email}
        handleChange={handleChange}
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
        required
      />
    </Authentication>
  );
};

export default Register;
