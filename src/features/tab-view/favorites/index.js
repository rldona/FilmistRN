import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';

import Historial from '../../../common/historial';

export default class Favorites extends Component {

  constructor(props) {
    super(props);
    this.state = {
      saved: [],
      viewed: [],
      favorites: []
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Historial title="Las veré algún día" list={this.state.saved} />
        <Historial title="Ya las he visto" list={this.state.viewed} />
        <Historial title="Mis favoritas" list={this.state.favorites} />
      </ScrollView>
    );
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
