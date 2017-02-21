import React, { Component } from 'react';

import {
  View
} from 'react-native';

import * as themoviedb from '../../services/movies-service';
import * as userService from '../../services/user-service';

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
    themoviedb.setLang(this.state.options[id].language);

    userService.updateField('lang', this.state.options[id].language);
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
    )
  }

}
