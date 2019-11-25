import { combineReducers, createStore } from "redux";

//Action Creator
/**
 * state = {
 *  dropdown: {isOpen: true|false}
 *
 * }
 *
 * action = {
 *   type: string,
 *   payload: {isOpen: Boolean},
 * }
 */

export const handleDropdown = bool => ({
  type: "OPEN_DROPDOWN",
  payload: {
    isOpen:bool
  }
});

// Reducer
export function dropdownReducer(state = {isOpen:false}, action) {
  switch (action.type) {
    case "OPEN_DROPDOWN":
      return {isOpen: action.payload.isOpen};
    default:
      return state;
  }
}

const reducer = combineReducers({
  dropdown: dropdownReducer
});

export const initStore = (initialState) => {
  return createStore(
    reducer,
    initialState,
  )
}