const config = {
  // Firebase config
  firebase: {
    apiKey: "[ Replace the code provided by Firebase ]",
    authDomain: "[ Replace the code provided by Firebase ]",
    databaseURL: "[ Replace the code provided by Firebase ]",
    storageBucket: "[ Replace the code provided by Firebase ]",
    messagingSenderId: "[ Replace the code provided by Firebase ]"
  },
  // MoviesDB config
  moviedb: {
    endPoint: 'http://api.themoviedb.org/3/',
    apiKey: '[ Replace the code provided by MovieDB ]'
  }
};

export const getConfig = () => {
  return config;
};
