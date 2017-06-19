Filmist
=======

Andrioid app to search, sync and share movies and series.

## Screenshots

## Setup

```JS
// ./src/config.js

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
```

## Run android simulator

```Terminal
yarn global add react-native
react-native install android
react-native run-android
```