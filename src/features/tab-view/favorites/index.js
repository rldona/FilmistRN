import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';

import * as themoviedb from '../../../services/movies-service';
import * as userService from '../../../services/user-service';
import FavoriteList from './favorite-list';

export default class Favorites extends Component {

  constructor(props) {
    super(props);
    this.state = {
      saved: [],
      viewed: [],
      favorite: []
    };
  }

  componentDidMount() {

    // setTimeout(() => {
    //   var user = userService.getCurrentUser();

    //   var saved    = [];
    //   var viewed   = [];
    //   var favorite = [];

    //   for (var key in user.movies) {
    //       if (user.movies[key].saved) {
    //         themoviedb.getMovie('movie', key).then((movie) => {
    //           saved.push(movie);
    //         });
    //       }
    //       if (user.movies[key].viewed) {
    //         themoviedb.getMovie('movie', key).then((movie) => {
    //           viewed.push(movie);
    //         });
    //       }
    //       if (user.movies[key].favorite) {
    //         themoviedb.getMovie('movie', key).then((movie) => {
    //           favorite.push(movie);
    //         });
    //       }
    //   }

    //   this.setState({saved: saved});
    //   this.setState({viewed: viewed});
    //   this.setState({favorite: favorite});

    // }, 1000);

  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FavoriteList title="Las quiero ver" list={this.state.saved} />
        <FavoriteList title="Las he visto" list={this.state.viewed} />
        <FavoriteList title="Mis favoritas" list={this.state.favorite} />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
