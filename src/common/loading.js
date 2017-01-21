import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import * as colors from './colors';

const { width, height } = Dimensions.get('window');

export default class Loading extends Component {

  constructor(props) {
    super(props);
  }

  dynamicStyle = () => {
    if (this.props.position == 'center') {
      return {
        position: 'absolute',
        top: height/2  - 15,
        left: width/2  - 15
      }
    } else {
      return {
        position: 'relative',
        marginTop: 20
      }
    }
  }

  render() {
    return (
      <View style={this.dynamicStyle()}>
        <ActivityIndicator
          animating={true}
          color={colors.getList().app}
          size="large"
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
