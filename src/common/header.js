import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

import * as colors from '../common/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default class Header extends Component {

  constructor(props) {
    super(props);
  }

  headerDynamicStyle = () => {
    return {
      width: width,
      paddingTop: 24,
      backgroundColor: this.props.isTransparent ? 'rgba(0, 0, 0, 0)' : colors.getList().app
    }
  }

  renderHeader() {

    if (this.props.actions.left && this.props.actions.right) {

      return (
        <View style={this.headerDynamicStyle()}>
          <View style={styles.navbar}>

            <TouchableOpacity onPress={this.props.onActionSelected.bind(this, 'left')} activeOpacity={0.9} style={styles.icon}>
              <Icon name={this.props.actions.left.icon} size={27} color="#FFF" />
            </TouchableOpacity>

            <Text style={styles.title}>{this.props.title}</Text>

            <TouchableOpacity onPress={this.props.onActionSelected.bind(this, 'right')} activeOpacity={0.9} style={styles.icon}>
              <Icon name={this.props.actions.right.icon} size={27} color="#FFF" />
            </TouchableOpacity>

          </View>
        </View>
      )

    } else if(this.props.actions.left && !this.props.actions.right) {

      return (
        <View style={this.headerDynamicStyle()}>
          <View style={styles.navbar}>

            <TouchableOpacity onPress={this.props.onActionSelected.bind(this, 'left')} activeOpacity={0.9} style={styles.icon}>
              <Icon name={this.props.actions.left.icon} size={27} color="#FFF" />
            </TouchableOpacity>

            <Text style={styles.title}>{this.props.title}</Text>

            <TouchableOpacity activeOpacity={0.9} style={styles.icon}>

            </TouchableOpacity>

          </View>
        </View>
      )

    } else if(!this.props.actions.left && this.props.actions.right) {

      return (
        <View style={this.headerDynamicStyle()}>
          <View style={styles.navbar}>

            <Text style={styles.titleApp}>{this.props.title}</Text>

            <TouchableOpacity onPress={this.props.onActionSelected.bind(this, 'right')} activeOpacity={0.9} style={[styles.icon, styles.right]}>
              <Icon name={this.props.actions.right.icon} size={27} color="#FFF" />
            </TouchableOpacity>

          </View>
        </View>
      )

    } else {

      return (
        <View style={this.headerDynamicStyle()}>
          <View style={styles.navbar}>

            <Text style={styles.title}>{this.props.title}</Text>

          </View>
        </View>
      )

    }

  }

  render() {
    return (
      <View>
        { this.renderHeader() }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
  },
  titleApp: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
    textAlign: 'left',
  },
  icon: {
    paddingHorizontal: 5,
  },
  left: {
    marginRight: 20
  },
  right: {
    position: 'absolute',
    right: 10,
    top: 15
  },
  navbarContanier: {
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 56,
    width: width
  },
});
