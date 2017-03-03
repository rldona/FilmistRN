import React, { Component } from 'react';

import {
  View,
  ListView,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import * as themoviedb from '../services/movies-service';

var categories = [
  {
    id: 0,
    name: 'Buscar'
  },
  {
    id: 4,
    name: 'Estrenos'
  },
  {
    id: 5,
    name: 'Próximamente'
  },
  {
    id: 6,
    name: 'Popular'
  },
  {
    id: 7,
    name: 'Top'
  }
];

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class CategoriesList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataCategories: ds.cloneWithRows(categories)
    };
  }

  // themoviedb.getNavigator().push({ index: 4, route: 'top-list', title: this.props.title, type: this.props.type, collection: this.props.collection })}

  _loadCategorie(categorie) {
    switch (categorie.id) {
      case 0:
        themoviedb.getNavigator().push({ index: 3, route: 'search' });
        break;
      case 4:
        themoviedb.setCurrentTitle('Estrenos de cartelera');
        themoviedb.setCurrentCollection('now_playing');
        themoviedb.getNavigator().push({ index: 4, route: 'top-list'});
        break;
      case 5:
        themoviedb.setCurrentTitle('Próximos estrenos');
        themoviedb.setCurrentCollection('upcoming');
        themoviedb.getNavigator().push({ index: 4, route: 'top-list'});
        break;
      case 6:
        themoviedb.setCurrentTitle('Películas recomendadas');
        themoviedb.setCurrentCollection('popular');
        themoviedb.getNavigator().push({ index: 4, route: 'top-list'});
        break;
      case 7:
        themoviedb.setCurrentTitle('Películas mejor valoradas');
        themoviedb.setCurrentCollection('top_rated');
        themoviedb.getNavigator().push({ index: 4, route: 'top-list'});
        break;
    }

  }

  categoriesRender(categorie) {
    return(
      <View
        style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>

        <TouchableOpacity
          onPress={() => this._loadCategorie(categorie)}
          activeOpacity={0.9}>
          <Text style={styles.categorie}>{categorie.name.toUpperCase()}</Text>
        </TouchableOpacity>

      </View>
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataCategories}
        renderRow={(rowData) => this.categoriesRender(rowData)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

var styles = StyleSheet.create({

  categorie: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    marginHorizontal: 0,
    marginTop: 5,
    fontWeight: '600',
    marginBottom: 10,
    borderRadius: 3,
    backgroundColor: '#222326',
    color: '#FFF',
    fontSize: 13,
    minWidth: 120,
    textAlign: 'center'
  }

});
