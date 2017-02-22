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
import Loading from './loading';
import Score from './score';

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
      offset: 0
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
    }

    if (this.props.collection === 'search') {
      themoviedb.search(this.props.query).then((data) => {
        movies = [];
        movies = data;
        page   = 2;
        this.setState({ 'dataMovies': ds.cloneWithRows(data) });
      });
    }

    if (this.props.collection !== 'similar' && this.props.collection !== 'search') {
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

    if (movie.media_type === 'movie') {
      themoviedb.getNavigator().push({index: 2, route: 'movie-detail'});
    } else {
      themoviedb.getNavigator().push({index: 2.1, route: 'movie-detail-tv'});
    }

  }

  renderMovieList(movie) {

    if (movie.first_air_date === '') {
      movie.first_air_date = '2016-01-01';
    }

    switch (movie.media_type) {
      case 'person':
        return null;
      case 'tv':
        return (
          <View style={{borderRadius: 3}}>
            <TouchableOpacity
              style={{marginHorizontal: 0, marginTop: 0, borderTopWidth: 15, borderRadius: 3, borderColor: colors.getList().primary}}
              onPress={this._onSelectMovie.bind(this, movie)}
              activeOpacity={0.9}>
              <View style={{flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.getList().secondary, borderRadius: 3}}>

                <Image
                  resizeMode={'cover'}
                  style={{width: 100, height: 150, marginRight: 10, borderTopLeftRadius: 3, borderBottomLeftRadius: 3, backfaceVisibility: 'hidden'}}
                  source={{uri: 'http://image.tmdb.org/t/p/w150' + movie.poster_path}} />

                <View>
                  <Text style={{color: '#FFF', fontSize: 16, fontWeight: '300', lineHeight: 25, width: width - 150, marginTop: 5, marginBottom: 5}}>{movie.name}</Text>
                  <Text style={{color: '#999', fontSize: 14, lineHeight: 25, marginBottom: 10}}>{movie.first_air_date.split('-')[0]}</Text>
                  <Score score={movie.vote_average} />
                </View>

              </View>
            </TouchableOpacity>
          </View>
        )
      case 'movie':
        return (
          <View style={{borderRadius: 3}}>
            <TouchableOpacity
              style={{marginHorizontal: 0, marginTop: 0, borderTopWidth: 15, borderRadius: 3, borderColor: colors.getList().primary}}
              onPress={this._onSelectMovie.bind(this, movie)}
              activeOpacity={0.9}>
              <View style={{flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.getList().secondary, borderRadius: 3}}>

                <Image
                  resizeMode={'cover'}
                  style={{width: 100, height: 150, marginRight: 10, borderTopLeftRadius: 3, borderBottomLeftRadius: 3, backfaceVisibility: 'hidden'}}
                  source={{uri: 'http://image.tmdb.org/t/p/w150' + movie.poster_path}} />

                <View>
                  <Text style={{color: '#FFF', fontSize: 16, fontWeight: '300', lineHeight: 25, width: width - 150, marginTop: 5, marginBottom: 5}}>{movie.title}</Text>
                  <Text style={{color: '#999', fontSize: 14, lineHeight: 25, marginBottom: 10}}>{movie.release_date.split('-')[0]}</Text>
                  <Score score={movie.vote_average} />
                </View>

              </View>
            </TouchableOpacity>
          </View>
        )
    }
  }

  infiniteScroll = () => {
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

    if (this.props.collection !== 'similar' && this.props.collection !== 'search') {
      themoviedb.getPopular(this.props.type, this.props.collection, page).then((data) => {
        Array.prototype.push.apply(movies, data);
        this.setState({ 'dataMovies': ds.cloneWithRows(movies) });
        page++;
      });
    }
  }

  _onScroll(event) {
    // console.log(event.nativeEvent);

    var currentOffset = event.nativeEvent.contentOffset.y;
    var direction = currentOffset > this.state.offset ? 'down' : 'up';

    this.state.offset = currentOffset;

    // console.log(direction);

    this.props.onScrollList(direction, currentOffset);
  }

  renderScrollMovieList() {
    if (this.state.dataMovies.length === 0) {
      return (
        <View style={{marginTop: 20}}>
          <Loading />
        </View>
      )
    }

    return (
      <View style={{paddingBottom: 80, paddingHorizontal: 15, backgroundColor: colors.getList().primary}}>
        <ListView
          ref={(scrollView) => { _scrollView = scrollView; }}
          initialListSize={1}
          style={{backgroundColor: colors.getList().primary }}
          dataSource={this.state.dataMovies}
          renderRow={(rowData) => this.renderMovieList(rowData)}
          enableEmptySections={true}
          onScroll={this._onScroll.bind(this)}
          onEndReached={this.infiniteScroll}
          showsVerticalScrollIndicator={false}
          horizontal={false} />
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
    color: '#DDD',
    paddingTop: 5,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  titleVertical: {
    color: '#FFF',
    // backgroundColor: colors.getList().primary,
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
  },
});