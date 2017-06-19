const config = {
  // Firebase config
  firebase: {
    apiKey: "AIzaSyDIe9_h-URUmCp4pp464W6yayC6SifNd-4",
    authDomain: "filmist-react-native.firebaseapp.com",
    databaseURL: "https://filmist-react-native.firebaseio.com",
    storageBucket: "filmist-react-native.appspot.com",
    messagingSenderId: "489986447626"
  },
  // MoviesDB config
  moviedb: {
    endPoint: 'http://api.themoviedb.org/3/',
    apiKey: 'd29e0f4d164566ae95cfb5022b6ef0c0'
  }
};

export const getConfig = () => {
  return config;
};
