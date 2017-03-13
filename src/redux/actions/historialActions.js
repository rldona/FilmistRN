import * as types from './types/historial';

// HISTORIAL ACTIONS

export const add   = movie => ({ type: types.ADD, movie });
export const clear = list  => ({ type: types.CLEAR, list });
