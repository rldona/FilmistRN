import React, { Component } from 'react';

import {
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';

import * as firebase from 'firebase';
import * as colors from '../common/colors';

import Loading from './loading';

const { width, height } = Dimensions.get('window');

export default class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.data.visible) {
      return null;
    }

    return (
      <View style={{flex: 1, backgroundColor: colors.getList().secondary, marginTop: 10}}>
        <Image
          resizeMode={'cover'}
          style={{width: width, height: 100}}
          source={{uri: this.props.data.background}} />
          <View style={{position: 'absolute', top: 0, left:0 , width: width, height: 100, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}></View>
          <View style={{flex: 1, position: 'absolute', bottom: 20, right: 30}}>
            <Text style={{color: '#FFF', textAlign: 'right', fontWeight: '500', fontSize: 20, marginBottom: 5}}>{this.props.data.title}</Text>
            <Text style={{color: '#FFF', textAlign: 'right', fontSize: 16}}>{this.props.data.subtitle}</Text>
          </View>
      </View>
    );

  }

}
