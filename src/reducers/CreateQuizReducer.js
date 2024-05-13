// reducers/CreateQuizReducer.js
import { SET_QUIZ_DETAILS } from "../actions/CreateQuizAction";

const initialState = {
    
    nameofquiz: '',
    duration: '',
    passMark: '',
    attempts: '',
    error: '',
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {

            case SET_QUIZ_DETAILS:
                return {
                    ...state,
                    ...action.payload
                };
            default:
                return state;
        }
    };
   
