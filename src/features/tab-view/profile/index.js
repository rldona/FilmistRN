import * as firebase from 'firebase';

import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  AsyncStorage,
  ScrollView,
  View,
  StyleSheet
} from 'react-native';

import * as settingsService from '../../../services/settings-service';
import * as themoviedb from '../../../services/movies-service';
import * as userService from '../../../services/user-service';
import * as loginService from '../../../services/login-service';
import * as colors from '../../../common/colors';

import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Historial from '../../../common/historial';

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      avatarSource: settingsService.getOptions().avatar,
      name: userService.getCurrentUser().displayName,
      email: userService.getCurrentUser().email
    }
  }

  _takePhoto() {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      includeBase64: true
    }).then(image => {
      let user = firebase.auth().currentUser;

      firebase.database().ref('users/' + user.uid + '/settings/avatar').set({
        uri: 'data:image/jpeg;base64,' + image.data
      });

      settingsService.setOption('avatar', { uri: 'data:image/jpeg;base64,' + image.data });

      this.setState({ avatarSource: { uri: 'data:image/jpeg;base64,' + image.data } });
    });
  }

  renderAvatar() {
    if (this.state.avatarSource) {
      return (
        <TouchableOpacity onPress={this._takePhoto.bind(this)}>
          <Image
            resizeMode={'cover'}
            style={{width: 100, height: 100, borderRadius: 50, backfaceVisibility: 'hidden', marginBottom: 20}}
            source={this.state.avatarSource} />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={this._takePhoto.bind(this)}>
          <View style={{flexDirection: 'column', alignItems: 'center', backgroundColor: colors.getList().secondary, width: 100, height: 100, borderRadius: 50, marginBottom: 20}}>
            <Text style={{marginTop: 25}}>
              <Icon name="face" color="#CCC" size={50} />
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <ScrollView>

        <View style={{paddingHorizontal: 15, paddingVertical: 30}}>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {this.renderAvatar()}
            <View>
              <Text style={styles.userName}>{this.state.name}</Text>
              <Text style={styles.userEmail}>{this.state.email}</Text>
            </View>
          </View>
        </View>

        <Historial title="Lo último que has visto" />

        {/*<View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.getList().secondary, paddingVertical: 20}}>
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
        </View>*/}

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

