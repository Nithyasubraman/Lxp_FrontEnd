import {Routes, Route} from 'react-router-dom'

// import UploadBulkQuiz from './components/QuizComponents/UploadBulkQuiz';
import CreateQuizView from './View/CreateQuizView';



function App() {
  //localStorage.setItem('id',1)
  return (
    <div className="App">
    
    
      {/* <UploadBulkQuiz/> */}
  
    <Routes>
      <Route path="/" element={<CreateQuizView/>}/>  
      {/* <Route path="/bulkquiz" element = {<UploadBulkQuiz/>}/>   */}
      </Routes>  
      
    </div>
  );
}

export default App;
