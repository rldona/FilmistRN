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

import * as firebase from 'firebase';
import * as themoviedb from '../services/movies-service.js';
import * as colors from './colors';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconSimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import Loading from './loading';
import Score from './score';

const { width, height } = Dimensions.get('window');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var movies = [];
var page   = 2;

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

    if (this.props.collection === 'favorite') {
      this.setState({
        dataMovies: ds.cloneWithRows(themoviedb.getFavoriteList('favorite'))
      });
    }

    if (this.props.collection === 'saved') {
      this.setState({
        dataMovies: ds.cloneWithRows(themoviedb.getFavoriteList('saved'))
      });
    }

    if (this.props.collection === 'viewed') {
      this.setState({
        dataMovies: ds.cloneWithRows(themoviedb.getFavoriteList('viewed'))
      });
    }

    if (this.props.collection === 'historial') {
      this.setState({
        dataMovies: ds.cloneWithRows(themoviedb.getHistorialList())
      });
    }

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

    if (this.props.collection !== 'similar' && this.props.collection !== 'search' && this.props.collection !== 'historial') {
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

    let user = firebase.auth().currentUser;

    if (themoviedb.findFavorite(movie.id) === -1) {
      // init favorites default movies types to Firebase
      firebase.database().ref('users/' + user.uid + '/favorites/' + movie.id + '/').set({
        saved: false,
        viewed: false,
        favorite: false
      });

      themoviedb.setFavorite(movie.id, 'movie');
    }

    themoviedb.setCurrentMovie(movie);
    themoviedb.setHistorialList(movie);

    firebase.database().ref('users/' + user.uid + '/historial').set(
      themoviedb.getHistorialList()
    );

    if (movie.first_air_date) {
      themoviedb.getNavigator().push({index: 2.1, route: 'movie-detail-tv'});
    } else {
      themoviedb.getNavigator().push({index: 2, route: 'movie-detail'});
    }

  }

  renderMovieList(movie) {
    if (movie.first_air_date === '') {
      movie.first_air_date = '2016-01-01';
    }

    if (movie.media_type === 'person') {
      return null;
    }

    if(movie.media_type === 'tv' || movie.name) {
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
    }

    return (
      <View style={{borderRadius: 3}}>
        <TouchableOpacity
          style={{marginHorizontal: 0, marginTop: 0, borderTopWidth: 15, borderBottomWidth: 0, borderRadius: 3, borderColor: colors.getList().primary}}
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

  infiniteScroll = () => {
    if (this.props.collection !== 'historial' && this.props.collection !== 'saved' && this.props.collection !== 'viewed' && this.props.collection !== 'favorite') {

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
  }

  _onScroll(event) {
    var currentOffset = event.nativeEvent.contentOffset.y;
    var direction = currentOffset > this.state.offset ? 'down' : 'up';

    this.state.offset = currentOffset;
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

    if (this.state.dataMovies._cachedRowCount === 0) {
      let user = firebase.auth().currentUser;

      // Eliminar el último term buscado
      themoviedb.removeLastTerm();

      firebase.database().ref('users/' + user.uid + '/search/terms/').set(
        themoviedb.getTermHistorial()
      );

      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={{alignItems: 'center', justifyContent: 'flex-start', marginTop: 40, width: 300}}>
            <IconSimpleIcons name="flag" size={60} color='#999' />
            <Text style={{color: colors.getList().white, fontSize: 16, marginTop: 20, fontWeight: '600'}}>No se han encontrado resultados.</Text>
            <Text style={{color: colors.getList().white, fontSize: 14, marginTop: 5, fontWeight: '300', textAlign: 'center'}}>Comprueba si está bien escrito o prueba con otras palabras.</Text>
          </View>
        </View>
      )
    }

    return (
      <View style={{paddingBottom: 80, paddingHorizontal: 15, backgroundColor: colors.getList().primary}}>
        <ListView
          ref={(scrollView) => { _scrollView = scrollView; }}
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
