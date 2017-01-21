import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';

import Loading from '../../../common/loading';

export default class Favorites extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.centering}>
        <Text>Lists loaded !</Text>
        {/* <Loading /> */}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
