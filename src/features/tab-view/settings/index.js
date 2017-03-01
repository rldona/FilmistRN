import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  View,
  ToastAndroid,
  ScrollView,
  Image,
  Switch,
  AsyncStorage,
  StyleSheet,
  Dimensions
} from 'react-native';

import * as firebase from 'firebase';
import * as loginService from '../../../services/login-service';
import * as settingsService from '../../../services/settings-service';
import * as themoviedb from '../../../services/movies-service';
import * as colors from '../../../common/colors';

import Checkbox from '../../../common/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RadioButtons from '../../../common/radio-buttons';

const { width, height } = Dimensions.get('window');

export default class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allowExitApp: settingsService.getOptions().allowExitApp,
      radioButtons: [
        {id: 0, language: 'es', title: 'Español', state: settingsService.getOptions().lang === 'es' ? true : false},
        {id: 1, language: 'en', title: 'Inglés', state: settingsService.getOptions().lang === 'en' ? true : false},
        {id: 2, language: 'fr', title: 'Francés', state: settingsService.getOptions().lang === 'fr' ? true : false}
      ]
    };
  }

  _onActionSelected = (action) => {
    switch (action) {
      case 'left':
        themoviedb.getNavigator().pop();
        break;
      case 'right':
        break;
    }
  }

  _loggout() {
    loginService.logout().then(() => {
      // Clear states
      themoviedb.reset();
      settingsService.reset();
      // redirect to Login
      themoviedb.getNavigator().resetTo({ index: 0, route: 'login'});
    }, (error) => {
      consoe.log(error.message);
    });
  }

  render() {
    return (
      <ScrollView>

        <View style={{padding: 0}}>

          <View>
            <Text style={styles.optionTitle}>Cambia el idioma del contenido de la app</Text>
            <View style={{padding: 15}}>
              <RadioButtons options={this.state.radioButtons} />
            </View>
          </View>

          <View>
            <Text style={styles.optionTitle}>Evitar cerrar la app con el botón físico atrás</Text>
            <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
              <Checkbox
                checked={this.state.allowExitApp}
                onChange={(checked) => {
                  let user = firebase.auth().currentUser;

                  this.setState({allowExitApp: !checked});
                  settingsService.setOption('allowExitApp', !this.state.allowExitApp);

                  firebase.database().ref('users/' + user.uid + '/settings/allowExitApp').set(!this.state.allowExitApp);
                }} />
            </View>
          </View>

          <View>
            <Text style={styles.optionTitle}>Eliminar últimas búsquedas</Text>
              <TouchableOpacity
                style={{minWidth: 300}}
                activeOpacity={0.9}
                onPress={() => {
                  let user = firebase.auth().currentUser;

                  themoviedb.clearHitorialList();

                  firebase.database().ref('users/' + user.uid + '/historial').set(null);

                  ToastAndroid.show('Historial eliminado', ToastAndroid.SHORT);
                }}>
                <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: colors.getList().white, fontWeight: '400', fontSize: 14}}>Eliminar historial</Text>
                  </View>
                </View>
              </TouchableOpacity>
          </View>

          {/*<View>
            <Text style={styles.optionTitle}>Eliminar todos los favoritos</Text>
              <TouchableOpacity
                style={{minWidth: 300}}
                activeOpacity={0.9}
                onPress={() => {
                  let user = firebase.auth().currentUser;

                  themoviedb.clearFavoriteList();

                  firebase.database().ref('users/' + user.uid + '/favorites').set(null);
                  firebase.database().ref('users/' + user.uid + '/list').set(null);

                  firebase.database().ref('users/' + user.uid + '/list/init').set({
                    nulo: 'nulo'
                  });

                  ToastAndroid.show('Favoritos eliminados', ToastAndroid.SHORT);
                }}>
                <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: colors.getList().white, fontWeight: '400', fontSize: 14}}>Eliminar favoritos</Text>
                  </View>
                </View>
              </TouchableOpacity>
          </View>*/}

          <View>
            <Text style={styles.optionTitle}>Salir de Filmist</Text>
            <TouchableOpacity
              style={{minWidth: 300}}
              activeOpacity={0.9}
              onPress={this._loggout}>
              <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: colors.getList().white, fontWeight: '400', textAlign: 'left', fontSize: 14}}>Cerrar sesión</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{textAlign: 'center', color: '#CCC', paddingVertical: 40, paddingHorizontal: 20, fontSize: 14}}>Beta 7.0.0</Text>
          </View>

        </View>

      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  optionTitle: {
    padding: 15,
    color: '#FFF',
    fontSize: 15,
    backgroundColor: colors.getList().secondary,
  },
  optionText: {
    color: '#CCC',
  },
  userName: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5
  },
  userEmail: {
    color: '#999',
    fontSize: 12
  }
});
