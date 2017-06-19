const config = {
  // Firebase config
  firebase: {
    apiKey: 'XXX',
    authDomain: 'XXX',
    databaseURL: 'XXX',
    storageBucket: 'XXX',
    messagingSenderId: 'XXX'
  },
  // MoviesDB config
  moviedb: {
    endPoint: 'http://api.themoviedb.org/3/',
    apiKey: 'XXX'
  }
};

export const getConfig = () => {
  return config;
};
