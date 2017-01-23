import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Modal,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import * as themoviedb from '../../services/movies-service';
import * as colors from '../../common/colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Remember extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: 'rldona@gmail.com',
      emailRemember: 'rldona@gmail.com',
      password: '123456'
    };
  }

  _goBack() {
    themoviedb.getNavigator().pop();
  }

  _login() {
    if (this.state.email !== '' && this.state.password !== '') {
      if (this.state.email === 'rldona@gmail.com' && this.state.password === '123456') {
        themoviedb.getNavigator().push({ index: 1, title: 'home'});
      } else {
        alert('Email ó contraseña incorrectos');
      }
    } else {
      alert('Introduce tu email y contraseña');
    }
  }

  _remember() {
    // TODO: Firebase
    themoviedb.getNavigator().push({ index: 0.1, title: 'login'});
  }

  render() {
    return(

      <View style={styles.container} renderToHardwareTextureAndroid={true}>

        <Text onPress={this._goBack.bind(this)} style={styles.textBack}>
          <Icon name="arrow-back" size={30} color="#FFF" />
        </Text>

        <Text style={styles.labelRemember}>Introduce tu email para que te enviemos un formulario de cambio de contraseña</Text>

        <TextInput
          style={styles.input}
          onChangeText={(emailRemember) => this.setState({emailRemember})}
          value={this.state.emailRemember}
          placeholder="Email"
          autoFocus={true}
        />

        <TouchableOpacity onPress={this._remember.bind(this)} style={styles.button} activeOpacity={0.5}>
          <Text style={styles.buttonTextClear}>CAMBIAR LA CONTRASEÑA</Text>
        </TouchableOpacity>

      </View>

    )
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.getList().primary,
    paddingTop: 10,
    padding: 30
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },

  textBack: {
    marginTop: 24,
    paddingLeft: -5,
    marginBottom: 30,
  },

  arrowBack: {
    width: 30,
    height: 30
  },

  label: {
    textAlign: 'left',
    fontSize: 25,
    marginBottom: 30,
    color: colors.getList().white
  },

  labelRemember: {
    fontSize: 18,
    marginBottom: 30,
    color: colors.getList().white
  },

  input: {
    // height: 40,
    minWidth: 300,
    marginBottom: 25,
    fontSize: 15,
    paddingVertical: 10,
    color: colors.getList().white
  },

  button: {
    marginTop: 30,
    paddingTop: 17,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 17,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: colors.getList().app,
    backgroundColor: colors.getList().app,
    marginBottom: 20,
    minWidth: 300,
  },

  buttonClear: {
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


  buttonText: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  },

  buttonTextClear: {
    color: colors.getList().white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  }

});