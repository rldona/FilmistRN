import * as types from './actionsTypes';

// historial
export const addHistorial = historial => ({ type: types.ADD_HISTORIAL, historial });
export const removeHistorial = (historial) => ({ type: types.REMOVE_HISTORIAL, historial });
