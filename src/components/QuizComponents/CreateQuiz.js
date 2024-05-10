import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ImFolderUpload } from "react-icons/im";
import { BiSolidCoinStack } from "react-icons/bi";
// import { BiSolidPencil } from "react-icons/bi";
// import { FaTrashCan } from "react-icons/fa6";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setQuizDetails, setNameofQuiz, setDuration, setPassMark, setAttempts, setError } from '../../actions/CreateQuizAction';
import { isFormValid, handleQuizTitleChange } from '../../utils/ValidationCreateQuiz';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/CreateQuiz.css';
import AdminNavbar from './AdminNavbar';
import { createquiz } from '../../middleware/api';
import { useDispatch } from 'react-redux';


function Home() {

    // const [showOptions, setShowOptions] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [nameofquiz, setNameofQuiz] = useState('');
    const [duration, setDuration] = useState('');
    const [passMark, setPassMark] = useState('');
    const [attempts, setAttempts] = useState('');
    const [error, setError] = useState('');

    const [quizDetails, setQuizDetails] = useState({
        nameOfQuiz: '',
        duration: '',
        passMark: '',
    });

    const dispatch = useDispatch();

    

    const handleChange = (e) => {
        setQuizDetails({...quizDetails, [e.target.name]: e.target.value})
    };


   

    const handleUploadClick = (e) => {
        createquiz(quizDetails);
        e.preventDefault()
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };



    const handleDurationChange = (e) => {
        setDuration('SET_DURATION', e.target.value);
    };

    const handleGradeChange = (e) => {
        setPassMark('SET_PASSMARK', e.target.value);
    };




    return (
        <div>
            <AdminNavbar/>
        
            <form className='main-content'>
            
                <div className="card" id="QuizCard">
                    <div className="card-body">
                        <div className="d-flex mt-2">
                            <div className="container">
                                {/* <BiSolidPencil id="editicon" style={{ fontSize: "25" }} />
                                <FaTrashCan id="delicon" style={{ fontSize: "23" }} /> */}

                                <div className="form-group row mt-3">
                                    <label htmlFor="lbl1" className="col-sm-3 col-form-label" id='title' >Quiz Title<b id='required'>*</b></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="lbl1" placeholder="Enter the Quiz Title" name='nameOfQuiz' value={quizDetails.nameOfQuiz} style={{ borderRadius: 8 }} onChange={(e) => {  handleChange(e) }} />
                                        {error && <p style={{ color: 'red', fontSize: "50" }}>{error}</p>}
                                    </div>
                                </div>



                                <div class="form-group row mt-3">
                                    <label htmlFor="lbl3" class="col-sm-3 col-form-label" id='title'>Duration (In Minutes)<b id='required'>*</b></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl3" placeholder="Enter the Time Limit in Minutes" name='duration' value={quizDetails.duration} style={{ borderRadius: 8 }} onChange={(e)=>{handleDurationChange(e);handleChange(e)}}></input>
                                    </div>
                                </div>

                                <div class="form-group row mt-3">
                                    <label htmlFor="lbl5" class="col-sm-3 col-form-label" id='title'>Grade to be Secured<b id='required'>*</b></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl5" placeholder="Enter the Minimum Score to be Passed" name='passMark' value={quizDetails.passMark} style={{ borderRadius: 8 }} onChange={(e)=>{handleGradeChange(e);handleChange(e)}}></input>
                                    </div>
                                </div>

                                <div class="form-group row mt-3">
                                    <label htmlFor="lbl4" class="col-sm-3 col-form-label" id='title'>Attempts Allowed<b id='required'>*</b></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl4" placeholder="Enter the Number of Attempts" style={{ borderRadius: 8, width: 553, height: 40 }} onChange={(e) => setAttempts(e.target.value)}></input>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary"  onClick={(e) => { handleUploadClick(e) }} style={{ marginLeft: "55%", marginTop: "3%", borderRadius: 8 }} disabled={!isFormValid((nameofquiz, duration, passMark))}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title id='questitle'>Question Library</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* <Router> */}
                            <h6><BiSolidCoinStack style={{ fontSize: "30", color: "GrayText", marginBottom: "11", marginLeft: "10" }} /><Link id='bulklink' to='/bulkquiz'  > Add Question from Bulk Upload</Link></h6>
                            <h6><ImFolderUpload style={{ fontSize: "20", color: "GrayText", marginBottom: "11", marginLeft: "13" }} /><Link id='newquelink'> Add New Question</Link></h6>
                            {/* </Router> */}
                            {/* <h6> <Add Bulk Quiz</h6>
                         <h6>Add New Question</h6> */}


                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </form>
        </div>



    );
}


const mapStateToProps = state => ({
    nameofquiz: state.quiz ? state.quiz.nameofquiz : '',
    duration: state.quiz ? state.quiz.duration : '',
    passMark: state.quiz ? state.quiz.passMark : '',
    attempts: state.quiz ? state.quiz.attempts : '',
    error: state.quiz ? state.quiz.error : '',
});

const mapDispatchToProps = {
    setNameofQuiz,
    setDuration,
    setPassMark,
    setAttempts,
    setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
