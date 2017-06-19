const config = {
  // Firebase config
  firebase: {
    apiKey: 'apiKey',
    authDomain: 'authDomain',
    databaseURL: 'databaseURL',
    storageBucket: 'storageBucket',
    messagingSenderId: 'messagingSenderId'
  },
  // MoviesDB config
  moviedb: {
    endPoint: 'http://api.themoviedb.org/3/',
    apiKey: 'API_KEY'
  }
};

export const getConfig = () => {
  return config;
};
