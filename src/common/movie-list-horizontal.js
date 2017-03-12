import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ListView,
  StyleSheet,
  Dimensions,
  Vibration,
  ToastAndroid,
  InteractionManager
} from 'react-native';

import * as firebase from 'firebase';
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

  componentDidMount() {
    // InteractionManager.runAfterInteractions(() => {
    this.loadMovies();
    // });
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

    let user = firebase.auth().currentUser;

    if (themoviedb.findFavorite(movie.id) === -1) {
      firebase.database().ref('users/' + user.uid + '/favorites/' + movie.id + '/').set({
        saved: false,
        viewed: false,
        favorite: false
      });

      themoviedb.setFavorite(movie.id, 'movie');
    }

    // save current movie
    themoviedb.setCurrentMovie(movie);

    // save movie to historial list
    themoviedb.setHistorialList(movie);

    //
    // Save movie to historial with Redux
    //
    this.props.actions.addHistorial(movie);

    // set historial list to Firebase
    // firebase.database().ref('users/' + user.uid + '/historial').set(
    //   themoviedb.getHistorialList()
    // );

    if (movie.first_air_date) {
      themoviedb.getNavigator().push({index: 2.1, route: 'movie-detail-tv'});
    } else {
      themoviedb.getNavigator().push({index: 2, route: 'movie-detail'});
    }
  }

  renderMovie(movie) {
    return(
      <TouchableOpacity
        onPress={this._onSelectMovie.bind(this, movie)}
        onLongPress={() => {ToastAndroid.show(movie.title, ToastAndroid.SHORT); Vibration.vibrate([0, 20])}}
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
      // <Loading />
      return null
    }

    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15}}>
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
    fontSize: 17,
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
