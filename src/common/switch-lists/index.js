import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import * as firebase from 'firebase';
import * as movieService from '../../services/movies-service';
import * as colors from '../colors';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SwitchListsItem from './switch-lists-item';

const { width, height } = Dimensions.get('window');

export default class SwitchLists extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      show: false
    }
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    let movie = movieService.getCurrentMovie();
    let type = this.props.type;

    firebase.database().ref('users/' + user.uid + '/favorites/' + movie.id).on('value', (snapshot) => {
      this.setState({
        data: snapshot.val(),
        show: true
      });
    });
  }

  render() {
    if(!this.state.show) {
      return null;
    }

    return (
      <View>
        <View style={styles.container}>
          <SwitchListsItem icon="turned-in-not" title="La quiero ver" type="saved" checked={this.state.data.saved} />
          <SwitchListsItem icon="remove-red-eye" title="Ya la he visto" type="viewed" checked={this.state.data.viewed} />
          <SwitchListsItem icon="star" title="Mis favoritas" type="favorite" checked={this.state.data.favorite} />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 20,
    // paddingVertical: 15,
    borderRadius: 3,
    marginHorizontal: 15,
    marginBottom: 20,
    borderTopWidth: 10,
    borderTopColor: colors.getList().primary,
    borderBottomWidth: 10,
    borderBottomColor: colors.getList().primary,
    backgroundColor: colors.getList().secondary
  },
});
