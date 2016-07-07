import {
  GET_SIDEBAR_SUCCESS
} from '../actions/menu';

const initialState = {
  items: []
}

export default function sidebar(state = initialState, action = {}) {
  switch (action.type) {
    case GET_SIDEBAR_SUCCESS:
      return Object.assign({}, initialState, {
        items: action.payload
      });
    default:
      return state;
  }
}