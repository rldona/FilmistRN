import * as firebase from 'firebase';

import React, { Component } from 'react';

import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet
} from 'react-native';

import * as loginService from '../../services/login-service';
import * as userService from '../../services/user-service';
import * as themoviedb from '../../services/movies-service';
import * as colors from '../../common/colors';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Loading from '../../common/loading';

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      showLoading: false
    }
  }

  _register() {
    Keyboard.dismiss();
    if (this.state.name !== '' && this.state.email !== '' && this.state.password !== '' && this.state.password.length > 5 && this.state.passwordRepeat !== '' && this.state.password === this.state.passwordRepeat) {
      this.setState({showLoading: true});
      loginService.register(this.state.email, this.state.password).then((user) => {
        let updateUser = firebase.auth().currentUser;
        this.setState({showLoading: false});
        firebase.database().ref('users/' + user.uid).set({
          settings: {
            lang: 'es',
            allowExitApp: false
          }
        });
        updateUser.updateProfile({
          displayName: this.state.name,
          photoURL: null
        }).then(() => {
          themoviedb.getNavigator().resetTo({index: 1, title: 'home'});
        }, (error) => {
          alert(error);
        });
      }).catch((error) => {
        this.setState({showLoading: false});
        if (error.code === 'auth/invalid-email') {
          alert('El formato de email introducido no es correcto');
          return true;
        }
        if (error.code === 'auth/email-already-in-use') {
          alert('El email ya está registrado. ¿Has olvidado la contraseña?');
        }
      });
    } else {
      this.setState({showLoading: false});

      if (this.state.name === '') {
        alert('Tienes que introducir un nombre');
        return true;
      }
      if (this.state.email === '') {
        alert('Tienes que introducir un email');
        return true;
      }
      if (this.state.password === '') {
        alert('Tienes que introducir una contraseña');
        return true;
      }
      if (this.state.password.length < 6) {
        alert('La contraseña debe tener al menos 6 caractéres alfanuméricos');
        return true;
      }
      if (this.state.passwordRepeat === '') {
        alert('Tienes que repetir la contraseña');
        return true;
      }
      if (this.state.password !== this.state.passwordRepeat) {
        alert('La contraseña y la confirmación no coinciden');
      }
    }
  }

  _goBack() {
    themoviedb.getNavigator().pop();
  }

  showButtonLoading() {
    if (!this.state.showLoading) {
      return <Text style={styles.buttonTextClear}>REGÍSTRO</Text>
    } else {
      return <Loading color="#FFF" size={19} />
    }
  }

  renderButtonStyle() {
    if (this.state.name !== '' && this.state.email !== '' && this.state.password !== '' && this.state.password.length > 5 && this.state.passwordRepeat !== '' && this.state.password === this.state.passwordRepeat) {
      return {
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
      }
    } else {
      return {
        marginTop: 30,
        paddingTop: 17,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 17,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#222',
        backgroundColor: '#222',
        marginBottom: 20,
        minWidth: 300
      }
    }
  }

  renderButtonOpacity() {
    if (this.state.name !== '' && this.state.email !== '' && this.state.password !== '' && this.state.password.length > 5 && this.state.passwordRepeat !== '' && this.state.password === this.state.passwordRepeat) {
      return 0.8;
    } else {
      return 1;
    }
  }

  render() {
    return(

      <View style={styles.container} renderToHardwareTextureAndroid={true}>

        <Text onPress={this._goBack.bind(this)} style={styles.textBack}>
          <Icon name="arrow-back" size={30} color={colors.getList().white} />
        </Text>

        <Text style={styles.label}>Hola, regístrate en Filmist</Text>

        <TextInput
          style={styles.input}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          placeholder="Name"
          returnKeyType="next"
          underlineColorAndroid='#FFF'
          placeholderTextColor="#666"
          autoFocus={false} />

        <TextInput
          style={styles.input}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          returnKeyType="next"
          underlineColorAndroid='#FFF'
          placeholderTextColor="#666"
          placeholder="Email" />

        <TextInput
          style={styles.input}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          placeholder="Contraseña"
          returnKeyType="next"
          underlineColorAndroid='#FFF'
          placeholderTextColor="#666"
          secureTextEntry={true} />

        <TextInput
          style={styles.input}
          onChangeText={(passwordRepeat) => this.setState({passwordRepeat})}
          value={this.state.passwordRepeat}
          placeholder="Confirmar contraseña"
          returnKeyType="done"
          underlineColorAndroid='#FFF'
          placeholderTextColor="#666"
          onSubmitEditing={this._register.bind(this)}
          secureTextEntry={true} />

        <TouchableOpacity onPress={this._register.bind(this)} style={this.renderButtonStyle()} activeOpacity={this.renderButtonOpacity()}>
          {this.showButtonLoading()}
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
  input: {
    paddingVertical: 10,
    minWidth: 300,
    fontSize: 15,
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
  buttonText: {
    color: colors.getList().white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  },
  buttonTextClear: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  }
});
