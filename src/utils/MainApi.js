import { BASE_URL } from "../constants/constants";

export const register = (name,email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name:name,
      password: password,
      email: email
    })
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  }).then((response) => {
    if (response.ok){
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`)
  });
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`,{
    method: 'POST',
    credentials: 'include'
  }).then((response) => {
    if (response.ok){
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`)
  });
}

export const addMovie = (country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      country: country,
      director: director,
      duration: duration,
      year:year,
      description:description,
      image:image,
      trailerLink:trailerLink,
      nameRU:nameRU,
      nameEN:nameEN,
      thumbnail:thumbnail,
      movieId:movieId
    })
  }).then((response) => {
    if (response.ok){
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`)
  });
}

export const removeMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    credentials:'include'
  }).then((response) => {
    if (response.ok){
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`)
  });
}

export const getUserMovies = () => {
  return fetch(`${BASE_URL}/movies`,{credentials: 'include',}).then((response) => {
    if (response.ok){
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`)
  });
}

export const patchUserData = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials:'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name:name,
      email:email
    })
  }).then((response) => {
    if (response.ok){
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`)
  });
}