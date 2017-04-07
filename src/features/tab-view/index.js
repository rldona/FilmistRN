import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';

import * as firebase from 'firebase';

import * as themoviedb from '../../services/movies-service';
import * as colors from '../../common/colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';

import Header from '../../common/header';
import Home from './home';
import Favorites from './favorites';
import Profile from './profile';
import Settings from './settings';

const { width, height } = Dimensions.get('window');

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class App extends Component {

  constructor(props) {
    super(props);

    initTab = 0;

    themoviedb.setCurrentTab({title: 'Filmist'});

    this.state = {
      index: initTab,
      animating: true,
      routes: [
        { key: '1', title: 'Filmist', icon: 'menu' },
        { key: '2', title: 'Favoritos', icon: 'star' },
        { key: '3', title: 'Perfil', icon: 'person' },
        { key: '4', title: 'Settings', icon: 'settings' },
      ]
    };
  }

  _handleChangeTab = (index) => {
    let title;

    // let distance = themoviedb.getLanguageIsChange() ? 0 : 2; // tabs de diferencia para hacer re-render

    switch (index) {
      case 0:
        title = 'Filmist';
        break;
      case 1:
        title = 'Favoritos';
        break;
      case 2:
        title = 'Perfil';
        break;
      case 3:
        title = 'Configuración';
        break;
    }

    themoviedb.setCurrentTab({title: title});

    this.setState({index});
  };

  _renderHeader = (props) => {
    return (
      <TabBarTop
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        renderIcon={this._renderIcon}
        renderLabel={() => null} // not print title
        labelStyle={styles.label}
        {...props}
      />
    );
  };

  _renderScene = ({ route }) => {
    let distance = 3;

    if(Math.abs(this.state.index - this.state.routes.indexOf(route)) > distance) {
      return false;
    }

    switch (route.key) {
      case '1':
        return <Home />
      case '2':
        return <Favorites />
      case '3':
        return <Profile />
      case '4':
        return <Settings />
      default:
        return false;
    }

  };

  _onActionSelected = (action) => {
    switch (action) {
      case 'right':
        themoviedb.getNavigator().push({ index: 3, title: ''})
        break;
    }
  }

  _renderIcon = ({ route }) => {
    return (
      <Icon name={route.icon} size={26} color="#FFF" />
    );
  };

  loginGuard() {
    let user = firebase.auth().currentUser;

    if (!user) {
      return (
        <View style={{width: width, padding: 10, backgroundColor: '#222'}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => { themoviedb.getNavigator().push({ index: 0, title: 'welcome'}); }}>
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', width: width, backgroundColor: '#ef4358', padding: 20}}>
              <Icon name="vpn-key" size={26} color="#FFF" style={{marginRight: 10}} />
              <Text style={{color: '#FFF', fontWeight: '600', fontSize: 14, textAlign: 'center', marginRight: 15}}>Iniciar sesión</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (

      <View style={styles.container} renderToHardwareTextureAndroid={true}>

        <Header
          title={themoviedb.getCurrentTab().title}
          isTransparent={false}
          actions={{ right: { icon: 'search' } }}
          onActionSelected={this._onActionSelected.bind(this)} />

        <TabViewAnimated
          style={[ styles.container, this.props.style ]}
          navigationState={this.state}
          initialLayout={initialLayout}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab} />

        { this.loginGuard() }

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: colors.getList().app,
    elevation: 5
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    borderWidth: 1,
    borderColor: '#FFF'
  },
  label: {
    color: '#fff',
    fontWeight: '400'
  }
});
