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


import * as themoviedb from '../../services/movies-service';

import Header from '../../common/header';
import MoviesListVertical from '../../common/movie-list-vertical';

import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      search: '',
      keyboardTransition: 0,
      heightCompAdd: 0
    };
  }

  componentWillMount() {
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
        alert('right');
        break;
    }
  }

  _searchMovie = () => {
    this.setState({
      search: this.state.query
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

  renderResult() {
    if (this.state.search !== '') {
      return(
        <MoviesListVertical
          title="Buscar"
          type="movie"
          collection="search"
          query={this.state.search} />
      );
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#222'}}>

        <Header
          isTransparent={false}
          title=""
          actions={{ left: { icon: 'arrow-back' }, right: { icon: 'more-vert' } }}
          onActionSelected={this._onActionSelected.bind(this)} />

          <TextInput
            elevation={0}
            style={styles.searchBtn}
            onChangeText={(query) => this._onSearchChange(query)}
            onSubmitEditing={(search) => this._searchMovie()}
            value={this.state.query}
            placeholder="Busca películas o series"
            autoFocus={true}
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

            <View style={{position: 'absolute', top: 40, right: 70, paddingHorizontal: 5, textAlign: 'center'}}>
              {this.renderClearInputIcon()}
            </View>

            {this.renderResult()}

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    flexDirection: 'row',
    height: height,
    backgroundColor: '#222',
    height: height
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#222'
  },
  movie: {
    // height: 50,
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
    // marginHorizontal: 20,
    width: width-110,
    backgroundColor: '#FFF',
    height: 40,
    fontSize: 16,
    paddingHorizontal: 20,
    borderRadius: 3
  }
});

