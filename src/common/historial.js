import React, { Component } from 'react';

import {
  View,
  ListView,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import * as themoviedb from '../services/movies-service';
import * as colors from './colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

// const fakeHistoria = [
//   { id: 0, title: 'Star War: Episodio 1'},
//   { id: 1, title: 'Star Trek'},
//   { id: 2, title: 'El Bola'},
//   { id: 3, title: 'El club de la lucha'}
// ];

export default class Historial extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataMovies: this.props.list.length > 0 ? ds.cloneWithRows(this.props.list) : null
    };
  }

  componentWillReceiveProps() {
    if (themoviedb.getHistorialList().length > 0) {
      this.setState({
        dataMovies: ds.cloneWithRows(themoviedb.getHistorialList())
      });
    } else {
      this.setState({
        dataMovies: null
      });
    }
  }

  _onSelectMovie(movie) {
    themoviedb.getNavigator().push({index: 2, title: 'detail-movie'})
  }

  renderMovieList(movie) {
    return (
      <TouchableOpacity
        onPress={this._onSelectMovie.bind(this, movie)}
        style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: colors.getList().primary}}>
        <Text style={{color: colors.getList().white}}>{movie.title} ( {movie.vote_average} )</Text>
        <Icon name="keyboard-arrow-right" size={27} color={colors.getList().white} />
      </TouchableOpacity>
    );
  }

  renderHistorialList() {
    if (!this.state.dataMovies) {
      return (
        <View>
          <Text style={{color: '#CCC', paddingHorizontal: 15, paddingVertical: 15, backgroundColor: colors.getList().secondary}}>
            Tienes que ver antes algún contenido
          </Text>
        </View>
      )
    }

    return (
      <View style={{paddingHorizontal: 0}}>
        <ListView
          style={{backgroundColor: colors.getList().secondary }}
          dataSource={this.state.dataMovies}
          renderRow={(rowData) => this.renderMovieList(rowData)}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false} />
      </View>
    )
  }

  render() {

    const { title } = this.props;

    return (
      <View style={{backgroundColor: colors.getList().primary, paddingBottom: 40, marginTop: 10}}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
          <Text style={styles.title}>
            {title}
          </Text>
          {/*<TouchableOpacity
            activeOpacity={0.9}>
            <Text style={styles.viewAll}>VER MÁS</Text>
          </TouchableOpacity>*/}
        </View>

        {this.renderHistorialList()}

      </View>
    )
  }

}

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    paddingTop: 5,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 15,
    color: colors.getList().white,
  },
  viewAll: {
    color: colors.getList().app,
    fontSize: 11,
    marginTop: 3,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    minWidth: 80,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.getList().app,
    textAlign: 'center'
  },
});
