import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizEditorView from './view/QuizEditorView';
import QuizEditor from './components/QuizEditor';
import { Provider } from 'react-redux';
// import store from './store/configureStore'; 
import store from './store/fileConfigureStore';
import UploadBulkQuiz from './components/UploadBulkQuiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizEditor />} />
        <Route path='/upload' element={
          <Provider store={store}>
            <div>
              <UploadBulkQuiz />
            </div>
          </Provider>
        } />
      </Routes>
    </Router>
  );
}

export default App;



















// import './App.css';
// import {Routes, Route} from 'react-router-dom'
// import QuizEditorView from './view/QuizEditorView';


// function App() {
//   return (
//     <div className="App">
//      <Routes>
//         <Route path="quizEditorview" element={<QuizEditorView/>} /> 
//       </Routes>
//     </div>
    
//   );
// }
// export default App;
























// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
