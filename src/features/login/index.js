import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Keyboard
} from 'react-native';

import * as themoviedb from '../../services/movies-service';
import * as colors from '../../common/colors';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../../common/loading';

const { width, height } = Dimensions.get('window');

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      login: '',
      keyboardTransition: 0,
      heightCompAdd: 0
    }
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = (e) => {
    this.setState({keyboardTransition: e.endCoordinates.height});
  }

  _keyboardDidHide = () => {
    this.setState({keyboardTransition: 0});
  }

  _login() {
    themoviedb.getNavigator().push({ index: 1, title: 'home'});
  }

  signInGoogle = () => {

  }

  render() {
    return (

      <View style={styles.container} renderToHardwareTextureAndroid={true}>

        <View style={{marginBottom: this.state.keyboardTransition, backgroundColor: colors.getList().primary}}>

          <Text style={styles.label}>Inicia sesión en Filmist</Text>

          <TextInput
            style={styles.input}
            underlineColorAndroid='#FFF'
            placeholderTextColor='#666'
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            placeholder="Email"
            autoFocus={false}
            onSubmitEditing={(event) => {
              this.refs.inputPassword.focus();
            }}
          />

          <TextInput
            ref='inputPassword'
            style={styles.input}
            underlineColorAndroid='#FFF'
            placeholderTextColor='#666'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            placeholder="Contraseña"
            returnKeyType="next"
            secureTextEntry={true}
          />

          <TouchableOpacity onPress={this._login.bind(this)} style={styles.button} activeOpacity={0.9}>
            <Text style={styles.buttonText}>INICIA SESIÓN</Text>
          </TouchableOpacity>

          {/*<TouchableOpacity style={styles.buttonGoogle} activeOpacity={0.9}>
            <Text style={{color: colors.getList().white, textAlign: 'center', fontWeight: '600'}}>
              ACCEDE CON GOOGLE
              <Icon name="google" color={colors.getList().white} size={20} />
            </Text>
          </TouchableOpacity>*/}

          <TouchableOpacity style={styles.buttonClear} activeOpacity={0.5}>
            <Text style={styles.buttonTextClear}>RECORDAR CONTRASEÑA</Text>
          </TouchableOpacity>

        </View>

        <View style={{position: 'absolute', bottom: 20, left: width/2-20}}>
          <Text style={{marginTop: 10, textAlign: 'center'}}>
            <Icon name="fingerprint" color="#FFF" size={40} />
          </Text>
        </View>

      </View>

    )
  }

}

const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    backgroundColor: colors.getList().primary,
    paddingTop: 10,
    padding: 30,
    height:  height
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },

  textBack: {
    paddingTop: 10,
    paddingLeft: -5,
    marginBottom: 30,
    opacity: 0.6
  },

  arrowBack: {
    width: 30,
    height: 30
  },

  label: {
    textAlign: 'left',
    fontSize: 25,
    marginBottom: 15,
    color: '#FFF'
  },

  labelRemember: {
    fontSize: 18,
    marginBottom: 30,
    color: '#222'
  },

  input: {
    minWidth: 300,
    fontSize: 18,
    color: '#FFF',
    paddingBottom: 10
  },

  button: {
    paddingTop: 17,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 17,
    borderRadius: 3,
    borderColor: colors.getList().app,
    backgroundColor: colors.getList().app,
    marginTop: 30,
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
    minWidth: 300,
  },

  buttonGoogle: {
    paddingTop: 17,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 17,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: colors.getList().google,
    backgroundColor: colors.getList().google,
    marginBottom: 20,
    minWidth: 300,
  },

  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  },

  buttonTextClear: {
    color: colors.getList().app,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  }


});
