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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as historialActions from '../../redux/actions/historialActions';

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

class Search extends Component {

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
    Keyboard.dismiss;

    let user = firebase.auth().currentUser;

    themoviedb.setTermHistorial({
      id: Math.random().toString(22).substr(2),
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
      return <IconEvil name='close-o' size={30} color="#444" onPress={this._clearInput.bind(this)} />
    } else {
      return <IconEvil name='close-o' size={30} color='#FFF' />
    }
  }

  showTermsResults(obj) {
    this.setState({
      query: obj.term,
      search: obj.term
    });
  }

  renderMovieList(obj) {
    if(typeof obj !== 'undefined') {
      return (
        <View style={styles.row}>

            <TouchableOpacity
              activeOpacity={0.9}
              style={{width: width}}
              onPress={this.showTermsResults.bind(this, obj)}>
              <Text style={{color: '#FFF', fontSize: 16}}>{obj.term}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={{position: 'absolute', top: 0, right: 0}}
              onPress={() => {
                let user = firebase.auth().currentUser;

                themoviedb.removeTermHistorial(obj.id);

                firebase.database().ref('users/' + user.uid + '/search/terms/').set(
                  themoviedb.getTermHistorial()
                );

                this.setState({
                  termHistorial: ds.cloneWithRows(themoviedb.getTermHistorial())
                });
              }}>
              <IconEvil name="close" size={30} color='#CCC' />
            </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  renderResult() {
    if (this.state.search !== '') {
      return(
        <MoviesListVertical
          title="Buscar"
          type="movie"
          collection="search"
          onScrollList={this._onScrollList.bind(this)}
          query={this.state.search}
          {...this.props} />
      );
    } else {
      if (themoviedb.getTermHistorial().length > 0) {
        return (
          <ScrollView style={{paddingLeft: 20, paddingRight: 15, marginTop: 10}}>

            <ListView
              dataSource={this.state.termHistorial}
              renderRow={(rowData) => this.renderMovieList(rowData)}
              enableEmptySections={true}
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
              <Text style={{color: '#999', fontSize: 15, marginTop: 20, marginBottom: 50}}>Limpiar historial de búsqueda</Text>
            </TouchableOpacity>

          </ScrollView>
        );
      } else {
        return (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={{alignItems: 'center', justifyContent: 'flex-start', marginTop: 30, width: 250}}>
                <IconEvil name="search" size={80} color='#999' />
                <Text style={{color: colors.getList().white, fontSize: 16, marginTop: 20, fontWeight: '600'}}>Busca en Filmist.</Text>
                <Text style={{color: colors.getList().white, fontSize: 14, marginTop: 5, fontWeight: '300', textAlign: 'center'}}>Encuentra series y películas.</Text>
            </View>
          </View>
        );
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
      <View style={{flex: 1, backgroundColor: colors.getList().primary}} renderToHardwareTextureAndroid={true}>

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
    );
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

function mapStateToProps(state, ownProps) {
  return {
     historial: state.historial
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      historial: bindActionCreators(historialActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
