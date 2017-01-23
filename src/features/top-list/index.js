import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  InteractionManager
} from 'react-native';

import * as themoviedb from '../../services/movies-service';
import * as colors from '../../common/colors';
import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '../../common/header';
import MoviesListVertical from '../../common/movie-list-vertical';

const { width, height } = Dimensions.get('window');

export default class TopList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: themoviedb.getCurrentTitle(),
      type: themoviedb.getCurrentType(),
      collection: themoviedb.getCurrentCollection()
    };
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

  render() {
    return (
      <View style={styles.container}>

        <Header
          isTransparent={false}
          title={this.state.title}
          actions={{ left: { icon: 'arrow-back' } }}
          onActionSelected={this._onActionSelected.bind(this)} />

        <MoviesListVertical
          title={this.state.title}
          type={this.state.type}
          collection={this.state.collection}
          {...this.props} />

        <Animatable.View
          animation="bounceInUp"
          delay={1000}
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
    flex: 1,
    height: height,
    backgroundColor: colors.getList().primary,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    elevation: 10,
    backgroundColor: colors.getList().app, // #E91E63 4CAF50
    // width: 60,
    padding: 10,
    borderRadius: 50
  }
});
