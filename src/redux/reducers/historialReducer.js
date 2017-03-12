import * as types from '../actions/actionsTypes';

export default function historialReducer(state = [], action) {

  filmIsRepeated = (element) => {
    if (element.name) {
      return element.name === action.historial.name;
    }
    return element.title === action.historial.title;
  }

  switch (action.type) {
    case types.ADD_HISTORIAL:
      if (typeof state.find(this.filmIsRepeated) === 'undefined') {
        return [
          ...state,
          Object.assign({}, action.historial)
        ];
      }
      return state;
    case types.REMOVE_HISTORIAL:
      return [];
    default:
      return state;
  }
}

