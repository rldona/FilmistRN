import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import * as colors from '../colors';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SwitchListsItem from './switch-lists-item';

const { width, height } = Dimensions.get('window');

export default class SwitchLists extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <SwitchListsItem user={this.props.user} icon="turned-in-not" title="La quiero ver" type="saved" />
        <SwitchListsItem user={this.props.user} icon="remove-red-eye" title="Ya la he visto" type="viewed" />
        <SwitchListsItem user={this.props.user} icon="star" title="Mis favoritas" type="favorite" />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    margin: 15,
    marginBottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
});
