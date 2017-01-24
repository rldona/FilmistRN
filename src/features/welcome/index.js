import React, { Component } from 'react';

import {
  StatusBar,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import * as themoviedb from '../../services/movies-service';
import * as colors from '../../common/colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

const primaryColor = '#e2e2e2'; // backgroundColor={primaryColor}

export default class Welcome extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    primaryColor = '#e2e2e2';
  }

  _goTo(route) {
    if (route === 'login') {
      themoviedb.getNavigator().push({index: 0.1, title: 'login'});
    } else {
      themoviedb.getNavigator().push({index: 0.2, title: 'register'});
    }
  }

  render() {
    return(

      <View style={styles.container} renderToHardwareTextureAndroid={true}>

        <Image source={require('../../assets/img/logo.png')} style={styles.logo}/>

        <Text style={styles.welcome1}>
          Bienvenido a Filmist
        </Text>

        <Text style={styles.welcome2}>
          Busca, sincroniza y comparte tus películas y series favoritas
        </Text>

        <TouchableOpacity
          onPress={this._goTo.bind(this, 'register')}
          style={styles.buttonDark}
          activeOpacity={0.9}>
          <Text style={styles.textLight}>
            REGÍSTRATE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this._goTo.bind(this, 'login')}
          style={styles.button}
          activeOpacity={0.9}>
          <Text style={styles.text}>
            INICIAR SESIÓN
          </Text>
        </TouchableOpacity>

      </View>

    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.getList().primary,
    padding: 30
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20
  },
  welcome1: {
    color: colors.getList().white,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 5
  },
  welcome2: {
    color: colors.getList().white,
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 40
  },
  button: {
    paddingTop: 17,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 17,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: colors.getList().app,
    backgroundColor: colors.getList().primary,
    marginBottom: 20,
    minWidth: 300
  },
  buttonDark: {
    paddingTop: 17,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 17,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: colors.getList().app,
    backgroundColor: colors.getList().app,
    marginBottom: 15,
    minWidth: 300
  },
  text: {
    color: colors.getList().app,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  },
  textLight: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  }
});