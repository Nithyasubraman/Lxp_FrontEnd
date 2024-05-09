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
        // case 'SET_NAME_OF_QUIZ':
        //     return { ...state, nameofquiz: action.payload };
        // case 'SET_DURATION':
        //     return { ...state, duration: action.payload };
        // case 'SET_PASSMARK':
        //     return { ...state, passMark: action.payload };
        // case 'SET_ATTEMPTS':
        //     return { ...state, attempts: action.payload };
        // case 'SET_ERROR':
        //     return { ...state, error: action.payload };
        // default:
        //     return state;

            case SET_QUIZ_DETAILS:
                return {
                    ...state,
                    ...action.payload
                };
            default:
                return state;
        }
    };
   
