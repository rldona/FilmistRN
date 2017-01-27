import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  View,
  StyleSheet
} from 'react-native';

import * as loginService from '../../../services/login-service';
import * as colors from '../../../common/colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: loginService.getCurrentUser().displayName || '?',
      email: loginService.getCurrentUser().email || '?'
    }
  }

  render() {
    return (
      <ScrollView>

        <View style={{paddingHorizontal: 15, paddingVertical: 30}}>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {/*<Image
              resizeMode={'cover'}
              style={{width: 100, height: 100, borderRadius: 50, backfaceVisibility: 'hidden', marginBottom: 20}}
              source={{uri: 'https://lh3.googleusercontent.com/-OgIx5qWOqVc/AAAAAAAAAAI/AAAAAAAAAAA/AKB_U8tTw5-KNmVaIXZt9ZkEobMYvccN4g/s192-c-mo/photo.jpg'}} />*/}
            <View style={{backgroundColor: colors.getList().secondary, padding: 20, marginBottom: 20, borderRadius: 50}}>
              <Icon name="face" color="#CCC" size={50} />
            </View>
            <View>
              <Text style={styles.userName}>{this.state.name}</Text>
              <Text style={styles.userEmail}>{this.state.email}</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.getList().secondary, paddingVertical: 20}}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={{color: '#FFF', textAlign: 'center', marginBottom: 5, fontSize: 18}}>0</Text>
            <Text style={{color: '#FFF', textAlign: 'center'}}>Guadadas</Text>
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={{color: '#FFF', textAlign: 'center', marginBottom: 5, fontSize: 18}}>0</Text>
            <Text style={{color: '#FFF', textAlign: 'center'}}>Vistas</Text>
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={{color: '#FFF', textAlign: 'center', marginBottom: 5, fontSize: 18}}>0</Text>
            <Text style={{color: '#FFF', textAlign: 'center'}}>Favoritas</Text>
          </View>
        </View>

      </ScrollView>

    )
  }

}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    // paddingHorizontal: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    // marginBottom: 15
  },
  optionTitle: {
    padding: 15,
    color: '#FFF',
    fontSize: 15,
    backgroundColor: colors.getList().secondary,
    // marginBottom: 10
  },
  optionText: {
    color: '#CCC',
    // paddingLeft: 20
  },
  userName: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center'
  },
  userEmail: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center'
  }
});

