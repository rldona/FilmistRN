import * as firebase from 'firebase';
import * as userService from './user-service';
import * as themoviedb from './movies-service';

import * as config from '../config.js';

export const init = () => {
  firebase.initializeApp(config.getConfig().firebase);
}

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email,password);
}

export const register = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export const retrievePassword = (email) => {
  return firebase.auth().sendPasswordResetEmail(email);
}

export const logout = (user) => {
  return firebase.auth().signOut();
}
