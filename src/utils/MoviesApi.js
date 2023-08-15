import { moviesApiSettings } from './constants';

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  async getInitialMovies() {
    const response = await fetch(this._baseUrl, this._headers);
    return this._checkResponse(response);
  }
}

const moviesApi = new MoviesApi(moviesApiSettings);
export default moviesApi;
