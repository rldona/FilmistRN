import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';

import * as colors from '../colors';

import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class RadioButtonsItem extends Component {

  constructor(props) {
    super(props);
  }

  renderIconName(state) {
    return state ? 'checkbox-marked' : 'checkbox-blank-outline';
  }

  render() {

    const {id, title, state} = this.props;

    return (
      <View style={styles.column}>

        <TouchableOpacity
            onPress={this.props.onSelectOption.bind(this, id)}
            activeOpacity={0.9}
            style={styles.icon}>

          <View style={styles.row}>

            <Text style={styles.optionText}>
              {title}
            </Text>

            <Icon name={this.renderIconName(state)} color={colors.getList().app} size={23} />

          </View>

        </TouchableOpacity>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  column: {
    flexDirection: 'column',
    // paddingHorizontal: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  optionTitle: {
    color: '#FFF',
    fontSize: 16,
    backgroundColor: '#181818',
    marginBottom: 10
  },
  optionText: {
    color: '#EEE',
    fontSize: 14,
  },
});

