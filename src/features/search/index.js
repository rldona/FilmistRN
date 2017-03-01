import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Keyboard
} from 'react-native';

import * as firebase from 'firebase';
import * as themoviedb from '../../services/movies-service';
import * as Animatable from 'react-native-animatable';
import * as colors from '../../common/colors';

import Header from '../../common/header';
import MoviesListVertical from '../../common/movie-list-vertical';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconEvil from 'react-native-vector-icons/EvilIcons';

const { width, height } = Dimensions.get('window');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      search: '',
      keyboardTransition: 0,
      heightCompAdd: 0,
      up: false,
      down: false,
      termHistorial: null
    };

    const scrollTopActive = {
      from: {
        opacity: 1,
      },
      to: {
        opacity: 1,
      },
    };

    const scrollTopDesactive = {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 0,
      },
    };

    Animatable.initializeRegistryWithDefinitions({
      scrollTopActive, scrollTopDesactive
    });
  }

  componentWillMount() {
    this.setState({
      termHistorial: ds.cloneWithRows(themoviedb.getTermHistorial())
    });

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = (e) => {
    this.setState({keyboardTransition: -e.endCoordinates.height});
  }

  _keyboardDidHide = () => {
    this.setState({keyboardTransition: 0});
  }

  _onActionSelected = (action) => {
    switch (action) {
      case 'left':
        themoviedb.getNavigator().pop();
        break;
      case 'right':
        break;
    }
  }

  _searchMovie = () => {
    let user = firebase.auth().currentUser;

    themoviedb.setTermHistorial({
      id: themoviedb.getTermHistorial().length,
      term: this.state.query
    }, 'term');

    firebase.database().ref('users/' + user.uid + '/search/terms/').set(
      themoviedb.getTermHistorial()
    );

    this.setState({
      search: this.state.query,
      termHistorial: ds.cloneWithRows(themoviedb.getTermHistorial())
    });
  }

  _onSearchChange(query) {
    if (query !== '') {
      this.setState({ search: '' });
      this.setState({query: query});
    } else {
      this.setState({ query: '' });
    }
  }

  _clearInput() {
    this.setState({search: ''});
    this.setState({query: ''});
  }

  renderClearInputIcon() {
    if(this.state.query) {
      return <Icon name='close' size={25} color="#E91E63" onPress={this._clearInput.bind(this)} />
    } else {
      return <Icon name='close' size={25} color='#FFF' />
    }
  }

  renderMovieList(obj) {
    return (
      <View style={styles.row}>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              this.setState({
                query: obj.term,
                search: obj.term
              });
            }}>
            <Text style={{color: '#FFF', fontSize: 15}}>{obj.term}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              {/*themoviedb.removeTermHistorial(obj.id);

              firebase.database().ref('users/' + user.uid + '/search/terms/' + obj.id).set(null);

              this.setState({
                termHistorial: ds.cloneWithRows(themoviedb.getTermHistorial())
              });*/}
            }}>
            <IconEvil name="close" size={25} color='#999' />
          </TouchableOpacity>
      </View>
    )
  }

  renderResult() {
    if (this.state.search !== '') {
      return(
        <MoviesListVertical
          title="Buscar"
          type="movie"
          collection="search"
          onScrollList={this._onScrollList.bind(this)}
          query={this.state.search} />
      );
    } else {

      // para general el id del termino de búsqueda, searchHistorial.length + 1

      if (themoviedb.getTermHistorial().length > 0) {

        return (
          <View style={{paddingLeft: 20, paddingRight: 15, marginTop: 10}}>

            <ListView
              //ref={(scrollView) => { _scrollView = scrollView; }}
              //initialListSize={1}
              //style={{backgroundColor: colors.getList().primary }}
              dataSource={this.state.termHistorial}
              renderRow={(rowData) => this.renderMovieList(rowData)}
              //enableEmptySections={true}
              //onScroll={this._onScroll.bind(this)}
              //onEndReached={this.infiniteScroll}
              showsVerticalScrollIndicator={false}
              horizontal={false} />

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                let user = firebase.auth().currentUser;

                themoviedb.clearTermHistorial();

                firebase.database().ref('users/' + user.uid + '/search/terms/').set(null);

                this.setState({
                  termHistorial: ds.cloneWithRows(themoviedb.getTermHistorial())
                });
              }}>
              <Text style={{color: '#777', fontSize: 14, marginTop: 10}}>Limpiar historial de búsqueda</Text>
            </TouchableOpacity>

          </View>
        )

      } else {

        return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: 30}}>
              <IconEvil name="search" size={80} color='#777' />
              <Text style={{color: colors.getList().white, fontSize: 14, marginTop: 20, fontWeight: '600'}}>Busca en Filmist.</Text>
              <Text style={{color: colors.getList().white, fontSize: 14, marginTop: 5, fontWeight: '300'}}>Encuentra tu series y películas favoritas.</Text>
          </View>
        )

      }

    }
  }

  _onScrollList = (direction, offset) => {
    if (offset >= 1000) {
      this.refs.scrollTop.scrollTopActive(500);
    } else {
      this.refs.scrollTop.scrollTopDesactive(500);
    }

  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.getList().primary}}>

        <Header
          isTransparent={false}
          title=""
          actions={{ left: { icon: 'arrow-back' }}}
          onActionSelected={this._onActionSelected.bind(this)} />

          <TextInput
            style={styles.searchBtn}
            onChangeText={(query) => this._onSearchChange(query)}
            onSubmitEditing={(search) => this._searchMovie()}
            value={this.state.query}
            placeholder="Busca películas o series"
            autoFocus={false}
            underlineColorAndroid='#FFF'
            selectionColor='#000'
            clearButtonMode={'while-editing'}
            clearTextOnFocus={false}
            keyboardAppearance={'dark'}
            placeholderTextColor="#CCC"
            defaultValue=""
            keyboardType="web-search"
            autoCorrect={false}
            returnKeyType="search" />

            <View style={{position: 'absolute', top: 40, right: 20, paddingHorizontal: 5}}>
              {this.renderClearInputIcon()}
            </View>

            {this.renderResult()}

            <Animatable.View
              ref="scrollTop"
              iterationCount={1}
              useNativeDriver={true}
              style={styles.button}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => { _scrollView.scrollTo({y: 0, x: 0, animated: true}); }}>
                <Text style={{textAlign: 'center'}}>
                  <Icon name='arrow-upward' size={30} color='#FFF' />
                </Text>
              </TouchableOpacity>
            </Animatable.View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: height,
    backgroundColor: '#222',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#222'
  },
  movie: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  item: {
    width: 100,
    height: 100,
    margin: 10,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#444',
  },
  searchBtn: {
    position: 'absolute',
    top: 32,
    left: 55,
    width: width-70,
    backgroundColor: '#FFF',
    height: 40,
    fontSize: 16,
    paddingHorizontal: 20,
    borderRadius: 3
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    opacity: 0,
    elevation: 10,
    backgroundColor: colors.getList().app,
    padding: 10,
    borderRadius: 50
  }
});
