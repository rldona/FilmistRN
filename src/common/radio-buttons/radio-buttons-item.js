import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';

import * as colors from '../colors';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class RadioButtonsItem extends Component {

  constructor(props) {
    super(props);
  }

  renderIconName(state) {
    if (state) {
      return <Icon name='radiobox-marked' color={colors.getList().app} size={20} />
    } else {
      return <Icon name='radiobox-blank' color="#FFF" size={20} />
    }
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

            {this.renderIconName(state)}

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
