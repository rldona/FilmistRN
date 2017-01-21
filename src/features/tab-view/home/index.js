import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';

import * as themoviedb from '../../../services/movies-service';

import Loading from '../../../common/loading';
import CategoriesList from '../../../common/categories-list';
import MoviesListHorizontal from '../../../common/movie-list-horizontal';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allData: null,
      allLoaded: false
    };
  }

  componentWillMount() {

    themoviedb.getAllPopular().then((data) => {
      this.setState({
        allData: data,
        allLoaded: true
      });

    });
  }

  render() {
    if (!this.state.allLoaded) {
      return <Loading />
    }

    return (
      <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          // onScroll={() => { console.log('onScroll!'); }}
          style={styles.containerLists}>

        <CategoriesList {...this.props} />

        <MoviesListHorizontal
          title="Ahora en los cines"
          type="movie"
          list={ds.cloneWithRows(this.state.allData[0].results)}
          collection="now_playing"
          position="horizontal"
          {...this.props} />

        <MoviesListHorizontal
          title="Próximos extrenos"
          type="movie"
          list={ds.cloneWithRows(this.state.allData[1].results)}
          collection="upcoming"
          position="horizontal"
          {...this.props} />

        <MoviesListHorizontal
          title="Películas recomendadas"
          type="movie"
          list={ds.cloneWithRows(this.state.allData[2].results)}
          collection="popular"
          position="horizontal"
          {...this.props} />

        <MoviesListHorizontal
          title="Películas mejor valoradas"
          type="movie"
          list={ds.cloneWithRows(this.state.allData[3].results)}
          collection="top_rated"
          position="horizontal"
          {...this.props} />

          <View style={{paddingVertical: 20}}></View>

      </ScrollView>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerLists: {
    paddingTop: 10
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
});
