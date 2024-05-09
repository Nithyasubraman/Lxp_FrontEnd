import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// import CreateQuizView from './View/CreateQuizView';
// import CreateQuiz from './components/QuizComponents/CreateQuiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  
  </React.StrictMode>,
  document.getElementById('root')
);



