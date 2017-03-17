import React, { Component } from 'react';

import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Share,
  InteractionManager
} from 'react-native';

import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as historialActions from '../../redux/actions/historialActions';

import * as userService from '../../services/user-service';
import * as themoviedb from '../../services/movies-service';
import * as colors from '../../common/colors';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../common/header';
import Loading from '../../common/loading';
import Score from '../../common/score';
import SwitchLists from '../../common/switch-lists';

import MoviesListHorizontal from '../../common/movie-list-horizontal';

const { width, height } = Dimensions.get('window');

class MovieDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // movie: null,
      // loaded: false,
      movie: themoviedb.getCurrentMovie(),
      loaded: true,
      cast: {
        director: '-',
        writer: '-',
        actors: []
      },
      overviewNumberLines: 2
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {

      themoviedb.getMovie('movie', themoviedb.getCurrentMovie().id).then((data) => {
        data.runtime = data.runtime === 0 ? 90 : data.runtime;
        this.setState({
          movie: data,
          loaded: true
        });
      });

      themoviedb.getCredits('movie', themoviedb.getCurrentMovie().id).then((data) => {
        let cast = {
          director: data.crew[0].name,
          writer: data.crew[1].name,
          actors: [data.cast[0].name, data.cast[1].name, data.cast[2].name, data.cast[3].name, data.cast[4].name]
        };

        for (let i = 0; i < data.crew.length; i++) {
          if (data.crew[i].job === 'Director') {
            cast.director = data.crew[i].name;
          }
          if (data.crew[i].job === 'Novel') {
            cast.writer= data.crew[i].name;
          }
        }

        this.setState({cast: cast});

      }).catch((error) => {
        console.log(error);
      });

    });
  }

  _onActionSelected = (action) => {
    switch (action) {
      case 'left':
        themoviedb.getNavigator().pop();
        break;
      case 'right':
        this.share();
        break;
    }
  }

  share() {
    Share.share({
      message: 'Te recomiendo esta película: https://filmist.es/movies/' + this.state.movie.id
    })
    .then(() => console.log('ok'))
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

  _onExtendOverview = () => {
    if (this.state.overviewNumberLines <= 2) {
      this.setState({overviewNumberLines: 100});
    } else {
      this.setState({overviewNumberLines: 2});
    }

  }

  _renderMoreLinesText = () => {
    if (this.state.overviewNumberLines <= 2) {
      return 'LEER MÁS';
    } else {
      return 'LEER MENOS';
    }
  }

  _renderMoreLinesIcon = () => {
    if (this.state.overviewNumberLines <= 2) {
      return 'expand-more';
    } else {
      return 'expand-less';
    }
  }

  renderInfoPlus() {
    if (this.state.cast.actors.length === 0) {
      return (
        <View style={{paddingHorizontal: 15, paddingVertical: 15, backgroundColor: colors.getList().secondary}}>

          <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 30}}>

            <View>
              <Text style={{fontSize: 15, color: "#FFF", marginBottom: 10, fontWeight: '400', backgroundColor: '#444', paddingVertical: 5, width: 150}}></Text>
              <Text style={{fontSize: 12, color: "#CCC", marginBottom: 0, fontWeight: '400', backgroundColor: '#444', paddingVertical: 5, width: width - 50}}></Text>
            </View>

          </View>

          <View>
            <Text style={{fontSize: 15, color: "#FFF", marginBottom: 10, fontWeight: '400', backgroundColor: '#444', paddingVertical: 5, width: 150}}></Text>
            <Text style={{fontSize: 12, color: "#CCC", marginBottom: 0, fontWeight: '400', backgroundColor: '#444', paddingVertical: 5, width: width - 50}}></Text>
          </View>

        </View>
      );
    }

    return (
        <View style={{paddingHorizontal: 15, paddingVertical: 15, backgroundColor: colors.getList().secondary}}>

          <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10}}>

            <View>
              <Text style={{fontSize: 12, color: "#AAA", marginBottom: 3, fontWeight: '400'}}>Director</Text>
              <Text style={{fontSize: 14, color: "#FFF", marginBottom: 8, fontWeight: '400', textAlign: 'center'}}>{this.state.cast.director}</Text>
            </View>

            <View style={{minWidth: 40}}>
              <Text style={{fontSize: 12, color: "#AAA", marginBottom: 3, fontWeight: '400'}}>Año</Text>
              <Text style={{fontSize: 14, color: "#FFF", marginBottom: 0, fontWeight: '400'}}>{this.state.movie.release_date.split('-')[0]}</Text>
            </View>

            <View style={{minWidth: 80}}>
              <Text style={{fontSize: 12, color: "#AAA", marginBottom: 3, fontWeight: '400', textAlign: 'center'}}>Duración</Text>
              <Text style={{fontSize: 14, color: "#FFF", marginBottom: 8, fontWeight: '400', textAlign: 'center'}}>{this.state.movie.runtime} min</Text>
            </View>

          </View>

          <View>
            <Text style={{fontSize: 12, color: "#AAA", marginBottom: 3, fontWeight: '400'}}>Reparto</Text>
            <Text style={{fontSize: 14, color: "#FFF", marginBottom: 0, fontWeight: '400'}}>{this.state.cast.actors[0]}, {this.state.cast.actors[1]}, {this.state.cast.actors[2]}, {this.state.cast.actors[3]}, {this.state.cast.actors[4]}</Text>
          </View>

        </View>
    )
  }

  render() {

    if (!this.state.loaded) {
      return (
        <View style={{backgroundColor: colors.getList().primary, height: height}}>

          <View style={{backgroundColor: colors.getList().secondary, height: 190}}>
            <Header
              isTransparent={true}
              title=""
              actions={{ left: { icon: 'arrow-back' }, right: { icon: 'share' } }}
              onActionSelected={this._onActionSelected.bind(this)} />
          </View>

          <View style={{position: 'absolute', top: 130, left: 15, width: 110, height: 150}}>
            <View style={{width: 110, height: 150, backgroundColor: '#111', borderRadius: 3, borderWidth: 1, borderColor: '#111', backfaceVisibility: 'hidden'}}></View>
          </View>

          <View style={{padding: 0, marginTop: 60}}>

            <View style={styles.infoContainer}>
              <Text style={styles.infoItemFake}><Icon name='thumb-up' /> 0</Text>
              <Text style={styles.infoItemFake}><Icon name='favorite' /> 0</Text>
              <Text style={styles.infoItemFake}><Icon name='timelapse' /> 0</Text>
            </View>

            <View style={{padding: 15}}>
              <View style={{marginVertical: 10, marginBottom: 20}}>
                <Text style={{width: width-200, height: 20, backgroundColor: '#222'}}></Text>
              </View>
              <View>
                <Text style={{width: width-150, height: 20, backgroundColor: colors.getList().secondary, marginBottom: 10}}></Text>
                <Text style={{width: width-40, height: 20, backgroundColor: colors.getList().secondary, marginBottom: 10}}></Text>
                <Text style={{width: width-40, height: 20, backgroundColor: colors.getList().secondary, marginBottom: 10}}></Text>
                <Text style={{width: width-40, height: 20, backgroundColor: colors.getList().secondary, marginBottom: 10}}></Text>
              </View>
            </View>
            <View style={{height: height, backgroundColor: '#000', paddingHorizontal: 15, paddingVertical: 20}}>
              <Text style={{width: width-150, height: 20, backgroundColor: '#111', marginBottom: 10}}></Text>
              <Text style={{width: width-150, height: 20, backgroundColor: '#111', marginBottom: 10}}></Text>
              <Text style={{width: width-150, height: 20, backgroundColor: '#111', marginBottom: 10}}></Text>
              <Text style={{width: width-150, height: 20, backgroundColor: '#111', marginBottom: 10}}></Text>
            </View>
          </View>

        </View>
      );
    }

    return (

      <ScrollView
        renderToHardwareTextureAndroid={true}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.getList().primary, height: height }}>

        <View>

          <Image
            resizeMode={'cover'}
            style={{height: 190, backfaceVisibility: 'hidden', borderBottomWidth: 0, borderColor: colors.getList().app}}
            source={{uri: 'http://image.tmdb.org/t/p/w500' + this.state.movie.backdrop_path}}>
            <View style={{position: 'absolute', top: 0, left:0 , width: width, height: 190, backgroundColor: 'rgba(0, 0, 0, 0.25)'}}></View>
            <Header
              isTransparent={true}
              title=""
              actions={{ left: { icon: 'arrow-back' }, right: { icon: 'share' } }}
              onActionSelected={this._onActionSelected.bind(this)} />
          </Image>

        </View>

        <View style={{padding: 0, marginTop: 0}}>

          <View style={{paddingHorizontal: 15, paddingBottom: 10, marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#FFF', marginBottom: 2}}>
              {this.state.movie.title}
            </Text>

            <View style={{marginTop: 5, paddingBottom: 0}}>
              <Score score={this.state.movie.vote_average} />
            </View>

            <Text
              numberOfLines={this.state.overviewNumberLines}
              style={{fontSize: 15, lineHeight: 26, fontWeight: '300', color: '#FFF', marginTop: 0, marginBottom: 0, textAlign: 'auto' }}>
              {this.state.movie.overview ? this.state.movie.overview : 'Sinopsis no disponible'}
            </Text>

            <View style={{paddingVertical: 5}}></View>

            {
              this.state.movie.overview ?
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 0}}
                  onPress={this._onExtendOverview}
                  activeOpacity={0.9}>
                  <Text style={{textAlign: 'center', color: '#666', fontSize: 12}}>
                    {this._renderMoreLinesText()}
                  </Text>
                  <Icon color="#666" name={this._renderMoreLinesIcon()} style={{fontSize: 25}} />
                </TouchableOpacity> : null
            }

          </View>

        </View>

        <SwitchLists movie={this.state.movie} />

        {this.renderInfoPlus()}

        <MoviesListHorizontal
          title="Descubre del mismo género"
          type="movie"
          collection="similar"
          position="horizontal"
          {...this.props} />

        <View style={{paddingVertical: 10}}></View>

      </ScrollView>

    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgFake: {
    height: 220,
  },
  button: {
    backgroundColor: '#AAA',
    padding: 20
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    position: 'absolute',
    top: -48,
    left: 140,
  },
  infoItem: {
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: colors.getList().secondary,
    padding: 10,
    color: '#FFF',
    minWidth: 60,
    textAlign: 'center',
    marginRight: 10,
    borderRadius: 3
  },
  infoItemFake: {
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: colors.getList().secondary,
    padding: 10,
    color: colors.getList().secondary,
    minWidth: 60,
    textAlign: 'center',
    marginRight: 10,
    borderRadius: 3
  },
  extendInfo: {
    elevation: 10,
    backgroundColor: '#171717',
    padding: 15,
    marginBottom: 10
  },
  extendInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 5
  },
  extendInfoTitle: {
    color: '#999',
    minWidth: 130
  },
  extendInfoText: {
    color: '#FFF'
  }
});

function mapStateToProps(state, ownProps) {
  return {
     historial: state.historial
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      historial: bindActionCreators(historialActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
