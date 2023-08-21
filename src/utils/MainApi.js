import {
  mainApiSettings,
  METHOD_DELETE,
  METHOD_PATCH,
  METHOD_POST,
} from './constants';

class MainApi {
  constructor({
    baseUrl,
    headers,
    endpoints: {
      userEndpoint,
      moviesEndpoint,
      regEndpoint,
      authEndpoint,
      logoutEndpoint,
    },
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._userEndpoint = userEndpoint;
    this._moviesEndpoint = moviesEndpoint;
    this._regEndpoint = regEndpoint;
    this._authEndpoint = authEndpoint;
    this._logoutEndpoint = logoutEndpoint;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  async _request(endpoint, options) {
    const response = await fetch(`${this._baseUrl}${endpoint}`, { headers: this._headers, ...options });
    return this._checkResponse(response);
  }

  getUserInfo() {
    return this._request(this._userEndpoint, { credentials: 'include' });
  }

  updateUserInfo({ name, email }) {
    return this._request(this._userEndpoint, {
      method: METHOD_PATCH,
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
      }),
    });
  }

  getSavedMovies() {
    return this._request(this._moviesEndpoint, { credentials: 'include' });
  }

  saveMovie(movie) {
    return this._request(this._moviesEndpoint, {
      method: METHOD_POST,
      credentials: 'include',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      }),
    });
  }

  deleteSavedMovie(movieId) {
    return this._request(`${this._moviesEndpoint}/${movieId}`, {
      method: METHOD_DELETE,
      credentials: 'include',
    });
  }

  registration({ email, password, name }) {
    return this._request(this._regEndpoint, {
      method: METHOD_POST,
      body: JSON.stringify({
        password,
        email,
        name,
      }),
    });
  }

  authorization({ email, password }) {
    return this._request(this._authEndpoint, {
      method: METHOD_POST,
      credentials: 'include',
      body: JSON.stringify({ password, email }),
    });
  }

  logout() {
    return this._request(this._logoutEndpoint, {
      method: METHOD_POST,
      credentials: 'include',
    });
  }
}

const mainApi = new MainApi(mainApiSettings);
export default mainApi;
