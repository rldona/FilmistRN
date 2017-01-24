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

import * as colors from '../../../common/colors';

export default class Profile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>

        <View style={{padding: 0}}>

          <View style={{paddingHorizontal: 15, paddingVertical: 30}}>
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Image
                resizeMode={'cover'}
                style={{width: 90, height: 90, borderRadius: 3, backfaceVisibility: 'hidden', marginBottom: 20}}
                source={{uri: 'https://lh3.googleusercontent.com/-OgIx5qWOqVc/AAAAAAAAAAI/AAAAAAAAAAA/AKB_U8tTw5-KNmVaIXZt9ZkEobMYvccN4g/s192-c-mo/photo.jpg'}} />
              {/*<View style={{backgroundColor: colors.getList().secondary, padding: 20, borderRadius: 3}}>
                <Icon name="face" color="#CCC" size={50} />
              </View>*/}
              <View>
                <Text style={styles.userName}>Raúl López Doña</Text>
                <Text style={styles.userEmail}>rldona@gmail.com</Text>
              </View>
            </View>
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

