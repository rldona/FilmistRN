import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import * as colors from '../../common/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Checkbox extends Component {

  constructor(props) {
    super(props);
  }

  renderIconCheck(checked) {
    if (checked) {
      return <Icon name='check-box' color={colors.getList().app} size={23} />
    } else {
      return <Icon name='check-box-outline-blank' color="#FFF" size={23} />
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={1}
        onPress={this.props.onChange.bind(this, !this.props.checked)}>
        <Text style={{color: '#FFF'}}>{this.props.checked ? 'Habilitado' : 'Deshabilitado'}</Text>
        {this.renderIconCheck(this.props.checked)}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});