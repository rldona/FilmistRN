import React, { Component } from 'react';

import {
  View,
  Text,
  NetInfo,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import * as colors from './colors';
import * as moviesService from '../services/movies-service';

import Icon from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window');

export default class Offline extends Component {

  constructor(props) {
    super(props);
  }

  retryConnectionNetwork() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        moviesService.getNavigator().resetTo({index: moviesService.getCurrentIndex()[moviesService.getCurrentIndex().length - 2]});
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.getList().primary}}>
        <Icon name="signal-cellular-connected-no-internet-4-bar" size={70} color={colors.getList().white} />
        <Text style={{color: colors.getList().white, marginTop: 20, fontSize: 20}}>Estás sin conexión.</Text>
        <Text style={{color: colors.getList().white, marginTop: 5, fontSize: 14, width: 250, textAlign: 'center'}}>Por favor, conéctate a internet y prueba de nuevo.</Text>
        <TouchableOpacity
          onPress={() => this.retryConnectionNetwork()}
          style={styles.buttonClear}
          activeOpacity={0.8}>
          <Text style={styles.text}>
            REINTENTAR
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  text: {
    color: colors.getList().white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  },
  buttonClear: {
    marginTop: 40,
    paddingTop: 17,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 17,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: colors.getList().white,
    backgroundColor: colors.getList().primary,
    marginBottom: 20,
    minWidth: 300
  },
});
