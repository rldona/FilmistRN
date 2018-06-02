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

var movies = [];
var page = 2;

export default class MoviesList extends Component {

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
    // InteractionManager.runAfterInteractions(() => {
    this.loadMovies();
    // });
  }

  loadMovies() {
    if (this.props.collection === 'now_playing' ||
        this.props.collection === 'upcoming' ||
        this.props.collection === 'popular' ||
        this.props.collection === 'top_rated') {
      themoviedb.getPopular(this.props.type, this.props.collection).then((data) => {
        // update movies
        movies = [];
        movies = data;
        page   = 2;

        this.setState({ 'dataMovies': ds.cloneWithRows(data) });
      });
    }

    if (this.props.collection === 'similar') {
      themoviedb.getSimilar(this.props.type, themoviedb.getCurrentMovie().id).then((data) => {
        // update movies
        movies = [];
        movies = data;
        page   = 2;

        this.setState({ 'dataMovies': ds.cloneWithRows(data) });
      });
    }

    if (this.props.collection === 'search') {
      themoviedb.search(this.props.query).then((data) => {
        // update movies
        movies = [];
        movies = data;
        page   = 2;

        this.setState({ 'dataMovies': ds.cloneWithRows(data) });
      });
    }
  }

  _onSelectMovie(movie) {
    themoviedb.getMovie('movie', movie.id).then((data) => {
      data.runtime = data.runtime === 0 ? 90 : data.runtime;
      themoviedb.setCurrentMovie(data);
      themoviedb.getNavigator().push({index: 2, route: 'movie-detail'});
    });

    // themoviedb.setCurrentMovie(movie);
    // themoviedb.getNavigator().push({index: 2, route: 'movie-detail'});
  }

  renderMovie(movie) {
    return(
      <TouchableOpacity

        onPress={this._onSelectMovie.bind(this, movie)}
        activeOpacity={0.9}>
        <View style={{paddingVertical: 10, backgroundColor: '#171717'}}>
          <Image
            resizeMode={'cover'}
            style={{width: 120, height: 180, borderRadius: 5, marginHorizontal: 10, backfaceVisibility: 'hidden'}}
            source={{uri: 'http://image.tmdb.org/t/p/w154' + movie.poster_path}} />
        </View>
      </TouchableOpacity>
    );
  }

  renderMovieList(movie) {
    return(
      <View>
        <TouchableOpacity
          style={{marginHorizontal: 0, marginTop: 0, borderTopWidth: 10, borderColor: '#222'}}
          onPress={this._onSelectMovie.bind(this, movie)}
          activeOpacity={0.9}>
          <View style={{backgroundColor: '#333'}}>
            <View style={{position: 'absolute', top: 5, left: 115, width: 220}}>
              <Text style={{color: '#FFF', fontSize: 16, fontWeigth: 300, lineHeight: 25}}>{movie.title}</Text>
              <Text style={{color: '#999', fontSize: 14, lineHeight: 25}}>{movie.release_date.split('-')[0]}</Text>
              <Text style={{color: '#FFF', fontSize: 16, marginTop: 20}}>{movie.vote_average}</Text>
              <Text style={{color: '#FFF', fontSize: 16, marginTop: 5}}>{movie.vote_count}</Text>
            </View>
            <Image
              resizeMode={'cover'}
              style={{width: 100, height: 150, borderRadius: 0, backfaceVisibility: 'hidden'}}
              source={{uri: 'http://image.tmdb.org/t/p/w154' + movie.poster_path}} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  infiniteScroll = () => {
    if (this.props.collection === 'now_playing' ||
        this.props.collection === 'upcoming' ||
        this.props.collection === 'popular' ||
        this.props.collection === 'top_rated') {
      themoviedb.getPopular(this.props.type, this.props.collection, page).then((data) => {
        Array.prototype.push.apply(movies, data);
        this.setState({ 'dataMovies': ds.cloneWithRows(movies) });
        page++;
      });
    }

    if (this.props.collection === 'similar') {
      themoviedb.getSimilar(this.props.type, themoviedb.getCurrentMovie().id, page).then((data) => {
        Array.prototype.push.apply(movies, data);
        this.setState({ 'dataMovies': ds.cloneWithRows(movies) });
        page++;
      });
    }

    if (this.props.collection === 'search') {
      themoviedb.search(this.props.query, page).then((data) => {
        Array.prototype.push.apply(movies, data);
        this.setState({ 'dataMovies': ds.cloneWithRows(movies) });
        page++;
      });
    }
  }

  renderScrollMovieList() {
    if (this.state.dataMovies.length === 0) {
      return (
        <Loading color={colors.getList().app} />
      );
    }

    if (this.props.position === 'horizontal') {
      return (
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
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
              <Text style={styles.viewAll}>VER TODAS</Text>
            </TouchableOpacity>
          </View>
          <ListView
            style={{ marginBottom: 20}}
            dataSource={this.state.dataMovies}
            renderRow={(rowData) => this.renderMovie(rowData)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
            enableEmptySections={true} />
        </View>
      );
    } else {
      return (
        <View style={{paddingBottom: 80, paddingHorizontal: 10}}>
          <ListView
            ref={(scrollView) => { _scrollView = scrollView; }}
            initialListSize={1}
            scrollRenderAheadDistance={200}
            style={{backgroundColor: '#222' }}
            dataSource={this.state.dataMovies}
            renderRow={(rowData) => this.renderMovieList(rowData)}
            onEndReached={this.infiniteScroll}
            showsVerticalScrollIndicator={false}
            horizontal={false} />
        </View>
      );
    }

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
    color: '#DDD',
    fontWeight: '300',
    paddingTop: 5,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  titleVertical: {
    color: '#FFF',
    fontWeight: '300',
    paddingTop: 5,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 15
  },
  viewAll: {
    color: colors.getList().app,
    fontSize: 11,
    marginTop: 3,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    minWidth: 80,
    borderRadius: 30,
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
  }
});
