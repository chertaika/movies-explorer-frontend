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

  editUserInfo({ name, email }) {
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
      body: JSON.stringify(movie),
    });
  }

  deleteSavedMovie(MovieId) {
    return this._request(`${this._moviesEndpoint}/${MovieId}`, {
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
