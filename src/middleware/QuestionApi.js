import axios from 'axios';
import  { useState } from 'react';
import { fetchQuestionsFailure, fetchQuestionsRequest, fetchQuestionsSuccess } from '../actions/GetAllQuestionAction';

export const BulkUploadQuestion = async (files) => {
    if(files && files.length>0){
        const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await axios.post('https://localhost:7005/api/BulkQuestion/ImportQuizData', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("BulkUploadQuestion",response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
      }else{
        console.log("no file")
      }
};



export const GetAllQuestion = () => async dispatch => {
  dispatch(fetchQuestionsRequest());
      try {
        const response = await axios.get('https://localhost:7005/api/QuizQuestions/GetAllQuestions');
        dispatch(fetchQuestionsSuccess(response.data));
      } catch (error) {
        dispatch(fetchQuestionsFailure(error.message))
        console.error('Error uploading file:', error);
      }

};