import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';

import * as themoviedb from '../../services/movies-service';

import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/MaterialIcons';

const checkIcon = (<Icon name="radio-button-checked" size={25} color="#FFF" />)
const uncheckIcon = (<Icon name="radio-button-unchecked" size={25} color="#FFF" />)

import SwitchSelectorItem from './switch-selector-item';

export default class SwitchSelector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      option0: themoviedb.getLang() === 'es' ? true : false,
      option1: themoviedb.getLang() === 'en' ? true : false,
      option2: themoviedb.getLang() === 'fr' ? true : false
    }
  }

  _onSelectOption(id) {

    // states reset
    this.setState({
      option0: false,
      option1: false,
      option2: false
    });

    if (id === 0) {
      themoviedb.setLang('es');
      this.setState({ 'option0': true });
    }
    if (id === 1) {
      themoviedb.setLang('en');
      this.setState({ 'option1': true });
    }
    if (id === 2) {
      themoviedb.setLang('fr');
      this.setState({ 'option2': true });
    }

    themoviedb.setDistance(0);

  }

  render() {
    return (
      <View>

        <SwitchSelectorItem
          id={0}
          title="Español"
          state={this.state.option0}
          onSelectOption={this._onSelectOption.bind(this)} />

        <SwitchSelectorItem
          id={1}
          title="Inglés"
          state={this.state.option1}
          onSelectOption={this._onSelectOption.bind(this)} />

        <SwitchSelectorItem
          id={2}
          title="Francés"
          state={this.state.option2}
          onSelectOption={this._onSelectOption.bind(this)} />

      </View>
    )
  }

}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    // paddingHorizontal: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  optionTitle: {
    padding: 20,
    color: '#FFF',
    fontSize: 15,
    backgroundColor: '#181818',
    marginBottom: 10
  },
  optionText: {
    color: '#CCC',
    paddingLeft: 20
  },
});

