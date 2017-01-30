import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import * as colors from '../colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default class SwitchListsItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      added: false,
      color: '#555'
    };
  }

  _changeState() {
    if (this.state.added) {
      this.setState({
        added: false,
        color: '#555'
      });
    } else {
      this.setState({
        added: true,
        color: colors.getList().app
      });
    }
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={this._changeState.bind(this)}>
        <Icon name={this.props.icon} size={25} color={this.state.color} />
        <Text style={{color: this.state.color, fontSize: 14, marginTop: 5}}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center'
  },
});
