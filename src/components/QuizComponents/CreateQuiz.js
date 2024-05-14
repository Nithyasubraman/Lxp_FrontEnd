import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ImFolderUpload } from "react-icons/im";
import { BiSolidCoinStack } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import '../../Styles/CreateQuiz.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QuestionTemplate } from './QuestionTemplate';
import { createquiz } from '../../middleware/api';
import { GetAllQuestion } from '../../middleware/QuestionApi';
import { GetQuizDetails } from '../../middleware/api';


export const Home = ({ questions, loading, GetAllQuestion, editQuiz }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [quizTitle, setQuizTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [passMark, setPassMark] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
    const [showQuizEditModal, setShowQuizEditModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        question: '',
        questionType: '',
        options: ['', '', '', '', '', '', '', ''],
        correctOptions: ['', '', '']
    });
    const [quizDetails, setQuizDetails] = useState({
        nameOfQuiz: '',
        duration: '',
        passMark: '',
        attemptsAllowed: ''
    });
    const [quizData, setQuizData] = useState({
        nameOfQuiz: '',
        duration: 0,
        passMark: 0,
        attemptsAllowed: ''
    });

    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState({
        question: '',
        options: ['', '', '', '', '', '', '', ''],
        correctOptions: ['', '', '']
    });


    useEffect(() => {
        fetchQuestions();
        fetchQuizData();
    }, []);

    const toggleOptions = (event) => {
        event.preventDefault();
        setShowOptions(!showOptions);
        event.target.nextSibling.style.display = showOptions ? 'none' : 'block';
    };

    const handleUploadClick = (e) => {
        createquiz(quizDetails);
        e.preventDefault()
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const isFormValid = () => {
        return quizDetails.nameOfQuiz !== '' && quizDetails.duration !== '' && quizDetails.passMark !== '';
    };

   
    

    const handleQuizTitleChange = (e) => {
        const value = e.target.value;
        if (/^\d+$/.test(value)) {
            setError('*Please enter only text ');
        } else {
            setError('');
            setQuizTitle(value);
        }
    };

  

    const handleOpenAddQuestionModal = () => {
        setShowAddQuestionModal(true);
    };

    const handleCloseAddQuestionModal = () => {
        setShowAddQuestionModal(false);
    };

    const handleCloseQuizEditModal = () => {
        setShowQuizEditModal(false);
    }

    const handleOpenQuizEditModal = () => {
        setShowQuizEditModal(true);
    }

    const handleChange = (index, field, value) => {

        if (field === 'correctOptions') {
            setNewQuestion(prevState => ({
                ...prevState,
                correctOptions: [...prevState.correctOptions.slice(0, index), value, ...prevState.correctOptions.slice(index + 1)]
            }));
        } else {
            setNewQuestion(prevState => ({
                ...prevState,
                [field]: index === -1 ? value : [...prevState[field].slice(0, index), value, ...prevState[field].slice(index + 1)]
            }));
        }
    };

    const handleQuizChange = (e) => {
        setQuizDetails({ ...quizDetails, [e.target.name]: e.target.value })
        setQuizData({ ...quizData, [e.target.name]: e.target.value })
    };

    const handleSaveQuestion = () => {
        const requestBody = {
            quizId: "d9f26cf2-31ba-43ea-a70f-0dd6d38f490a",
            question: newQuestion.question,
            questionType: newQuestion.questionType,
            options: newQuestion.options.map((option, index) => ({
                option: option,
                isCorrect: newQuestion.correctOptions.includes(option) // Check if option is in correctOptions array
            }))
        };
        axios.post('https://localhost:7005/api/QuizQuestions/AddQuestion', requestBody)
            .then(response => {
                console.log('Question added successfully:', response.data);
                handleCloseAddQuestionModal();
            })
            .catch(error => {
                console.error('Error adding question:', error);
            });
    };

    const handleQuestionTypeChange = (e) => {
        const value = e.target.value;
        setSelectedQuestionType(value);
        setNewQuestion(prevState => ({
            ...prevState,
            questionType: value,
            options: [],
            correctOptions: []
        }));
    };

    const handleDurationChange = (e) => {
        setDuration('SET_DURATION', e.target.value);
    };

    const handleGradeChange = (e) => {
        setPassMark('SET_PASSMARK', e.target.value);
    };

    const fetchQuizData = async () => {
        try {
            const data = await GetQuizDetails();
            setQuizData(data);
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const fetchQuestions = async () => {
        try {
            await GetAllQuestion();
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const handleUpdateQuiz = () => {
        const updatedQuizData = {
            nameOfQuiz: quizData.nameOfQuiz,
            duration: parseInt(quizData.duration),
            attemptsAllowed: parseInt(quizData.attemptsAllowed),
            passMark: parseInt(quizData.passMark)
        };

        axios.put('https://localhost:7005/api/Quiz/d9f26cf2-31ba-43ea-a70f-0dd6d38f490a', updatedQuizData)
            .then(response => {
                console.log('Quiz updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating quiz:', error);
            });
        handleCloseQuizEditModal();
    };

    const handleDeleteQuiz = () => {

        axios.delete('https://localhost:7005/api/Quiz/d9f26cf2-31ba-43ea-a70f-0dd6d38f490a')
            .then(response => {
                console.log('Quiz deleted successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating quiz:', error);
            });
    };

    const handleOpenEditQuestionModal = async (quizQuestionId) => {
        try {
            const response = await axios.get(`https://localhost:7005/api/QuizQuestions/GetQuestionById?quizQuestionId=${quizQuestionId}`);
            const questionData = response.data;
            setEditedQuestion({
                question: questionData.question,
                options: questionData.options.map(option => option.option),
                correctOptions: questionData.options.filter(option => option.isCorrect).map(option => option.option)
            });

            setShowEditQuestionModal(true);
        } catch (error) {
            console.error('Error fetching question data:', error);
        }
    };

    const handleCloseEditQuestionModal = () => {
        setShowEditQuestionModal(false);
    };

    const handleUpdateQuestion = () => {
        const { quizQuestionId, ...updatedQuestion } = editedQuestion;
        const updatedOptions = updatedQuestion.options.map((option, index) => ({
          option,
          isCorrect: updatedQuestion.correctOptions.includes(option)
        }));
      
        const requestBody = {
          ...updatedQuestion,
          options: updatedOptions
        };
      
        axios.put(`https://localhost:7005/api/QuizQuestions/UpdateQuestion/${quizQuestionId}`, requestBody)
          .then(response => {
            console.log('Question updated successfully:', response.data);
            handleCloseEditQuestionModal();
          })
          .catch(error => {
            console.error('Error updating question:', error);
          });
      };

    return (
        <div >

            <AdminNavbar />
            <form className=' main-content'>
                <div className="card" id="QuizCard">
                    <div className="card-body">
                        <div className="d-flex mt-2">
                            <div className="container">
                                {/* <a onClick={handleOpenQuizEditModal}><BiSolidPencil style={{ fontSize: "25", marginLeft: "90%" }} /></a> */}
                                <Button class="btn btn-light" style={{marginLeft:"80%" , marginTop:"-3%" , backgroundColor:"#365486", color:"white"}} onClick={handleOpenQuizEditModal}><AiFillEdit/> Edit</Button>
                                <Button class="btn btn-light" style={{marginLeft:"89%" , marginTop:"-8.5%", backgroundColor:"#365486", color:"white"}} onClick={handleDeleteQuiz}><FaTrashCan/> Delete</Button>
                                {/* <a onClick={handleDeleteQuiz}><FaTrashCan style={{ fontSize: "23", marginLeft: "2%" }} /></a> */}
                                <div className="form-group row mt-3">
                                    <label htmlFor="lbl1" className="col-sm-3 col-form-label" style={{ fontWeight: "bold" }} >Quiz Title<span id='required'>*</span></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="lbl1" placeholder="Enter the Quiz Title" style={{ borderRadius: 8 }} name='nameOfQuiz' value={quizData.nameOfQuiz} readOnly />
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="lbl3" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Duration (In Minutes)<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl3" placeholder="Enter the Time Limit in Minutes" style={{ borderRadius: 8 }} name='duration' value={quizData.duration} readOnly />
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="lbl5" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Grade to be Secured<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl5" placeholder="Enter the Minimum Score to be Passed" style={{ borderRadius: 8 }} name='passMark' value={quizData.passMark} readOnly />
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="lbl4" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Attempts Allowed<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="text" className="form-control" id="lbl1" placeholder="Attempts Allowed" style={{ borderRadius: 8 }} name='attemptsAllowed' value={quizData.attemptsAllowed} readOnly />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                    {/* <Button class="btn btn-light" style={{marginLeft:"80%" , marginTop:"-3%" , backgroundColor:"#365486", color:"white"}} onClick={handleOpenQuizEditModal}><AiFillEdit/> Edit</Button> */}
                                      <Button type="submit" className="btn btn-light" onClick={(e) => { handleUploadClick(e) }} style={{ marginLeft: "50%", marginTop: "3%", borderRadius: 8 , backgroundColor:"#365486", color:"white"}} disabled={!isFormValid()}><FaUpload/> Import Question</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className='question template container'>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {questions && questions.length > 0 && (
                    <div>
                        <h5>Uploaded Questions</h5>
                        {questions.map((question, index) => (
                            <div key={index} className='card mt-3 shadow rounded' style={{ backgroundColor: "rgb(226, 223, 208)",width:"90%",marginLeft:"8%" }}>
                                <div className='d-flex justify-content-end w-60'>
                                    <a onClick={() => { handleOpenEditQuestionModal(question.quizQuestionId) }} className='m-2 me-2'><BiSolidPencil style={{ fontSize: "25", color:"#365486" }} /></a>
                                    <a className='m-2 ms-3'><FaTrashCan style={{ fontSize: "23", color:"#365486" }} /></a>
                                </div>
                               
                                <div className="card-body w-60 ">
                                    <h5 className="card-title ">Question {question.questionNo}:</h5>
                                    <input value={question.question} className='form-control shadow p-2 mb-7 bg-white rounded' readOnly />  
              
                                    <div className="form-group w-50">
                                        <div><h5>Options:</h5></div>
                                        {question.options.map((option, index) => (
                                              <input
                                                key={index}
                                                type="text"
                                                rows={2}
                                                style={{ width: '190px', marginBottom: '10px', marginLeft:"10%" }}
                                                className="form-inline mt-2 shadow p-2 mb-7 bg-white rounded border-light"
                                                value={option.option}
                                                readOnly
                                            />
                                        ))}
                                    </div>

                                    <div className="form-group w-60">
                                        <h5>Correct Answers:</h5>
                                        {question.options.filter(option => option.isCorrect).map((correctOption, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                className="form-control mt-2 shadow p-2 mb-7 bg-white rounded "
                                                value={correctOption.option}
                                                readOnly
                                            />
                                        ))}
                                    </div>
                                    <button onClick={handleOpenAddQuestionModal} id="btn">Add More Questions</button>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>
            <Modal show={showQuizEditModal} onHide={handleCloseQuizEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Quiz Editor</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="form-group row mt-3">
                            <label htmlFor="lbl1" className="col-sm-5 col-form-label" style={{ fontWeight: "bold" }}>Quiz Title<span id='required'>*</span></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="lbl1" placeholder="Enter the Quiz Title" style={{ borderRadius: 8 }} name='nameOfQuiz' value={quizData.nameOfQuiz} onChange={(e) => { handleQuizTitleChange(e); handleQuizChange(e) }} />
                                {error && <p style={{ color: 'red', fontSize: "50" }}>{error}</p>}
                            </div>
                        </div>
                        <div class="form-group row mt-3">
                            <label for="lbl3" class="col-sm-5 col-form-label" style={{ fontWeight: "bold" }}>Duration(In Minutes)<span id='required'>*</span></label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="lbl3" placeholder="Enter the Time Limit in Minutes" style={{ borderRadius: 8 }} name='duration' value={quizData.duration} onChange={(e) => { handleDurationChange(e); handleQuizChange(e) }}/>
                            </div>
                        </div>
                        <div class="form-group row mt-3">
                            <label for="lbl5" class="col-sm-5 col-form-label" style={{ fontWeight: "bold" }}>Grade to be Secured<span id='required'>*</span></label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="lbl5" placeholder="Enter the Minimum Score to be Passed" style={{ borderRadius: 8 }} name='passMark' value={quizData.passMark} onChange={(e) => { handleGradeChange(e); handleQuizChange(e) }}></input>
                            </div>
                        </div>
                        <div class="form-group row mt-3">
                            <label for="lbl4" class="col-sm-5 col-form-label" style={{ fontWeight: "bold" }}>Attempts Allowed<span id='required'>*</span></label>
                            <div class="col-sm-8">
                                <input type="text" className="form-control" id="lbl1" placeholder="Attempts Allowed" style={{ borderRadius: 8 }} name='attemptsAllowed' value={quizData.attemptsAllowed} onChange={(e) => { handleQuizChange(e) }} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseQuizEditModal}>Back</Button>
                    <Button variant="primary" onClick={handleUpdateQuiz}>Update</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditQuestionModal} onHide={handleCloseEditQuestionModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Question:</label>
                        <input className='form-control' type="text" value={editedQuestion.question} onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })} />
                    </div>
                    {editedQuestion.options.map((option, index) => (
                        <div className="form-group" key={index}>
                            <label>Option {index + 1}:</label>
                            <input className='form-control' type="text" value={option} onChange={(e) => {
                                const updatedOptions = [...editedQuestion.options];
                                updatedOptions[index] = e.target.value;
                                setEditedQuestion({ ...editedQuestion, options: updatedOptions });
                            }} />
                        </div>
                    ))}
                    <div className="form-group">
                        <label>Correct Options:</label>
                        {editedQuestion.correctOptions.map((option, index) => (
                            <input
                                key={index}
                                className='form-control mt-2'
                                type="text"
                                value={option}
                                onChange={(e) => {
                                    const updatedCorrectOptions = [...editedQuestion.correctOptions];
                                    updatedCorrectOptions[index] = e.target.value;
                                    setEditedQuestion({ ...editedQuestion, correctOptions: updatedCorrectOptions });
                                }}
                            />
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditQuestionModal}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateQuestion}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showAddQuestionModal} onHide={handleCloseAddQuestionModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Question Type:</label>
                        <select className='form-control' value={selectedQuestionType} onChange={handleQuestionTypeChange}>
                            <option value="">Select Question Type</option>
                            <option value="MSQ">Multiple Select Question (MSQ)</option>
                            <option value="MCQ">Multiple Choice Question (MCQ)</option>
                            <option value="T/F">True/False (T/F)</option>
                        </select>
                    </div>

                    {selectedQuestionType === 'MSQ' && (
                        <>
                            <div className="form-group">
                                <label>Question:</label>
                                <input className='form-control' type="text" value={newQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
                            </div>
                            {[...Array(8)].map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label>Option {index + 1}:</label>
                                    <input className='form-control' type="text" value={newQuestion.options[index] || ''} onChange={(e) => handleChange(index, 'options', e.target.value)} />
                                </div>
                            ))}
                            {[...Array(3)].map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label>Correct Option {index + 1}:</label>
                                    <input className='form-control' type="text" value={newQuestion.correctOptions[index] || ''} onChange={(e) => handleChange(index, 'correctOptions', e.target.value)} />
                                </div>
                            ))}
                        </>
                    )}
                    {selectedQuestionType === 'MCQ' && (
                        <>
                            <div className="form-group">
                                <label>Question:</label>
                                <input className='form-control' type="text" value={newQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
                            </div>
                        
                            {[...Array(4)].map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label>Option {index + 1}:</label>
                                    <input className='form-control' type="text" value={newQuestion.options[index] || ''} onChange={(e) => handleChange(index, 'options', e.target.value)} />
                                </div>
                            ))}
                            <div className="form-group">
                                <label>Correct Option:</label>
                                <input className='form-control' type="text" value={newQuestion.correctOptions[0] || ''} onChange={(e) => handleChange(0, 'correctOptions', e.target.value)} />
                            </div>
                        </>
                    )}
                    {selectedQuestionType === 'T/F' && (
                        <>
                            <div className="form-group">
                                <label>Question:</label>
                                <input className='form-control' type="text" value={newQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
                            </div>
                            {[...Array(2)].map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label>Option {index + 1}:</label>
                                    <input className='form-control' type="text" value={newQuestion.options[index] || ''} onChange={(e) => handleChange(index, 'options', e.target.value)} />
                                </div>
                            ))}
                            <div className="form-group">
                                <label>Correct Option:</label>
                                <input className='form-control' type="text" value={newQuestion.correctOptions[0] || ''} onChange={(e) => handleChange(0, 'correctOptions', e.target.value)} />
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddQuestionModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveQuestion}>Save</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title id='questitle'>Question Library</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6><BiSolidCoinStack style={{ fontSize: "30", color: "GrayText", marginBottom: "11", marginLeft: "10" }} /><Link id='bulklink' to='/upload'> Add Question from Bulk Upload</Link></h6>
                    <h6><ImFolderUpload style={{ fontSize: "20", color: "GrayText", marginBottom: "11", marginLeft: "13" }} /><Link id='newquelink' onClick={() => { handleOpenAddQuestionModal(); closeModal() }}> Add New Question</Link></h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        questions: state.questions.questions,
        loading: state.questions.loading,
        error: state.questions.error,
        editQuiz: state.editQuiz
    };
};

const mapDispatchToProps = {
    GetAllQuestion,
    // getQuizById
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

