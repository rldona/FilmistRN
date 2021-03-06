import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as historialActions from '../../redux/actions/historialActions';

import * as themoviedb from '../../services/movies-service';
import * as colors from '../../common/colors';
import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '../../common/header';
import MoviesListVertical from '../../common/movie-list-vertical';

const { width, height } = Dimensions.get('window');

class TopList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: themoviedb.getCurrentTitle(),
      type: themoviedb.getCurrentType(),
      collection: themoviedb.getCurrentCollection(),
      up: false,
      down: false
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

  _onActionSelected = (action) => {
    switch (action) {
      case 'left':
        themoviedb.getNavigator().pop();
        break;
      case 'right':
        break;
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
      <View style={styles.container} renderToHardwareTextureAndroid={true}>

        <Header
          isTransparent={false}
          title={this.state.title}
          actions={{ left: { icon: 'arrow-back' } }}
          onActionSelected={this._onActionSelected.bind(this)} />

        <MoviesListVertical
          title={this.state.title}
          type={this.state.type}
          collection={this.state.collection}
          onScrollList={this._onScrollList.bind(this)}
          {...this.props} />

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
    flex: 1,
    height: height,
    backgroundColor: colors.getList().primary,
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

export default connect(mapStateToProps, mapDispatchToProps)(TopList);
