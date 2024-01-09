class MoviesApi {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._url = this._baseUrl;
      this._credentials = options.credentials;
      this._headers = options.headers;

      this._request = this._request.bind(this);
    }
  
    getInitialCards() {
      return this._request('', {});
    }
  
   
    _request(url, settings) {
      settings.headers = this._headers;
      settings.credentials = this._credentials;
      return fetch(this._baseUrl + url, settings);
    }
  }
  
  const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export default moviesApi;
  