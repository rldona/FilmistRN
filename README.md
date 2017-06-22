Filmist
=======

Andrioid app to search, sync and share movies and series.

## Screenshots

[ ToDo ]

## Run android simulator

```Terminal
git clone https://github.com/rldona/filmist.git
yarn global add react-native
yarn install
react-native install android
react-native run-android
```

## Setup

Add your Firebase configuration and API key MovieDB -> src/config.js

```JS
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
