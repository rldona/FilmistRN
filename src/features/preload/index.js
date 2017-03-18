import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import * as firebase from 'firebase';

import * as colors from '../../common/colors';
import * as moviesService from '../../services/movies-service';

import * as loginService from '../../services/login-service';
import * as settingsService from '../../services/settings-service';
import * as userService from '../../services/user-service';

import Loading from '../../common/loading';

const { width, height } = Dimensions.get('window');

import {RippleLoader} from 'react-native-indicator';

export default class Preload extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataAppLoaded: false
    };
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {

      if (user) {

        userService.setCurrentUser(user);

        firebase.database().ref('users/' + user.uid).on('child_added', (data) => {
          if (data.val() && typeof data.val() !== 'undefined' && data.val() !== '') {
            settingsService.setOption('lang', data.val().lang);
            settingsService.setOption('allowExitApp', data.val().allowExitApp);
            settingsService.setOption('avatar', data.val().avatar);
          }

          firebase.database().ref('users/' + user.uid + '/favorites').once('value', (snapshot) => {
            let arr = [];

            if (snapshot.val()) {
              moviesService.setFavorite(Object.keys(snapshot.val()), 'list');
            }

            for (let i = 0; i < moviesService.getFavorites().length; i++) {
              arr.push(parseInt(moviesService.getFavorites()[i]));
            }

            moviesService.setFavorite(arr, 'list');

            firebase.database().ref('users/' + user.uid + '/list/init').set({
              init: 'init'
            });

            firebase.database().ref('users/' + user.uid + '/search/init').set({
              init: 'init'
            });

            firebase.database().ref('users/' + user.uid + '/search/terms').once('value', (snapshot) => {
              if (snapshot.val()) {
                moviesService.setTermHistorial(snapshot.val(), 'array');
              }
            });

            firebase.database().ref('users/' + user.uid + '/list/favorite').once('value', (snapshot) => {
              if (snapshot.val()) {
                moviesService.setFavoriteList(snapshot.val(), 'favorite', 'array');
              }
            });

            firebase.database().ref('users/' + user.uid + '/list/saved').once('value', (snapshot) => {
              if (snapshot.val()) {
                moviesService.setFavoriteList(snapshot.val(), 'saved', 'array');
              }
            });

            firebase.database().ref('users/' + user.uid + '/list/viewed').once('value', (snapshot) => {
              if (snapshot.val()) {
                moviesService.setFavoriteList(snapshot.val(), 'viewed', 'array');
              }
            });

            moviesService.init();
            moviesService.getNavigator().resetTo({index: 1, title: 'home'});

          });

        });

      } else {
        moviesService.getNavigator().resetTo({index: 0, title: 'welcome'});
      }

    });

  }

  render() {
    return (
      <View
        renderToHardwareTextureAndroid={true}
        style={{elevation: 10, backgroundColor: colors.getList().primary, height: height, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{borderColor: colors.getList().primary, backgroundColor: colors.getList().primary, borderWidth: 2, padding: 20, borderRadius: 5,  alignItems: 'center'}}>
          <RippleLoader size={60} color={colors.getList().app} frequency={300} />
          <Text style={{fontSize: 16, color: colors.getList().app, fontWeight: '400', marginTop: 20}}>Configurando sesión...</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
