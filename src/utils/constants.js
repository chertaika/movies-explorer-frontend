// ендпоинты
const REG_ENDPOINT = '/signup';
const AUTH_ENDPOINT = '/signin';
const PROFILE_ENDPOINT = '/profile';
const MOVIES_ENDPOINT = '/movies';
const SAVED_MOVIES_ENDPOINT = '/saved-movies';
const LOGOUT_ENDPOINT = '/logout';
const USER_ENDPOINT = '/users/me';

const mainApiSettings = {
  baseUrl: 'https://api.chertaika.nomoreparties.co',
  // baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  endpoints: {
    userEndpoint: USER_ENDPOINT,
    moviesEndpoint: MOVIES_ENDPOINT,
    regEndpoint: REG_ENDPOINT,
    authEndpoint: AUTH_ENDPOINT,
    logoutEndpoint: LOGOUT_ENDPOINT,
  },
};

const moviesApiSettings = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
};

// методы запросов
const METHOD_PATCH = 'PATCH';
const METHOD_POST = 'POST';
const METHOD_DELETE = 'DELETE';

// коды ошибок запросов
const ERROR_CODE_409 = 409;
const ERROR_CODE_401 = 401;
const ERROR_CODE_400 = 400;

// регулярные выражения валидации
const EMAIL_REGEX = '^[a-zA-Z0-9+_.\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,4}$';
const NAME_REGEX = '[A-Za-zА-Яа-яЁё\\s\\-]+';

// настройки пагинации
const MOVIES_PER_PAGE_1280 = { initial: 12, step: 3 };
const MOVIES_PER_PAGE_768 = { initial: 8, step: 2 };
const MOVIES_PER_PAGE_320 = { initial: 5, step: 2 };

// настройки фильтрации
const SHORT_MOVIES_DURATION = 40;

// сообщения запросов
const SEARCH_REQUEST_ERROR_MESSAGE = 'Во время запроса произошла ошибка. Возможно,'
  + 'проблема с соединением или сервер недоступен. Подождите немного'
  + 'и попробуйте ещё раз';
const SEARCH_NOT_FOUND_MESSAGE = 'Ничего не найдено';
const NOT_UNIQUE_EMAIL_ERROR_MESSAGE = 'Пользователь с таким email уже существует.';
const INVALID_REG_DATA_MESSAGE = 'Переданы некорректные данные при регистрации';
const REG_ERROR_MESSAGE = 'При регистрации пользователя произошла ошибка.';
const INVALID_AUTH_DATA_ERROR_MESSAGE = 'Вы ввели неправильный логин или пароль.';
const AUTH_ERROR_MESSAGE = 'При авторизации пользователя произошла ошибка.';
const UPDATE_USER_ERROR_MESSAGE = 'При обновлении профиля произошла ошибка.';
const UPDATE_USER_MESSAGE = 'Данные успешно обновлены.';
const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация';

// тексты кнопок
const BUTTON_REG_TEXT = 'Зарегистрироваться';
const BUTTON_REG_BLOCKED_TEXT = 'Регистрация...';
const BUTTON_SAVE_TEXT = 'Сохранить';
const BUTTON_SAVE_BLOCKED_TEXT = 'Сохранение...';
const BUTTON_AUTH_TEXT = 'Войти';
const BUTTON_AUTH_BLOCKED_TEXT = 'Вход...';

const ERROR = 'Ошибка';

export {
  USER_ENDPOINT,
  REG_ENDPOINT,
  AUTH_ENDPOINT,
  PROFILE_ENDPOINT,
  MOVIES_ENDPOINT,
  SAVED_MOVIES_ENDPOINT,
  LOGOUT_ENDPOINT,
  MOVIES_PER_PAGE_1280,
  MOVIES_PER_PAGE_768,
  MOVIES_PER_PAGE_320,
  mainApiSettings,
  moviesApiSettings,
  METHOD_PATCH,
  METHOD_POST,
  METHOD_DELETE,
  SEARCH_REQUEST_ERROR_MESSAGE,
  SEARCH_NOT_FOUND_MESSAGE,
  SHORT_MOVIES_DURATION,
  NOT_UNIQUE_EMAIL_ERROR_MESSAGE,
  INVALID_REG_DATA_MESSAGE,
  REG_ERROR_MESSAGE,
  INVALID_AUTH_DATA_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGE,
  EMAIL_REGEX,
  NAME_REGEX,
  UPDATE_USER_ERROR_MESSAGE,
  UPDATE_USER_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  BUTTON_REG_TEXT,
  BUTTON_REG_BLOCKED_TEXT,
  BUTTON_SAVE_TEXT,
  BUTTON_SAVE_BLOCKED_TEXT,
  BUTTON_AUTH_TEXT,
  BUTTON_AUTH_BLOCKED_TEXT,
  ERROR,
  ERROR_CODE_409,
  ERROR_CODE_401,
  ERROR_CODE_400,
};
