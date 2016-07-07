import {
  GET_NAV_SUCCESS
} from '../actions/menu';

const initialState = {
  items: []
}

export default function menu(state = initialState, action = {}) {
  switch (action.type) {
    case GET_NAV_SUCCESS:
      return Object.assign({}, initialState, {
        items: action.payload
      });
    default:
      return state;
  }
}