import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
  Switch,
  StyleSheet,
  Dimensions
} from 'react-native';

import * as colors from '../../../common/colors';
import * as themoviedb from '../../../services/movies-service';

import RadioButtons from '../../../common/radio-buttons';

const { width, height } = Dimensions.get('window');

export default class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      falseSwitchIsOn: false,
      radioButtons: [
        {id: 0, language: 'es', title: 'Español', state: themoviedb.getLang() === 'es' ? true : false},
        {id: 1, language: 'en', title: 'Inglés', state: themoviedb.getLang() === 'en' ? true : false},
        {id: 2, language: 'fr', title: 'Francés', state: themoviedb.getLang() === 'fr' ? true : false}
      ]
    };
  }

  _onActionSelected = (action) => {
    switch (action) {
      case 'left':
        themoviedb.getNavigator().pop();
        break;
      case 'right':
        alert('right');
        break;
    }
  }

  _loggout() {
    themoviedb.getNavigator().push({ index: 0, route: 'login'});
  }

  render() {
    return (
      <ScrollView>

        <View style={{padding: 0}}>

          <View style={{padding: 15, paddingVertical: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                resizeMode={'cover'}
                style={{width: 90, height: 90, borderRadius: 3, backfaceVisibility: 'hidden'}}
                source={{uri: 'https://lh3.googleusercontent.com/-OgIx5qWOqVc/AAAAAAAAAAI/AAAAAAAAAAA/AKB_U8tTw5-KNmVaIXZt9ZkEobMYvccN4g/s192-c-mo/photo.jpg'}} />
              <View style={{marginLeft: 20}}>
                <Text style={styles.userName}>Raúl López Doña</Text>
                <Text style={styles.userEmail}>rldona@gmail.com</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.optionTitle}>Cambia el idioma del contenido de la app</Text>
            <View style={{padding: 15}}>
              <RadioButtons options={this.state.radioButtons} />
            </View>
          </View>

          <View>
            <Text style={styles.optionTitle}>Evitar cerrar la app con el botón físico atrás</Text>
            <View style={{paddingLeft: 15, paddingRight: 10, paddingVertical: 20}}>
              <View style={styles.row}>
                <Text style={styles.optionText}>{this.state.falseSwitchIsOn ? 'Habilitado' : 'Deshabilitado'}</Text>
                <Switch
                  onTintColor="#FFF"
                  thumbTintColor="#FFF"
                  tintColor="#FFF"
                  onValueChange={(value) => {
                    this.setState({falseSwitchIsOn: value});
                    themoviedb.setAllowExitApp(value);
                  }}
                  value={this.state.falseSwitchIsOn} />
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.optionTitle}>Eliminar últimas búsquedas</Text>
            <View style={{padding: 30}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{width: width-40, padding: 15, borderRadius: 3, borderWidth: 1, backgroundColor: colors.getList().app}}
                  activeOpacity={0.9}
                  onPress={() => themoviedb.clearHitorialList()}>
                <Text style={{color: colors.getList().white, fontWeight: '600', textAlign: 'center', fontSize: 14}}>{'Eliminar historial'.toUpperCase()}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.optionTitle}>Salir de Filmist</Text>
            <View style={{padding: 30}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{width: width-40, padding: 15, borderRadius: 3, borderWidth: 1, borderColor: colors.getList().app}}
                  activeOpacity={0.9}
                  onPress={this._loggout}>
                  <Text style={{color: colors.getList().app, fontWeight: '600', textAlign: 'center', fontSize: 14}}>{'Cerrar sesión'.toUpperCase()}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <Text style={{textAlign: 'center', color: '#CCC', paddingVertical: 40, paddingHorizontal: 20, fontSize: 14}}>Version 1.0.0</Text>
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
    // paddingHorizontal: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    // marginBottom: 15
  },
  optionTitle: {
    padding: 15,
    color: '#FFF',
    fontSize: 15,
    backgroundColor: colors.getList().secondary,
    // marginBottom: 10
  },
  optionText: {
    color: '#CCC',
    // paddingLeft: 20
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
