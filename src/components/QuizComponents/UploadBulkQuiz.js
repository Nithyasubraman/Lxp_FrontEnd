import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'; 
import '../../App.css';
import AdminNavbar from '../AdminNavbar';
import axios from 'axios'; 

const UploadBulkQuiz = () => {
  const [files, setFiles] = useState(undefined);
  const inputref = useRef();
  const navigate = useNavigate();
  const [importedQuestions, setImportedQuestions] = useState([]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files)
  };

  const handleFileUpload = async (event) => {

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
      console.log("response",response.data);
      const importedQuestions = response.data; 
      setImportedQuestions(importedQuestions); 
      navigate('/', { state: { importedQuestions } }); 
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    }else{
      console.log("no file")
    }
  };
  return (
    <>
      <AdminNavbar />
      <div id='uploadContent'>
        <h5 style={{ marginTop: "-40%", marginLeft: "25%" }}>Upload Question from device </h5>
        <div id='dropzone'
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FaCloudUploadAlt style={{ fontSize: "50px", marginTop: "-3%" }} />
          <h5>Drag and Drop Files to Upload</h5>
          <h5>Or</h5>
          <input type='file' multiple onChange={(event) => setFiles(event.target.files)} hidden ref={inputref} />
          <button onClick={(e) => { e.preventDefault(); inputref.current.click() }}>Browse Files</button>
        </div>
        <div style={{ marginLeft: "25%", marginTop: "2%" }}>
          <h5>Supported File formats : .xlsx</h5>
          <br />

          {files ? <>
            <div >
              <h6>Selected File </h6>
              {Array.from(files).map((file, idx) => <p key={idx}>{file.name}</p>)}
            </div></> : <>
          </>

          }
        </div>
        <br />
        <div className="position-absolute start-50 translate-middle">
          <button
            className="btn btn-secondary mt-3"
            type="submit"
            onClick={handleFileUpload}
            disabled={!files||files.length===0}
          >
            Upload
          </button>
        </div>


      </div>
    </>
  )
};

export default UploadBulkQuiz
