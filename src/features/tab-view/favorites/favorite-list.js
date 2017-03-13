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

import * as themoviedb from '../../../services/movies-service';
import * as colors from '../../../common/colors';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class FavoriteList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataMovies: null
    };
  }

  componentWillReceiveProps() {
    if (themoviedb.getFavoriteList(this.props.type).length > 0) {
      this.setState({
        dataMovies: ds.cloneWithRows(this.props.list)
      });
    } else {
      this.state = {
        dataMovies: null
      };
    }
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
        style={{marginBottom: 5}}
        activeOpacity={0.9}
        onPress={this._onSelectMovie.bind(this, movie)}>
        <Image
          resizeMode={'cover'}
          style={{minWidth: 300, borderRadius: 3, marginHorizontal: 0, backfaceVisibility: 'hidden'}}
          source={{uri: 'https://image.tmdb.org/t/p/w300/' + movie.backdrop_path}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 35, paddingLeft: 30, paddingRight: 15, borderBottomWidth: 0, borderBottomColor: colors.getList().primary}}></View>
        </Image>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 0, left: 0, paddingLeft: 15, paddingRight: 15, paddingVertical: 25, minWidth: width-20, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999}}>
          <Text style={{color: colors.getList().white, textAlign: 'center', fontSize: 14}}>{movie.title || movie.name}</Text>
          <Icon name="chevron-right" size={25} color={colors.getList().white} />
        </View>
      </TouchableOpacity>
    );
  }

  renderHistorialList() {

    if (!this.state.dataMovies) {
      return (
        <View style={{marginBottom: 10}}>
          <Text style={styles.grid}>VACÍO</Text>
        </View>
      )
    }

    return (
      <View style={{marginBottom: 5, borderColor: '#222326', borderWidth: 0}}>
        <ListView
          dataSource={this.state.dataMovies}
          renderRow={(rowData) => this.renderMovieList(rowData)}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false} />
      </View>
    )
  }

  renderIcon() {
    if (this.props.type === 'saved') {
      return 'bookmark';
    }
    if (this.props.type === 'favorite') {
      return 'star';
    }
    if (this.props.type === 'viewed') {
      return 'eye';
    }
  }

  render() {

    const { title } = this.props;

    return (
      <View style={{backgroundColor: colors.getList().primary, paddingBottom: 0, marginTop: 0, marginLeft: 0, marginRight: 0}}>

        <View style={{paddingTop: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 10}}>
          <View style={styles.row}>
            {/*<Icon name={this.renderIcon()} size={25} color={colors.getList().white} />*/}
            <Text style={styles.title}>
              {title}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              themoviedb.setCurrentTitle(this.props.title);
              themoviedb.setCurrentCollection(this.props.type);
              themoviedb.getNavigator().push({index: 4, route: 'top-list'});
            }}>
            {
              themoviedb.list[this.props.type].length >= 3 ? <Text style={styles.viewAll}>VER TODAS</Text> : null
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
    fontWeight: '400',
    marginRight: 0,
    color: '#444',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#444'
  },
  title: {
    fontWeight: '300',
    paddingLeft: 5,
    fontSize: 17,
    textAlign: 'left',
    paddingVertical: 15,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
