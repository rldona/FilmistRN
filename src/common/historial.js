import * as firebase from 'firebase';

import React, { Component } from 'react';

import {
  View,
  ListView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import * as themoviedb from '../services/movies-service';
import * as colors from './colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Historial extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataMovies: null
    };
  }

  componentWillMount() {
    let user         = firebase.auth().currentUser;
    let historialRef = firebase.database().ref('users/' + user.uid);

    historialRef.on('value', (snapshot) => {
      if (typeof snapshot.val().historial !== 'undefined') {
        this.setState({
          dataMovies: ds.cloneWithRows(snapshot.val().historial)
        });
      } else {
        this.setState({
          dataMovies: null
        });
      }

      if (snapshot.val().historial) {
        themoviedb.setHistorialList(snapshot.val().historial, 'array');
      }
    });
  }

  _onSelectMovie(movie) {
    themoviedb.setCurrentMovie(movie);

    if (movie.first_air_date) {
      themoviedb.getNavigator().push({index: 2.1, route: 'movie-detail-tv'});
    } else {
      themoviedb.getNavigator().push({index: 2, route: 'movie-detail'});
    }
  }

  renderMovieList(movie) {
    return (
      <TouchableOpacity
        style={{marginBottom: 15}}
        activeOpacity={0.9}
        onPress={this._onSelectMovie.bind(this, movie)}>
        <Image
          resizeMode={'cover'}
          style={{minWidth: 300, borderRadius: 3, marginHorizontal: 0, backfaceVisibility: 'hidden'}}
          source={{uri: 'https://image.tmdb.org/t/p/w300/' + movie.backdrop_path}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 35, paddingLeft: 30, paddingRight: 15, borderBottomWidth: 1, borderBottomColor: colors.getList().primary}}></View>
        </Image>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 0, left: 0, paddingLeft: 15, paddingRight: 15, paddingVertical: 25, minWidth: width-20, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999}}>
          <Text style={{color: colors.getList().white, textAlign: 'center', fontSize: 14}}>{movie.title || movie.name}</Text>
          <Icon name="keyboard-arrow-right" size={27} color={colors.getList().white} />
        </View>
      </TouchableOpacity>
    );
  }

  renderHistorialList() {
    if (!this.state.dataMovies) {
      return (
        <View style={{marginHorizontal: 15, marginTop: 15}}>
          <Text style={styles.grid}>VACÍO</Text>
        </View>
      )
    }

    return (
      <View style={{margin: 15}}>
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
      <View style={{backgroundColor: colors.getList().primary, paddingBottom: 0}}>

        <View>
          <Text style={styles.optionTitle}>{title}</Text>
          {/*<TouchableOpacity
            activeOpacity={0.9}>
            {
              themoviedb.getHistorialList().length > 4 ? <Text style={styles.viewAll}>VER MÁS</Text> : null
            }
          </TouchableOpacity>*/}
        </View>

        {this.renderHistorialList()}

      </View>
    )
  }

}

const styles = StyleSheet.create({
  grid: {
    textAlign: 'center',
    marginLeft: 0,
    fontWeight: '600',
    marginRight: 0,
    color: '#444',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#444'
  },
  optionTitle: {
    padding: 15,
    color: '#FFF',
    fontSize: 15,
    marginBottom: 0,
    backgroundColor: colors.getList().secondary,
    // marginBottom: 10
  },
  titlel: {
    fontWeight: '600',
    paddingTop: 5,
    backgroundColor: colors.getList().secondary,
    paddingLeft: 5,
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 15,
    color: colors.getList().white,
  },
  viewAll: {
    color: colors.getList().app,
    fontSize: 11,
    marginTop: 0,
    marginRight: 0,
    paddingTop: 5,
    paddingBottom: 5,
    minWidth: 80,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.getList().app,
    textAlign: 'center'
  },
});
