import { AsyncStorage } from 'react-native';

import * as userService from './user-service';

const END_POINT = 'http://api.themoviedb.org/3/';
const API_KEY   = 'd29e0f4d164566ae95cfb5022b6ef0c0';

let allowExitApp;
let navigator;
let currentLang;
let currentMovie;
let currentTitle;
let currentType;
let currentCollection;

let distance;

let currentTab = {
  title: 'Inicio'
};

let historialList = [];

export const init = () => {

  // console.log('3. Init movies-service...');

  allowExitApp = true;
  currentLang = 'es';
  distance = 2;
  currentMovie = null;
  currentTitle= '-';
  currentType= 'movie';
  currentCollection= 'upcoming';
}

export const setHistorialList = (movie) => {
  if (!found(movie)) {
    historialList.unshift(movie);
  }
}

export const getHistorialList = (clear) => {
  let historialListLimited = [];
  let limit = 10;

  if (typeof clear !== 'undefined') {
    return [];
  }

  if (historialList.length > 0) {
    for (let i = 0; i < limit; i++) {
      if (typeof historialList[i] !== 'undefined') {
        historialListLimited.push(historialList[i]);
      }
    }
  }

  return historialListLimited;
}

export const getHistorialListFull = () => {
  return historialList;
}

export const clearHitorialList = () => {
  historialList = [];
  getHistorialList(true);
}

function found(movie) {
  for (let i = 0; i < historialList.length; i++) {
    if (movie.id === historialList[i].id) {
      return true
    }
  }
  return false;
}

export const setAllowExitApp = (state) => {
  allowExitApp = state;
}
export const getAllowExitApp = () => {
  return allowExitApp;
}

export const setDistance = (dis) => {
  distance = dis;
}
export const getDistance = () => {
  return distance;
}

export const setLang = (lang) => {
  currentLang = lang;
}
export const getLang = () => {
  return currentLang;
}

export const setNavigator = (navigator) => {
  currentNavigator = navigator;
}

export const getNavigator = () => {
  return currentNavigator;
}

export const setCurrentMovie = (movie) => {
  currentMovie = movie;
}

export const getCurrentMovie = () => {
  return currentMovie;
}

export const setCurrentTab = (tab) => {
  currentTab = tab;
}

export const getCurrentTab = () => {
  return currentTab;
}

export const setCurrentTitle = (title) => {
  currentTitle = title;
}

export const getCurrentTitle = () => {
  return currentTitle;
}

export const setCurrentType = (type) => {
  currentType = type;
}

export const getCurrentType = () => {
  return currentType;
}

export const setCurrentCollection = (collection) => {
  currentCollection = collection;
}

export const getCurrentCollection = () => {
  return currentCollection;
}

export const search = (query, currentPage) => {
  let page = currentPage || 1;

  let filmlistAPI = END_POINT + 'search/multi' + '?query=' + query + '&' + 'api_key=' + API_KEY + '&page=' + page + '&include_adult=false&language=' + currentLang;

  return fetch(filmlistAPI, {
      headers: {
        'Cache-Control': 'force-cache'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.results;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const getPopular = (type, collection, currentPage) => {
  let page = currentPage || 1;

  let filmlistAPI = END_POINT + type + '/' + collection + '?' + 'api_key=' + API_KEY + '&page=' + page + '&language=' + currentLang;

  return fetch(filmlistAPI, {
      headers: {
        'Cache-Control': 'force-cache'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.results;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const getSimilar = (type, id, currentPage) => {
  let page = currentPage || 1;

  let filmlistAPI = END_POINT + type + '/' + id + '/similar' + '?' + 'api_key=' + API_KEY + '&page=' + page + '&language=' + currentLang;

  return fetch(filmlistAPI, {
      headers: {
        'Cache-Control': 'force-cache'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.results;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const getMovie = (type, id) => {
  let filmlistAPI = END_POINT + type + '/' + id + '?' + 'api_key=' + API_KEY + '&language=' + currentLang;

  return fetch(filmlistAPI, {
      headers: {
        'Cache-Control': 'force-cache'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const getCredits = (type, id) => {
  if (typeof type === 'undefined') {
    type = 'movie';
  }

  let filmlistAPI = END_POINT + type + '/' + id + '/credits?' + 'api_key=' + API_KEY + '&language=' + currentLang;

  return fetch(filmlistAPI, {
      headers: {
        'Cache-Control': 'force-cache'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const getAllPopular = () => {
  var urls = [
    END_POINT + 'movie' + '/' + 'now_playing' + '?' + 'api_key=' + API_KEY + '&page=' + '&language=' + currentLang,
    END_POINT + 'movie' + '/' + 'upcoming'    + '?' + 'api_key=' + API_KEY + '&page=' + '&language=' + currentLang,
    END_POINT + 'movie' + '/' + 'popular'     + '?' + 'api_key=' + API_KEY + '&page=' + '&language=' + currentLang,
    END_POINT + 'movie' + '/' + 'top_rated'   + '?' + 'api_key=' + API_KEY + '&page=' + '&language=' + currentLang
  ];

  return Promise.all(
    urls.map(url => fetch(url, {
        headers: {
          'Cache-Control': 'force-cache'
          }
        })
        .then(response => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.error(error)))
  );
}
