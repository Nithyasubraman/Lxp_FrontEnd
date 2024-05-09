// reducers/index.js
// import { combineReducers} from 'react-redux';
// import quizReducer from './CreateQuizReducer';
import { combineReducers } from 'redux';
import quizReducer from './CreateQuizReducer';

const root = combineReducers({
  // quiz:rootReducer
  quiz:quizReducer,
  // // ... other reducers ...
});

export default root;
