import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ImFolderUpload } from "react-icons/im";
import { BiSolidCoinStack } from "react-icons/bi";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
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


export const Home = ({ questions, loading, errors, GetAllQuestion }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [quizTitle, setQuizTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [passMark, setPassMark] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
    const [importedQuestions, setImportedQuestions] = useState([]);
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


    useEffect(() => {
        fetchQuestions();
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



    // Function to check if all input fields are filled
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

    const handleChange = (index, field, value) => {
        if (field === 'correctOptions') {
            // Update the correctOptions array at the specified index
            setNewQuestion(prevState => ({
                ...prevState,
                correctOptions: [...prevState.correctOptions.slice(0, index), value, ...prevState.correctOptions.slice(index + 1)]
            }));
        } else {
            // For other fields, update normally
            setNewQuestion(prevState => ({
                ...prevState,
                [field]: index === -1 ? value : [...prevState[field].slice(0, index), value, ...prevState[field].slice(index + 1)]
            }));
        }
    };

    const handleQuizChange = (e) => {
        setQuizDetails({ ...quizDetails, [e.target.name]: e.target.value })
    };

    const handleSaveQuestion = () => {
        // Construct the request body
        const requestBody = {
            quizId: "3e2ac1a6-d882-4566-b229-7cdd516a3b24",
            question: newQuestion.question,
            questionType: newQuestion.questionType,
            options: newQuestion.options.map((option, index) => ({
                option: option,
                isCorrect: newQuestion.correctOptions.includes(option) // Check if option is in correctOptions array
            }))
        };

        console.log("request body", requestBody);

        // Make a POST request to the backend API endpoint
        axios.post('https://localhost:7005/api/QuizQuestions/AddQuestion', requestBody)
            .then(response => {
                // Handle success response
                console.log('Question added successfully:', response.data);
                // Close the modal after saving
                handleCloseAddQuestionModal();
            })
            .catch(error => {
                // Handle error
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

    const fetchQuestions = async () => {
        try {
            await GetAllQuestion();
        } catch (error) {
            console.error('Error fetching data:', error)
        }

    }

    return (
        <div >

            <AdminNavbar />
            <form className=' main-content'>
                <div className="card" id="QuizCard">
                    <div className="card-body">
                        <div className="d-flex mt-2">
                            <div className="container">
                                <BiSolidPencil style={{ fontSize: "25", marginLeft: "90%" }} />
                                <FaTrashCan style={{ fontSize: "23", marginLeft: "2%" }} />

                                <div className="form-group row mt-3">
                                    <label htmlFor="lbl1" className="col-sm-3 col-form-label" style={{ fontWeight: "bold" }} >Quiz Title<span id='required'>*</span></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="lbl1" placeholder="Enter the Quiz Title" style={{ borderRadius: 8 }} name='nameOfQuiz' value={quizDetails.nameOfQuiz} onChange={(e) => { handleQuizChange(e) }} />
                                        {error && <p style={{ color: 'red', fontSize: "50" }}>{error}</p>}
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="lbl3" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Duration (In Minutes)<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl3" placeholder="Enter the Time Limit in Minutes" style={{ borderRadius: 8 }} name='duration' value={quizDetails.duration} onChange={(e) => { handleDurationChange(e); handleQuizChange(e) }}></input>
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="lbl5" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Grade to be Secured<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl5" placeholder="Enter the Minimum Score to be Passed" style={{ borderRadius: 8 }} name='passMark' value={quizDetails.passMark} onChange={(e) => { handleGradeChange(e); handleQuizChange(e) }}></input>
                                    </div>
                                </div>

                                <div class="form-group row mt-3">
                                    <label for="lbl4" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Attempts Allowed<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="text" className="form-control" id="lbl1" placeholder="Attempts Allowed" style={{ borderRadius: 8 }} name='attemptsAllowed' value={quizDetails.attemptsAllowed} onChange={(e) => { handleQuizChange(e) }} />
                                    </div>
                                </div>

                                {/* <div class="form-group row mt-3">
                                     <label for="lbl2" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }} >No of Question<span id='required'>*</span></label>
                                     <div class="col-sm-8">
                                         <input type="number" class="form-control" id="lbl2" placeholder="Enter the Number Of Questions" style={{ borderRadius: 8 }}onChange={(e) => setNumQuestions(e.target.value)}></input>
                                     </div>
                              </div> */}


                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary" onClick={(e) => { handleUploadClick(e) }} style={{ marginLeft: "50%", marginTop: "3%", borderRadius: 8 }} disabled={!isFormValid()}>+ Add Questions</button>
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
                        <h3>Uploaded Questions</h3>
                        {questions.map((question, index) => (
                            <div key={index}>
                                <QuestionTemplate question={question} />
                            </div>
                        ))}
                    </div>
                )}
                <button onClick={handleOpenAddQuestionModal} className="btn btn-primary mt-3 mb-5 float-right">Add Question</button>
            </div>
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
                            {/* Input field for question */}
                            <div className="form-group">
                                <label>Question:</label>
                                <input className='form-control' type="text" value={newQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
                            </div>
                            {/* Input fields for options */}
                            {[...Array(4)].map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label>Option {index + 1}:</label>
                                    <input className='form-control' type="text" value={newQuestion.options[index] || ''} onChange={(e) => handleChange(index, 'options', e.target.value)} />
                                </div>
                            ))}
                            {/* Input field for correct option */}
                            <div className="form-group">
                                <label>Correct Option:</label>
                                <input className='form-control' type="text" value={newQuestion.correctOptions[0] || ''} onChange={(e) => handleChange(0, 'correctOptions', e.target.value)} />
                            </div>
                        </>
                    )}
                    {selectedQuestionType === 'T/F' && (
                        <>
                            {/* Input field for question */}
                            <div className="form-group">
                                <label>Question:</label>
                                <input className='form-control' type="text" value={newQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
                            </div>
                            {/* Input fields for options */}
                            {[...Array(2)].map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label>Option {index + 1}:</label>
                                    <input className='form-control' type="text" value={newQuestion.options[index] || ''} onChange={(e) => handleChange(index, 'options', e.target.value)} />
                                </div>
                            ))}
                            {/* Input field for correct option */}
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
    console.log('redux', state);
    return {
        questions: state.questions.questions,
        loading: state.questions.loading,
        error: state.questions.error
    };
};

const mapDispatchToProps = {
    GetAllQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
