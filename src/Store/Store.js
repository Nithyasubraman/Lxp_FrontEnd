import { combineReducers} from 'redux';
import { createStore } from 'redux';
// import { thunk } from 'redux-thunk'; // Use named import for thunk
import quizReducer from '../reducers/CreateQuizReducer';

// Combine reducers
const rootReducer = combineReducers({
    quiz:quizReducer,
    
});

// Create store with thunk middleware
const store = createStore(
    rootReducer,
    // applyMiddleware(thunk) // Use the imported thunk here
);

export default store;
