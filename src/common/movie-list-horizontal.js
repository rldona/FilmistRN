import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ListView,
  StyleSheet,
  Dimensions,
  InteractionManager
} from 'react-native';

import * as themoviedb from '../services/movies-service.js';
import * as colors from './colors';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Loading from '../common/loading';

const { width, height } = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class MoviesListHorizontal extends Component {

  constructor(props) {
    super(props);

    if (typeof this.props.list !== 'undefined') {
      movies = this.props.list;
    }

    this.state = {
      dataMovies: typeof this.props.list === 'undefined' ? [] : this.props.list,
    };
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.loadMovies();
    });
  }

  loadMovies() {
    if (this.props.collection === 'similar') {
      themoviedb.getSimilar(this.props.type, themoviedb.getCurrentMovie().id).then((data) => {
        movies = [];
        movies = data;
        page   = 2;
        this.setState({ 'dataMovies': ds.cloneWithRows(data) });
      });
    } else {
      themoviedb.getPopular(this.props.type, this.props.collection).then((data) => {
        movies = [];
        movies = data;
        page   = 2;
        this.setState({ 'dataMovies': ds.cloneWithRows(data) });
      });
    }
  }

  _onSelectMovie(movie) {
    // themoviedb.getMovie('movie', movie.id).then((data) => {
    //   data.runtime = data.runtime === 0 ? 90 : data.runtime;
    //   themoviedb.setCurrentMovie(data);
    //   themoviedb.getNavigator().push({index: 2, route: 'movie-detail'});
    // });

    themoviedb.setCurrentMovie(movie);
    themoviedb.getNavigator().push({index: 2, route: 'movie-detail'});
  }

  renderMovie(movie) {
    return(
      <TouchableOpacity
        onPress={this._onSelectMovie.bind(this, movie)}
        activeOpacity={0.9}>
        <View style={{paddingVertical: 10}}>
          <Image
            resizeMode={'cover'}
            style={{width: 120, height: 170, borderRadius: 3, marginHorizontal: 10, backfaceVisibility: 'hidden'}}
            source={{uri: 'http://image.tmdb.org/t/p/w150' + movie.poster_path}} />
        </View>
      </TouchableOpacity>
    )
  }

  renderScrollMovieList() {
    if (this.state.dataMovies.length === 0 && typeof this.props.showLoading === 'undefined') {
      return (
        <Loading />
      )
    }

    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20}}>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              themoviedb.setCurrentTitle(this.props.title);
              themoviedb.setCurrentType(this.props.type);
              themoviedb.setCurrentCollection(this.props.collection);
              themoviedb.getNavigator().push({index: 4, route: 'top-list'});
            }}>
            <Text style={styles.viewAll}>VER MÁS</Text>
          </TouchableOpacity>
        </View>
        <ListView
          style={{ marginBottom: 0}}
          dataSource={this.state.dataMovies}
          // pagingEnabled={true}
          initialListSize={1}
          renderRow={(rowData) => this.renderMovie(rowData)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
          enableEmptySections={true} />
      </View>
    )

  }

  render() {
    return (
      <View>
        {this.renderScrollMovieList()}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    color: '#FFF',
    fontWeight: '400',
    paddingTop: 5,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 15,
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
  movie: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 5,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
});