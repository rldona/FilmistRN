import React, { Component } from 'react';

import {
  StatusBar,
  Navigator,
  BackAndroid,
  Platform,
  View,
  Alert,
  ToastAndroid,
  NetInfo,
  StyleSheet,
  Dimensions
} from 'react-native';

import configureStore from './redux/store/configureStore';
import {Provider} from 'react-redux';

const store = configureStore();

import * as firebase from 'firebase';
import * as loginService from './services/login-service';
import * as settingsService from './services/settings-service';
import * as moviesService from './services/movies-service';
import * as colors from './common/colors';

import Welcome from './features/welcome';
import Login from './features/login';
import Register from './features/register';
import Remember from './features/remember';
import TabView from './features/tab-view';
import MovieDetail from './features/movie-detail';
import MovieDetailTv from './features/movie-detail-tv';
import TopList from './features/top-list';
import Search from './features/search';
import CustomTransitions from './common/custom-transitions';
import Offline from './common/offline';
import Preload from './features/preload';

import SplashScreen from 'react-native-smart-splash-screen';

const { width, height } = Dimensions.get('window');

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 1,
    };

    loginService.init();

    this.options = settingsService.getOptions();

    // NetInfo.isConnected.addEventListener(
    //   'change',
    //   this.handleFirstConnectivityChange
    // );

    this.navigatorRenderScene = this.navigatorRenderScene.bind(this);

  }

  // handleFirstConnectivityChange(isConnected) {
  //   if(!isConnected) {
  //     moviesService.getNavigator().push({index: 0.5, title: 'offline'});
  //   }
  // }

  componentDidMount () {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 250,
      delay: 250,
    });
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', () => {

        this.options = settingsService.getOptions();

        if (this.state.currentIndex === 0 || this.state.currentIndex === 0.1 || this.state.currentIndex === 0.2 || this.state.currentIndex === 0.3 || this.state.currentIndex > 1) {
          moviesService.getNavigator().pop();
        // } else if (this.state.currentIndex === 0) {
          // BackAndroid.exitApp();
          // return true;
        } else {
          if (!this.options.allowExitApp) {
            Alert.alert(
              'Salir',
              '¿Realmente quieres salir?',
              [
                {text: 'No', onPress: () => { return false }, style: 'cancel' },
                {text: 'Sí', onPress: () => {
                  // loginService.logout().then(() => {
                  //   themoviedb.getNavigator().resetTo({index: 0.1, title: 'login'});
                  // })
                  BackAndroid.exitApp();
                }}
              ]
            );
          } else {
            ToastAndroid.show('Está activo evitar cerrar aplicación', ToastAndroid.SHORT);
            return true;
          }
        }
        return true;
      });
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
  }

  handleBackButton() {
    return false;
  }

  navigatorRenderScene(route, navigator) {
    this.state.currentIndex = route.index;

    moviesService.setCurrentIndex(route.index);
    moviesService.setNavigator(navigator);

    switch (route.index) {
      case 0:
        return <Welcome />
      case 0.1:
        return <Login />
      case 0.2:
        return <Register />
      case 0.3:
        return <Remember />
      // case 0.4:
      //   // se muestra solo la primera vez !!
      //   return <Onboarding />
      case 0.5:
        // se muestra solo la primera vez !!
        return <Offline />
      case 0.6:
        // se muestra solo la primera vez !!
        return <Preload />
      case 1:
        return <TabView />
      case 2:
        return <MovieDetail />
      case 2.1:
        return <MovieDetailTv />
      case 3:
        return <Search />
      case 4:
        return <TopList />
    }
  }

  render() {
    return (
      <View style={styles.container} renderToHardwareTextureAndroid={true}>

        <StatusBar hidden={false} backgroundColor={colors.getList().statusBar} translucent={true} />

        <Provider store={store}>
          <Navigator
            ref="navigator"
            initialRoute={{ index: 0.6 }}
            renderScene={this.navigatorRenderScene}
            configureScene={(route) => {
              if (route.index === 1) {
                return CustomTransitions.NONE;
              } else if (route.index === 0.6) {
                {/*return CustomTransitions.FloatFromBottomAndroidCustom;*/}
                {/*return CustomTransitions.NONE;*/}
                return Navigator.SceneConfigs.FadeAndroid;
              } else {
                return Navigator.SceneConfigs.FloatFromBottomAndroid;
              }
            }}/>
        </Provider>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: colors.getList().primary
  }
});
