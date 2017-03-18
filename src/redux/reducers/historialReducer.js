import * as types from '../actions/types/historial';

export default function historialReducer(state = [], action) {

  filmIsRepeated = (element) => {
    return element.id === action.movie.id;
  }

  switch (action.type) {
    case types.ADD:
      if (typeof state.find(this.filmIsRepeated) === 'undefined') {
        return [
          ...state,
          Object.assign({}, action.movie)
        ];
      }
      return state;
    case types.CLEAR:
      return [];
    default:
      return state;
  }
}

