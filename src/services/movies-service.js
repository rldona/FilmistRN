import * as settingsService from './settings-service';

const END_POINT = 'http://api.themoviedb.org/3/';
const API_KEY   = 'd29e0f4d164566ae95cfb5022b6ef0c0';

let options = {
  lang: 'es'
};

let navigator;

let currentIndex = [];
let currentMovie;
let currentTitle;
let currentType;
let currentCollection;

let currentTab = {
  title: 'Inicio'
};

let favorites = [];
let historialList = [];

let termHistorial = [];

export let list = {
  favorite: [],
  saved: [],
  viewed: []
};

export const init = () => {
  options.lang = settingsService.getOptions().lang;
  currentMovie = null;
  currentType= 'movie';
  currentCollection= 'upcoming';
}

export const reset = () => {
  options = {
    lang: 'es'
  };

  navigator = null;

  currentMovie = null;
  currentTitle = null;
  currentType = null;
  currentCollection = null;

  currentTab = {
    title: 'Inicio'
  };

  favorites     = [];
  historialList = [];
  termHistorial = [];

  list = {
    favorite: [],
    saved: [],
    viewed: []
  };
}

export const setOptions = (option, value) => {
  options[option] = value;
}

export const setHistorialList = (movie, type) => {
  if (type === 'array') {
    historialList = movie;
    return true;
  }

  if (!found(movie)) {
    historialList.unshift(movie);
  }
}

export const getHistorialList = () => {
  return historialList;
}

export const getHistorialListFull = () => {
  return historialList;
}

export const clearHitorialList = () => {
  historialList = [];
}

export const setTermHistorial = (obj, type) => {
  if (type === 'array') {
    termHistorial = obj;
  } else {
    if (!findTerm(obj)) {
      termHistorial.unshift(obj);
    }
  }
}

export const getTermHistorial = () => {
  return termHistorial;
}

export const removeTermHistorial = (id) => {
  for (let i = 0; i < termHistorial.length; i++) {
    if (termHistorial[i].id === id) {
      termHistorial.splice(i, 1);
    }
  }
}

export const clearTermHistorial = () => {
  termHistorial = [];
}

export const removeLastTerm = () => {
  termHistorial.splice(0, 1);
}

function found(movie) {
  for (let i = 0; i < historialList.length; i++) {
    if (movie.id === historialList[i].id) {
      return true
    }
  }
  return false;
}

function findTerm(obj) {
  for (let i = 0; i < termHistorial.length; i++) {
    if (obj.term === termHistorial[i].term) {
      return true
    }
  }
  return false;
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

export const setCurrentIndex = (index) => {
  currentIndex.push(index);
}

export const getCurrentIndex = () => {
  return currentIndex;
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



export const setFavoriteList = (movie, type, option) => {
  if (option === 'array') {
    list[type] = movie;
  } else {
    list[type].push(movie);
  }
}

export const getFavoriteList = (type) => {
  return list[type];
}

export const removeFavoriteList = (movie, type) => {
  for (let i = 0; i < list[type].length; i++) {
    if (list[type][i].id === movie.id) {
      list[type].splice(i, 1);
    }
  }
}

export const clearFavoriteList = () => {
  list = {
    favorite: [],
    saved: [],
    viewed: []
  };
}

export const setFavorite = (data, type) => {
  if (type === 'list') {
    favorites = data;
  } else {
    favorites.unshift(data);
  }
}

export const getFavorites = () => {
  return favorites;
}

export const findFavorite = (id) => {
  return favorites.indexOf(id);
}

export const setCurrentCollection = (collection) => {
  currentCollection = collection;
}

export const getCurrentCollection = () => {
  return currentCollection;
}

export const search = (query, currentPage) => {
  let page = currentPage || 1;

  let filmlistAPI = END_POINT + 'search/multi' + '?query=' + query + '&' + 'api_key=' + API_KEY + '&page=' + page + '&include_adult=false&language=' + options.lang;

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

  let filmlistAPI = END_POINT + type + '/' + collection + '?' + 'api_key=' + API_KEY + '&page=' + page + '&language=' + options.lang;

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

  let filmlistAPI = END_POINT + type + '/' + id + '/similar' + '?' + 'api_key=' + API_KEY + '&page=' + page + '&language=' + options.lang;

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
  let filmlistAPI = END_POINT + type + '/' + id + '?' + 'api_key=' + API_KEY + '&language=' + options.lang;

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

  let filmlistAPI = END_POINT + type + '/' + id + '/credits?' + 'api_key=' + API_KEY + '&language=' + options.lang;

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
    END_POINT + 'movie' + '/' + 'now_playing' + '?' + 'api_key=' + API_KEY + '&page=' + '&language=' + options.lang,
    END_POINT + 'movie' + '/' + 'upcoming'    + '?' + 'api_key=' + API_KEY + '&page=' + '&language=' + options.lang,
    END_POINT + 'movie' + '/' + 'popular'     + '?' + 'api_key=' + API_KEY + '&page=' + '&language=' + options.lang,
    END_POINT + 'movie' + '/' + 'top_rated'   + '?' + 'api_key=' + API_KEY + '&page=' + '&language=' + options.lang
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
