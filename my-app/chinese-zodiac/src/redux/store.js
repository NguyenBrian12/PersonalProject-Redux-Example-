import { createStore } from "redux";
// reducer- take the previous state, take an "action", combine those two things to produce a new state
function reducer(state, action) {
  //if this is a brand new store, return initial state
  console.log(state);
  if (!state) {
    return {
      // user: localStorage.user ? JSON.parse(localStorage.user) : null
      user: null
    };
  }
  //if we get this far it meants we already had a previous state so we need to look at the action and use it to make the new state
  //action will look like this:
  //{ type: 'SET_USER', user:'Dan'}
  if (action.type === "SET_USER") {
    // localStorage.user = action.user;
    return {
      ...state,
      user: action.user
    };
  }
}
export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
