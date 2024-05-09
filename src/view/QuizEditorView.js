import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/configureStore'; 
import QuizEditor from '../components/QuizEditor'; 
import AdminNavbar from '../components/AdminNavbar';
import UploadBulkQuiz from '../components/UploadBulkQuiz';

const QuizEditorView = () => {
  return (
    <Provider store={store}>
      <div>
        <QuizEditor/>
        {/* <UploadBulkQuiz/> */}
      </div>
    </Provider>
  );
};

export default QuizEditorView;