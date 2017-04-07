import React, { Component } from 'react';

import {
  Alert,
  View
} from 'react-native';

import * as firebase from 'firebase';
import * as settingsService from '../../services/settings-service';
import * as moviesService from '../../services/movies-service';

import RadioButtonsItem from './radio-buttons-item';

export default class RadioButtons extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options
    };
  }

  _onSelectOption(id) {
    let newOptions = this.state.options;
    let user = firebase.auth().currentUser;

    if (user) {
      for (let i = 0; i < newOptions.length; i++) {
        if (newOptions[i].id === id) {
          newOptions[i].state = true;
        } else {
          newOptions[i].state = false;
        }
      }

      this.setState({
        options: newOptions
      });

      moviesService.setOptions('lang', this.state.options[id].language);

      firebase.database().ref('users/' + user.uid + '/settings/lang').set(this.state.options[id].language || 'es');
    } else {
      Alert.alert(
        'Opción no disponible',
        'Inicia sesión para poder cambiar y sincronizar opciones de configuración',
        [
          {
            text: 'Iniciar sesión', onPress: () => {
            themoviedb.getNavigator().push({index: 0.1, title: 'login'});
          },
            style: 'cancel' },
          {
            text: 'Cancelar', onPress: () => {
            return true;
          }
          }
        ]
      );
    }

  }

  renderItems() {
    return this.state.options.map((options, i) => {
      return (
        <RadioButtonsItem
          key={i}
          id={options.id}
          title={options.title}
          state={options.state}
          onSelectOption={(id) => this._onSelectOption(id)} />
      );
    });
  }

  render() {
    return (
      <View>
        {this.renderItems()}
      </View>
    );
  }

}
