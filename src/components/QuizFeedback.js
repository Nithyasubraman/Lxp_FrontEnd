
import React, { useState,useEffect } from 'react'
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';
// import { DeleteQuestion, GetAllQuestion, GetOpenEditQuestionModal, PostSingleQuestion, UpdateQuestion } from '../../middleware/QuestionApi';
import {  useDispatch } from 'react-redux';
import axios from 'axios';
import { createquizfeedbackRequest } from '../actions/QuizFeedbackAction';


export const QuizFeedback = () => {

    const [errorfb, setErrorfb] = useState('');
    const [loading, setLoading] = useState('');
    const [showAddfbModal, setShowAddfbModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = () => {
        try {
              // await GetAllQuestion();
          navigate('/')
              
          } catch (error) {
              console.error('Error fetching data:', error)
          }
      
  };
    const [fbQuestion, setFbQuestion] = useState({
        question: '',
        questionType: '',
        options: ['', '', '', '', '', '', '', ''],
  
    });
    const [selectedfbType, setSelectedfbType] = useState('');
  
    const handleFeedback = () => {
        try {
            // navigate("/");
        } catch (error) {
            console.error('Error navigating:', error);
        }
    };

    const handleSaveQuestion = () => {
        let tempfbErrors = { question: '', questionType: '', optionText: '' };

        if (!fbQuestion.question) {
            tempfbErrors.question = 'Question is required';
        }
        if (!fbQuestion.questionType) {
            tempfbErrors.questionType = 'Question type is required';
        }
        if (fbQuestion.options.length === 0 && fbQuestion.questionType =="MCQ") {
            tempfbErrors.optionText = 'At least one option is required';
        }
        
        setErrorfb(tempfbErrors);

        if (tempfbErrors.question || tempfbErrors.questionType || tempfbErrors.optionText ) {
            return;
        }

        const requestBody = {
            quizId: "d609ff3e-5972-4340-97e0-7f46b55e8096",
            question: fbQuestion.question,
            questionType: fbQuestion.questionType,
            options: fbQuestion.options.map((optionText, index) => ({
                optionText: optionText
                // isCorrect: fbQuestion.correctOptions.includes(option) // Check if option is in correctOptions array
            }))
        };
         console.log(requestBody)
         dispatch(createquizfeedbackRequest(requestBody));
        handleCloseAddfbQuestionModal();
    };

    const handleOpenAddfbQuestionModal = () => {  
        setShowAddfbModal(true);
    };

    const handleCloseAddfbQuestionModal = () => {
        setShowAddfbModal(false);
    };
    const handleChange = (index, field, value) => {
        const updatedoptions = [...fbQuestion.options];
    updatedoptions[index] = value;
    setFbQuestion({ ...fbQuestion, options: updatedoptions });
        
            setFbQuestion(prevState => ({
                ...prevState,
                [field]: index === -1 ? value : [...prevState[field].slice(0, index), value, ...prevState[field].slice(index + 1)]
            }));
    };

    const handlefbQuestionTypeChange = (e) => {
        const value = e.target.value;
        setSelectedfbType(value);
        setFbQuestion(prevState => ({
            ...prevState,
            questionType: value,
            options: [],
        }));
    };  
    return (
        <div>
            <AdminNavbar />
            <div>Quiz Feedback</div>
            <div>
            <Modal show={showAddfbModal} onHide={handleCloseAddfbQuestionModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Feedback Questions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Question Type:</label>
                        <select className='form-control' value={selectedfbType} onChange={handlefbQuestionTypeChange}>
                            <option value="">Select Question Type</option>
                            <option value="MCQ">MCQ</option>
                            <option value="Descriptive">Descriptive</option>
                        </select>
                        {errorfb.questionType && <div style={{color: "red"}}>{errorfb.questionType}</div>}
                    </div>
                   
                    {selectedfbType === 'MCQ' && (
                        <>
                            <div className="form-group">
                                <label>Question:</label>
                                <input className='form-control' type="text" value={fbQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
                                {errorfb.question && <div style={{color: "red"}}>{errorfb.question}</div>}
                            </div>
                            {[...Array(4)].map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label>Option {index + 1}:</label>
                                    <input className='form-control' type="text" value={fbQuestion.options[index] || ''} onChange={(e) => handleChange(index, 'options', e.target.value)} />
                                    {errorfb.options && <div style={{color: "red"}}>{errorfb.options}</div>}
                                </div>
                            ))}
                        </>
                    )}
                    {selectedfbType === 'Descriptive' && (
                        <>
                            <div className="form-group">
                                <label>Question:</label>
                                <input className='form-control' type="text" value={fbQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
                                {errorfb.question && <div style={{color: "red"}}>{errorfb.question}</div>}
                            </div>
                           </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddfbQuestionModal}>Close</Button>
                    <Button variant="primary" onClick={()=>{handleSaveQuestion()}}>Save</Button>
               
                </Modal.Footer>
            </Modal>

            </div>

        </div>
    )
}

export default QuizFeedback