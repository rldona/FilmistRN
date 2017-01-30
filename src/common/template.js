import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import * as colors from './colors';

const { width, height } = Dimensions.get('window');

export default class Template extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
