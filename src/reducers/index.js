import { combineReducers } from 'redux';

// import reducers here
import tictactoe from "./TicTacToeReducer";

// this variable combines all reducers so the app can read the reducers
const rootReducer = combineReducers({
  // put reducers here
  tictactoe
});

export default rootReducer;
