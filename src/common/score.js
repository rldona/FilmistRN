import React, { Component } from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import * as colors from './colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Score extends Component {

  constructor(props) {
    super(props);
  }

  renderStars() {
    let score     = this.props.score/2;
    let scoreSize = Math.floor(score);
    let scoreRest = score%2;
    let stars     = [];
    let plus      = 0;

    for (let i = 0; i < scoreSize; i++) {
      stars.push(<Icon name="star" color={colors.getList().app} size={30} />);
    }

    if (scoreRest > 0 && scoreSize !== 5) {
      stars.push(<Icon name="star-half" color={colors.getList().app} size={30} />);
    }

    plus = 5 - stars.length;

    for (let i = 0; i < plus; i++) {
      stars.push(<Icon name="star-border" color="#333" size={30} />)
    }

    return (
      <View style={[styles.row, styles.score]}>
        {stars}
      </View>
    );

  }

  render() {
    return (
      <View>
        {this.renderStars()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
});
