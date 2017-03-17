import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Vibration,
  TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';
import * as themoviedb from '../../services/movies-service';
import * as userService from '../../services/user-service';
import * as colors from '../colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default class SwitchListsItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      added: this.props.checked || false,
      color: this.props.checked ? colors.getList().app : '#666'
    };
  }

  _changeState() {
    let user = firebase.auth().currentUser;
    let movie = themoviedb.getCurrentMovie();
    let type = this.props.type;

    if (!this.state.added) {
      this.setState({
        added: true,
        color: colors.getList().app
      });
    } else {
      this.setState({
        added: false,
        color: '#555'
      });
    }

    Vibration.vibrate([0, 20]);

    // change state of switch-lists-item
    setTimeout(() => {
      firebase.database().ref('users/' + user.uid + '/favorites/' + movie.id + '/' + this.props.type).set(
        this.state.added
      );

      // Add o remove from 'favorites list'
      if (this.state.added) {
        themoviedb.setFavoriteList(themoviedb.getCurrentMovie(), this.props.type, 'movie');
      } else {
        themoviedb.removeFavoriteList(themoviedb.getCurrentMovie(), this.props.type);
      }

      // Sync list to Firebase
      firebase.database().ref('users/' + user.uid + '/list/' + this.props.type).set(
        themoviedb.getFavoriteList(this.props.type)
      );
    }, 50);

  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={this._changeState.bind(this)}>
        <Icon name={this.props.icon} size={25} color={this.state.color} />
        <Text style={{color: this.state.color, fontSize: 14, marginTop: 5}}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 0,
    paddingHorizontal: 15,
  },
});
