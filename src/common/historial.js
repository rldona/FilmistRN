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

import * as firebase from 'firebase';
import * as themoviedb from '../services/movies-service';
import * as colors from './colors';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
        let historialListLimit = [];

        for (let i = 0; i < snapshot.val().historial.length; i++) {
          if (i < 5) {
            historialListLimit.push(snapshot.val().historial[i]);
          }
        }

        this.setState({
          dataMovies: ds.cloneWithRows(historialListLimit)
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
        style={{marginBottom: 0}}
        activeOpacity={0.9}
        onPress={this._onSelectMovie.bind(this, movie)}>
        <Image
          resizeMode={'cover'}
          style={{minWidth: 300, borderRadius: 3, marginHorizontal: 0, backfaceVisibility: 'hidden'}}
          source={{uri: 'https://image.tmdb.org/t/p/w300/' + movie.backdrop_path}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 35, paddingLeft: 30, paddingRight: 15, borderBottomWidth: 0, borderBottomColor: colors.getList().primary}}></View>
        </Image>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 0, left: 0, paddingLeft: 15, paddingRight: 15, paddingVertical: 25, minWidth: width-20, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999}}>
          <Text style={{color: colors.getList().white, textAlign: 'center', fontSize: 14}}>{movie.title || movie.name}</Text>
          <Icon name="chevron-right" size={27} color={colors.getList().white} />
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
      <View style={{marginHorizontal: 15, marginBottom: 20, borderColor: '#222326', borderWidth: 0}}>
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

        <View style={styles.row}>
        <View style={[styles.row, styles.marginLeft]}>

          {/*<Icon name="history" size={25} color={colors.getList().white} />*/}
          <Text style={styles.optionTitle}>{title}</Text>

          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              themoviedb.setCurrentTitle('Lo último que has visto');
              themoviedb.setCurrentCollection('historial');
              themoviedb.getNavigator().push({index: 4, route: 'top-list'});
            }}>
            {
              themoviedb.getHistorialList().length > 4 ? <Text style={styles.viewAll}>VER TODAS</Text> : null
            }
          </TouchableOpacity>
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#444'
  },
  optionTitle: {
    paddingVertical: 15,
    fontWeight: '300',
    color: colors.getList().white,
    fontSize: 17,
    marginBottom: 0,
  },
  marginLeft: {
    marginLeft: 15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titlel: {
    fontWeight: '600',
    paddingTop: 5,
    paddingLeft: 5,
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 15,
    color: colors.getList().app,
  },
  viewAll: {
    color: colors.getList().app,
    fontSize: 11,
    marginTop: 0,
    marginRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    minWidth: 80,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.getList().app,
    textAlign: 'center'
  },
});
