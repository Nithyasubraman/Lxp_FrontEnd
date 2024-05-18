// import React , { useState,useEffect } from 'react'
// import { GetAllQuestion } from '../../middleware/QuestionApi'
// import { useNavigate } from 'react-router-dom';
// import '../../Styles/CreateQuiz.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useSearchParams } from 'react-router-dom';



// function ReviewQuestions() {
//     const [questions, setQuestions] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState('');

//     useEffect(() => {
//         // Simulate fetching questions from an API
//         const fetchQuestions =  () => {
//             try {
//                 const response = GetAllQuestion(); // Replace with your actual API endpoint
//                 const data =  response.json();
//                 setQuestions(data);
//             } catch (error) {
//                 console.error('Error fetching questions:', error);
//             }
//         };

//         fetchQuestions();
//     }, []);


//     return (
//         <div>
//             <h5>Review Questions</h5>
//             <div className='question publish'>
//                {loading && <p>Loading...</p>}
//                  {error && <p>Error: {error}</p>}
//                 {questions && questions.length > 0 && (
//                     <div>
//                         <h5>Review Questions</h5>
//                         {questions.map((question, index) => (
//                             <div key={index} className='card mt-3'>
//                                 <div className="card-body">
//                                     <h5 className="card-title">Question {question.questionNo}:</h5>

//                                     <input value={question.question} className='form-control' readOnly />
//                                     <div className="form-group">
//                                         <label>Options:</label>
//                                         {question.options.map((option, index) => (
//                                             <input
//                                                 key={index}
//                                                 type="text"
//                                                 className="form-control mt-2"
//                                                 value={option.option}
//                                                 readOnly
//                                             />
//                                         ))}
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Correct Answers:</label>
//                                         {question.options.filter(option => option.isCorrect).map((correctOption, index) => (
//                                             <input
//                                                 key={index}
//                                                 type="text"
//                                                 className="form-control mt-2"
//                                                 value={correctOption.option}
//                                                 readOnly
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>

//                             </div>

//                         ))}
//                                 <button onClick={GetAllQuestion} className="btn btn-light mt-3 mb-5 float-right" style={{backgroundColor:"#365486", color:"white"}}>Save</button>

//                     </div>
//                 )}

//             </div>

    
//         </div>
//     );
// };


// export default ReviewQuestions

import React , { useState,useEffect } from 'react'
// import { GetAllQuestion } from '../../middleware/QuestionApi'
import { useNavigate } from 'react-router-dom';
import '../../Styles/CreateQuiz.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams } from 'react-router-dom';
import { ImFolderUpload } from "react-icons/im";
import { BiSolidCoinStack } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";
import axios from 'axios';
import { DeleteQuestion,GetAllQuestion, GetOpenEditQuestionModal, PostSingleQuestion, UpdateQuestion } from '../../middleware/QuestionApi';
// import { fetchQuestionsRequest } from '../../middleware/QuestionApi';
import { fetchQuestionsRequest } from '../../middleware/QuestionApi';



export const ReviewQuestions=({GetAllQuestion}) =>{
    // const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();
    const handleSubmit = () => {
        try {
              // await GetAllQuestion();
          navigate('/')
              
          } catch (error) {
              console.error('Error fetching data:', error)
          }
      
  };
    const  [questions, setQuestions]= useState({
        question: '',
        questionType: '',
        options: ['', '', '', '', '', '', '', ''],
        correctOptions: ['', '', '']
    });
    // const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const GetAllQuestion = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5199/api/QuizQuestions/GetAllQuestions'
                );
                setQuestions(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        GetAllQuestion();
    }, []);

    return (
        <div className='question template container'>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {questions && questions.length > 0 && (
            <div>
                <h5>Review Questions</h5>
                {questions.map((question, index) => (
                    <div key={index} className='card mt-3'>
                        <div className='d-flex justify-content-end'>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Question {question.questionNo}:</h5>

                            <input value={question.question} className='form-control' readOnly />
                            <div className="form-group">
                                <label>Options:</label>
                                {question.options.map((option, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        className="form-control mt-2"
                                        value={option.option}
                                        readOnly
                                    />
                                ))}
                            </div>
                            <div className="form-group">
                                <label>Correct Answers:</label>
                                {question.options.filter(option => option.isCorrect).map((correctOption, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        className="form-control mt-2"
                                        value={correctOption.option}
                                        readOnly
                                    />
                                ))}
                            </div>
                        </div>

                    </div>

                ))}
                        <button onClick={handleSubmit} className="btn btn-light mt-3 mb-5 float-right" style={{backgroundColor:"#365486", color:"white"}}>Go to Edit Page</button>

                        <button className="btn btn-light mt-3 mb-5 float-right" style={{backgroundColor:"#365486", color:"white",marginLeft:"74%"}}>Review & Publish</button>

            </div>
        )}

    </div>
    
    );
};


export default ReviewQuestions











































//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState('');
//     const [questions, setQuestions] = useState([]);

//     const navigate = useNavigate();
 

//     const [newQuestion, setNewQuestion] = useState({
//         question: '',
//         questionType: '',
//         options: ['', '', '', '', '', '', '', ''],
//         correctOptions: ['', '', '']
//     });
//     const GetAllQuestion = async () => {
//         try {
//              await GetAllQuestion(); 
//         } catch (error) {
//             console.error('Error fetching data:', error)
//         }
//     }

//   return (
//     <div>
//          <div className='question publish'>
//                 {loading && <p>Loading...</p>}
//                 {error && <p>Error: {error}</p>}
//                 {questions && questions.length > 0 && (
//                     <div>
//                         <h5>Review Questions</h5>
//                         {questions.map((question, index) => (
//                             <div key={index} className='card mt-3'>
//                                 <div className="card-body">
//                                     <h5 className="card-title">Question {question.questionNo}:</h5>

//                                     <input value={question.question} className='form-control' readOnly />
//                                     <div className="form-group">
//                                         <label>Options:</label>
//                                         {question.options.map((option, index) => (
//                                             <input
//                                                 key={index}
//                                                 type="text"
//                                                 className="form-control mt-2"
//                                                 value={option.option}
//                                                 readOnly
//                                             />
//                                         ))}
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Correct Answers:</label>
//                                         {question.options.filter(option => option.isCorrect).map((correctOption, index) => (
//                                             <input
//                                                 key={index}
//                                                 type="text"
//                                                 className="form-control mt-2"
//                                                 value={correctOption.option}
//                                                 readOnly
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>

//                             </div>

//                         ))}
//                                 <button onClick={GetAllQuestion} className="btn btn-light mt-3 mb-5 float-right" style={{backgroundColor:"#365486", color:"white"}}>Save</button>

//                     </div>
//                 )}

//             </div>
//     </div>
//   )
// }