import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

import * as themoviedb from '../../services/movies-service';

import Loading from '../../common/loading';
import Header from '../../common/header';

const { width, height } = Dimensions.get('window');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Movie extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.movie}>
        <TouchableOpacity onPress={() => alert(this.props.value.id)}>
          <Text style={styles.item}>
            {this.props.value.poster_path}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      loaded: false
    };
  }

  groupItems(items, itemsPerRow) {
    var itemsGroups = [];
    var group = [];

    items.forEach(function(item) {
      if (group.length === itemsPerRow) {
        itemsGroups.push(group);
        group = [item];
      } else {
        group.push(item);
      }
    });

    if (group.length > 0) {
      itemsGroups.push(group);
    }

    return itemsGroups;
  }

  componentDidMount() {
    // let data = [];

    // for(let i = 0; i < 100; i++) {
    //   data.push({ id: i })
    // }

    // let groups = this.groupItems(data, 3);

    // this.setState({
    //   dataList: ds.cloneWithRows(groups),
    //   loaded: true
    // });

    this.loadPopularMovies();

  }

  loadPopularMovies() {
    themoviedb.getPopular('movie', 'upcoming').then((data) => {
      let groups = this.groupItems(data, 3);
      this.setState({
        dataList: ds.cloneWithRows(groups),
        loaded: true
      });
    });
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

  _renderRow(list) {
    let comps = [];

    for (let i = 0; i < list.length; i++) {
      comps.push(<Movie key={i} value={list[i]} />);
    }

    return (
      <View style={styles.group}>
        {comps}
      </View>
    );
  }

  _renderList() {
    if (this.state.loaded) {

      return (
        <View>

          <Header
            isTransparent={false}
            title="Buscar"
            actions={{ left: { icon: 'arrow-back' }, right: { icon: 'more-vert' } }}
            onActionSelected={this._onActionSelected.bind(this)} />

          <ListView
            dataSource={this.state.dataList}
            renderHeader={this._renderHeader}
            renderRow={(rowData) => this._renderRow(rowData)}
            horizontal={false}
            enableEmptySections={true}
          />

        </View>
      )

    } else {

      return (
        <View>

         <Header
            isTransparent={false}
            actions={{ left: { icon: 'arrow-back' }, right: { icon: 'more-vert' } }}
            onActionSelected={this._onActionSelected.bind(this)} />

          <Loading />

        </View>
      )

    }
  }

  render() {
    return (
      <View>
        { this._renderList() }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    flexDirection: 'row',
    height: height,
    backgroundColor: '#222'
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#222'
  },
  movie: {
    // height: 50,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  item: {
    width: 100,
    height: 100,
    margin: 10,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#444',

  }
});

