import React, { Component } from 'react';

import {
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

    // array states update
    for (let i = 0; i < newOptions.length; i++) {
      if (newOptions[i].id === id) {
        newOptions[i].state = true;
      } else {
        newOptions[i].state = false;
      }
    }

    // set new array of options
    this.setState({
      options: newOptions
    });

    // set new language
    moviesService.setOptions('lang', this.state.options[id].language);

    let user = firebase.auth().currentUser;

    firebase.database().ref('users/' + user.uid + '/settings/lang').set(this.state.options[id].language || 'es');
    firebase.database().ref('users/' + user.uid + '/settings/allowExitApp').set(settingsService.getOptions().allowExitApp || 'true');
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
