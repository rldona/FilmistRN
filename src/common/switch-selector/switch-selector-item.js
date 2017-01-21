import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';

import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/MaterialIcons';

const checkIcon = (<Icon name="radio-button-checked" size={25} color="#FFF" />)
const uncheckIcon = (<Icon name="radio-button-unchecked" size={25} color="#FFF" />)

export default class SwitchSelectorItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <View style={styles.column}>

          <View style={styles.row}>

            <Text style={styles.optionText}>
              {this.props.title}
            </Text>

            <TouchableOpacity
              onPress={this.props.onSelectOption.bind(this, this.props.id)}
              activeOpacity={0.9}
              style={styles.icon}>

              <Text style={{color: '#FFF'}}>{ this.props.state ? 'true' : 'false' }</Text>

            </TouchableOpacity>

          </View>

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
    fontSize: 15,
    backgroundColor: '#181818',
    marginBottom: 10
  },
  optionText: {
    color: '#CCC',
  },
});

