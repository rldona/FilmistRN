import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import * as themoviedb from '../../services/movies-service';
import * as userService from '../../services/user-service';
import * as colors from '../colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default class SwitchListsItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      added: false,
      color: '#555'
    };
  }

  componentDidMount() {
    // let currentUser = userService.getCurrentUser();
    setTimeout(() => {
      this.setState({color: this.props.user.movies[themoviedb.getCurrentMovie().id][this.props.type] ? colors.getList().app : '#555'});
    }, 250);
  }

  _changeState() {

    // let currentUser = userService.getCurrentUser();

    // console.log(this.state.added);
    // console.log(this.props.user.movies[themoviedb.getCurrentMovie().id][this.props.type]);

    // this.setState({
    //   added: this.props.user.movies[themoviedb.getCurrentMovie().id][this.props.type]
    // });

    if (this.props.user.movies[themoviedb.getCurrentMovie().id][this.props.type]) {
      this.setState({
        added: false,
        color: '#555'
      });
      this.props.user.movies[themoviedb.getCurrentMovie().id][this.props.type] = false;
    } else {
      this.setState({
        added: true,
        color: colors.getList().app
      });
      this.props.user.movies[themoviedb.getCurrentMovie().id][this.props.type] = true;
    }

    userService.updateUser(this.props.user);

    // console.log(this.props.user);

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
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center'
  },
});
