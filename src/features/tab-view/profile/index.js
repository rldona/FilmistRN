import React, { Component } from 'react';


import {
  ListView,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  ScrollView,
  View,
  StyleSheet
} from 'react-native';

import * as loginService from '../../../services/login-service';
import * as colors from '../../../common/colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Elige un avatar...',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      avatarSource: null,
      name: loginService.getCurrentUser().displayName || '?',
      email: loginService.getCurrentUser().email || '?'
    }
  }

  _takePhoto() {

    // NOTA:
    //
    // 1. hacer foto con al cámara o elegir de la galeria
    // 2. crear un objeto donde guardar toda la info del usuario por UID
    // 3. guardar response.uri en el objeto junto con el resto de configuraciones de usuario
    // 4. parsear el objeto y gardar con AsyncStorage
    // 5. recupear toda la info del usuario al iniciar la app
    //
    // para guardar y recupearar objectos se hace de la misma forma que con LocaStorage
    //
    // JSON.stringify(testObject) -> guarda
    // JSON.parse(objeto) -> recupera
    //

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source;

        // You can display the image using either data...
        source = { uri: 'data:image/jpeg;base64,' + response.data };

        // Or a reference to the platform specific asset location
        if (Platform.OS === 'android') {
          source = { uri: response.uri };
        } else {
          source = { uri: response.uri.replace('file://', '') };
        }

        this.setState({
          avatarSource: source
        });
      }
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
          <View style={{flexDirection: 'column', alignItems: 'center', backgroundColor: colors.getList().secondary, width: 100, height: 100, borderRadius: 50, marginBottom: 20, borderRadius: 50}}>
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

            {/*<Image
              resizeMode={'cover'}
              style={{width: 100, height: 100, borderRadius: 50, backfaceVisibility: 'hidden', marginBottom: 20}}
              source={this.state.avatarSource} />*/}
              {/*source={{uri: 'content://media/external/images/media/15'}} />*/}

            {this.renderAvatar()}

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

