import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import * as moviesService from '../../services/movies-service';
import * as colors from '../../common/colors';

const { width, height } = Dimensions.get('window');

export default class Welcome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showWelcome: false
    };
  }

  _goTo(route) {
    if (route === 'login') {
      moviesService.getNavigator().push({index: 0.1, title: 'login'});
    } else {
      moviesService.getNavigator().push({index: 0.2, title: 'register'});
    }
  }

  render() {

    return (
      <View style={styles.container} renderToHardwareTextureAndroid={true}>

        <View style={{height: height, width: width}}>
          <Image source={require('../../assets/img/bg-welcome.png')} style={styles.bg} />
        </View>

        <View style={{position: 'absolute', top: height/2-180, left: width/2-150, width: 300}}>
          <Image source={require('../../assets/img/logo.png')} style={styles.logo} />

          <Text style={styles.welcome1}>
            Bienvenido a Filmist
          </Text>

          <Text style={styles.welcome2}>
            Busca, sincroniza y comparte tus películas y series favoritas
          </Text>

          <TouchableOpacity
            onPress={this._goTo.bind(this, 'login')}
            style={styles.buttonDark}
            activeOpacity={0.9}>
            <Text style={styles.textLight}>
              INICIAR SESIÓN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this._goTo.bind(this, 'register')}
            style={styles.button}
            activeOpacity={0.9}>
            <Text style={styles.text}>
              REGÍSTRATE
            </Text>
          </TouchableOpacity>
        </View>




      </View>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.getList().primary,
    height: height,
    width: width
    // padding: 30
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: -10
  },
  welcome1: {
    color: colors.getList().white,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 15
  },
  welcome2: {
    color: colors.getList().white,
    textAlign: 'left',
    fontSize: 18,
    width: 300,
    marginBottom: 30
  },
  button: {
    paddingTop: 17,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 17,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: colors.getList().app,
    backgroundColor: colors.getList().transparent,
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
