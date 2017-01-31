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
        <SwitchListsItem icon="turned-in-not" title="La quiero ver" />
        <SwitchListsItem icon="remove-red-eye" title="Ya la he visto" />
        <SwitchListsItem icon="star" title="Mis favoritas" />
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
