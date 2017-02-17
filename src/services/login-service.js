import * as firebase from 'firebase';
import * as userService from './user-service';
import * as themoviedb from './movies-service';

let currentUser;

export const init = () => {
  const config = {
    apiKey: "AIzaSyDIe9_h-URUmCp4pp464W6yayC6SifNd-4",
    authDomain: "filmist-react-native.firebaseapp.com",
    databaseURL: "https://filmist-react-native.firebaseio.com",
    storageBucket: "filmist-react-native.appspot.com",
    messagingSenderId: "489986447626"
  };

  firebase.initializeApp(config);
}

export const login = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email,password)
    .then((user) => {
      currentUser = user;

      userService.setCurrentUser(user);

      userService.init();

      themoviedb.getNavigator().push({index: 1, title: 'home'});
    }).catch((error) => {
      alert(error.message);
    });
}

export const register = (name, email, password) => {

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      user.updateProfile({
        displayName: name,
        photoURL: ''
      }).then((user) => {
        currentUser = user;

        userService.setCurrentUser(user);

        themoviedb.getNavigator().resetTo({index: 1, title: 'home'});
      }, (error) => {
        alert(error);
      });
    }).catch(function(error) {
      alert(error.message);
    });

}

export const retrievePassword = (email) => {
  const auth  = firebase.auth();

  auth.sendPasswordResetEmail(email)
    .then(function() {
      themoviedb.getNavigator().replace({ index: 0.1, title: 'login'});
    }, function(error) {
      alert(error.message);
    });
}

export const logout = (user) => {
  firebase.auth().signOut().then(function() {
    themoviedb.getNavigator().resetTo({ index: 0, route: 'login'});
  }, function(error) {
    alert(error.message);
  });
}

export const setCurrentUser = (user) => {
  currentUser = user;
}

export const getCurrentUser = () => {
  return currentUser;
}

export const getUser = () => {
  return firebase.auth().currentUser;
}
