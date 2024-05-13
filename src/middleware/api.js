import axios from 'axios';
import  { useState } from 'react';




// const BASE_URL = 'http://localhost:5199/lxp/learner/registration';

const createquiz = async (quizDetails) => {
  try {
    console.log("details",quizDetails);
    const response = await axios.post('https://localhost:7005/api/Quiz',quizDetails);
  } catch (error) {
    console.error("Error:", error.message);
    throw  error.message;
  }
};





export {createquiz };