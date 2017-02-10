import React, { Component } from 'react';

import {
  StatusBar,
  Navigator,
  BackAndroid,
  Platform,
  View,
  AsyncStorage,
  Alert,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

import * as userService from './services/user-service';
import * as loginService from './services/login-service';
import * as themoviedb from './services/movies-service';
import * as colors from './common/colors';

import Welcome from './features/welcome';
import Login from './features/login';
import Register from './features/register';
import Remember from './features/remember';
import TabView from './features/tab-view';
import MovieDetail from './features/movie-detail';
import TopList from './features/top-list';
import Search from './features/search';

import CustomTransitions from './common/custom-transitions';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 1,
    };

    // AsyncStorage.setItem('ping', 'pong !');

    // AsyncStorage.getItem('imageProfile').then((item) => {
    //   console.log(item);
    // });

    // AsyncStorage.removeItem('ping');

    // AsyncStorage.clear();

    // AsyncStorage.getAllKeys().then((data) => {
    //   console.log(data);
    //   AsyncStorage.getItem('users').then((users) => {
    //     console.log(JSON.parse(users));
    //   });
    // });

  }

  componentWillMount() {

    loginService.init();
    themoviedb.init();

    // let allowBackAndroid = 1; // TODO: alamacenar en el servicio. Una vez logado cambiar a 1

    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', () => {

        //let allowExitApp = themoviedb.getAllowExitApp();

        if (this.state.currentIndex === 0.1 || this.state.currentIndex === 0.2 || this.state.currentIndex === 0.3 || this.state.currentIndex > 1) {
          themoviedb.getNavigator().pop();
        } else {
          // Alert.alert(
          //   'Salir',
          //   '¿Realmente quieres salir?',
          //   [
          //     {text: 'No', onPress: () => { return false }, style: 'cancel' },
          //     {text: 'Sí', onPress: () => BackAndroid.exitApp() }
          //   ]
          // );
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

    themoviedb.setNavigator(navigator);

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
      case 1:
        return <TabView />
      case 2:
        return <MovieDetail />
      case 3:
        return <Search />
      case 4:
        return <TopList />
    }
  }

  render() {
    let initScene = 0; // cambiar a 1 cuando el usuario haya hecho login. Almacenar en el servicio de login.

    return (
      <View style={styles.container} renderToHardwareTextureAndroid={true}>

        <StatusBar hidden={false} backgroundColor={colors.getList().statusBar} translucent={true} />

        <Navigator
          ref="navigator"
          initialRoute={{ index: initScene }}
          renderScene={this.navigatorRenderScene.bind(this)}
          configureScene={(route) => {

            // return CustomTransitions.NONE;

            if (route.index === 0 || route.index === 1) {
              return CustomTransitions.NONE;
            } else {
              return Navigator.SceneConfigs.FloatFromBottomAndroid;
              // return CustomTransitions.FloatFromBottomAndroidCustom;
            }

          }}/>

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
