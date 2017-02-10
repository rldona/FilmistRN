import React, { Component } from 'react';

import {
  ListView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
  InteractionManager
} from 'react-native';

import * as themoviedb from '../../../services/movies-service';

import Loading from '../../../common/loading';
import CategoriesList from '../../../common/categories-list';
import MoviesListHorizontal from '../../../common/movie-list-horizontal';
import Historial from '../../../common/historial';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lang: this.props.lang,
      allData: null,
      allLoaded: false,
      movies: themoviedb.getHistorialList()
    };
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      themoviedb.getAllPopular().then((data) => {
        this.setState({
          allData: data,
          allLoaded: true,
        });
      });
    });
  }

  render() {
    if (!this.state.allLoaded) {
      return (
        <View style={{marginTop: 20}}>
          <Loading />
        </View>
      )
    }

    return (
      <View renderToHardwareTextureAndroid={true}>

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
            title="Próximos estrenos"
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

          <Historial title="Lo último que has buscado" list={this.state.movies} />

          <View style={{paddingVertical: 15}}></View>

        </ScrollView>
      </View>
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
