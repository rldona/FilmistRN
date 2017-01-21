import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';

export default class Profile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text>Profile loaded !</Text>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

