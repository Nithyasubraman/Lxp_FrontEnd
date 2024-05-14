import axios from 'axios';
import { useState } from 'react';
import { fetchQuizByIdSuccess, fetchQuizByIdRequest } from '../actions/CreateQuizAction';

const createquiz = async (quizDetails) => {
  try {
    console.log("details", quizDetails);
    const response = await axios.post('https://localhost:7005/api/Quiz', quizDetails);
  } catch (error) {
    console.error("Error:", error.message);
    throw error.message;
  }
};

export const GetQuizDetails = async() =>{
  try {
    const response = await axios.get('https://localhost:7005/api/Quiz/d9f26cf2-31ba-43ea-a70f-0dd6d38f490a');
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error.message;
  }
}

// export const getQuizById = () => async dispatch => {
//   dispatch(fetchQuizByIdRequest());
//   try {
//     const response = await axios.get('https://localhost:7005/api/Quiz/e256e8d7-2dc7-4bc9-a4c4-9eea0d3733b6');
//     dispatch(fetchQuizByIdSuccess(response.data));
//     console.log("quiz", response.data);

//   } catch (error) {
//     console.error("Error:", error.message);
//     throw error.message;
//   }
// };





export { createquiz };