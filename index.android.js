/* @flow */

import React, { Component } from 'react';
import { AppRegistry, StatusBar, ListView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ReactNativeTabViewSeed extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'First', icon: 'directions-boat' },
        { key: '2', title: 'Second', icon: 'favorite-border' },
        { key: '3', title: 'Third', icon: 'alarm' },
        { key: '4', title: 'Fourth', icon: 'backup' },
      ],
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }

  _handleChangeTab = (index) => { console.log(index);
    this.setState({
      index,
    });
  };

  _renderHeader = (props) => {
    return (
      <TabBarTop
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        renderIcon={this._renderIcon}
        renderLabel={() => null} // not print title
        labelStyle={styles.label}
      />
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return (
        <View style={{flex: 1}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {
              return (
                <Text style={{ padding: 20, margin: 10, backgroundColor: '#EEE' }}>{rowData}</Text>
              )
            }}
          />
        </View>
      );
    case '2':
      return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
    case '3':
      return <View style={[ styles.page, { backgroundColor: '#8bc34a' } ]} />;
    case '4':
      return <View style={[ styles.page, { backgroundColor: '#2196f3' } ]} />;
    default:
      return null;
    }
  };

  _renderIcon = ({ route }) => {
    return (
      <Icon name={route.icon} size={25} color="#FFF" />
    );
  };

  render() {
    return (

      <View style={styles.container}>

        <StatusBar hidden={false} backgroundColor={'rgba(0, 0, 0, 0.2)'} translucent={true} />

        <View style={styles.navbarContanier}>
          <View style={styles.navbar}>
            <TouchableOpacity onPress={this.props.onPressButtonLeft} activeOpacity={0.8} style={styles.icon}>
            </TouchableOpacity>
            <Text style={styles.title}>App Name</Text>
            <TouchableOpacity onPress={this.props.onPressButtonRight} activeOpacity={0.8} style={styles.icon}>
            </TouchableOpacity>
          </View>
        </View>

        <TabViewAnimated
          style={[ styles.container, this.props.style ]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
        />

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#4CAF50',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    borderWidth: 1,
    borderColor: '#FFF'
  },
  label: {
    color: '#fff',
    fontWeight: '400',
  },
  title: {
    color: '#FFF',
    fontSize: 18
  },
  navbarContanier: {
    paddingTop: 24,
    backgroundColor: '#4CAF50'
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 56,
  },
});

AppRegistry.registerComponent('ReactNativeTabViewSeed', () => ReactNativeTabViewSeed);
