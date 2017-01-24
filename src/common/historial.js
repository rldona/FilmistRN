import React, { Component } from 'react';

import {
  View,
  ListView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import * as themoviedb from '../services/movies-service';
import * as colors from './colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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
    themoviedb.setCurrentMovie(movie);
    themoviedb.getNavigator().push({index: 2, title: 'detail-movie'})
  }

  renderMovieList(movie) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this._onSelectMovie.bind(this, movie)}>
        <Image
          resizeMode={'cover'}
          style={{minWidth: 300, height: 50, borderRadius: 3, marginHorizontal: 10, backfaceVisibility: 'hidden'}}
          source={{uri: 'https://image.tmdb.org/t/p/w300/' + movie.backdrop_path}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: colors.getList().primary}}>
              <Text numberOfLines={1} style={{maxWidth: 250, color: colors.getList().white, fontSize: 16}}>{movie.title}</Text>
              <Icon name="keyboard-arrow-right" size={27} color={colors.getList().white} />
            </View>
          </Image>
      </TouchableOpacity>
    );
  }

  renderHistorialList() {
    if (!this.state.dataMovies) {
      return (
        <View>
          <Text style={{textAlign: 'center', marginLeft: 15, fontWeight: '600', marginRight: 15, color: '#333', paddingHorizontal: 15, paddingVertical: 15, borderStyle: 'dashed', borderWidth: 2, borderColor: colors.getList().secondary}}>
            LISTA VACÍA
          </Text>
        </View>
      )
    }

    return (
      <View style={{paddingHorizontal: 0}}>
        <ListView
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
      <View style={{backgroundColor: colors.getList().primary, paddingBottom: 40, marginTop: 20}}>

        <View style={{paddingTop: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>
            {title}
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}>
            <Text style={styles.viewAll}>VER TODAS</Text>
          </TouchableOpacity>
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
    textAlign: 'left',
    marginBottom: 15,
    color: colors.getList().white,
  },
  viewAll: {
    color: colors.getList().app,
    fontSize: 11,
    marginTop: 0,
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
