import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { uploadFiles } from '../actions/fileAction';
import AdminNavbar from '../components/AdminNavbar';
// import '../styles/UploadBulkQuiz.css';

const UploadBulkQuiz = () => {
  const files = useSelector(state => state.files);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = event => {
    event.preventDefault();
    dispatch(uploadFiles(event.dataTransfer.files));
  };

  const handleFileChange = event => {
    dispatch(uploadFiles(event.target.files));
  };

  return (
    <>
      <AdminNavbar />
      <div className="upload-container">
        <div>
        <h3>Upload Questions from Device </h3>
        </div>
        
        <div
          className='dropzone'
          onDragOver={handleDragOver} 
          onDrop={handleDrop}
        >
          <FaCloudUploadAlt className="cloud-icon" />
          <h5>Drag and Drop Files to Upload</h5>
          <h5>Or</h5>
          <input type='file' multiple onChange={handleFileChange} hidden ref={inputRef} />
          <button onClick={() => inputRef.current.click()}>Browse Files</button>
        </div>
        <div className="file-details">
          <h5>Supported File Formats: .xlsx</h5>
          <br />
          {files.length > 0 && (
            <div>
              <h6>Selected Files </h6>
              {Array.from(files).map((file, idx) => <p key={idx}>{file.name}</p>)}
            </div>
          )}
        </div>
        <div className="upload-button">
          <button
            className="btn btn-secondary mt-3 "
            type="submit"
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadBulkQuiz;










































// // UploadBulkQuiz.js
// import React, { useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaCloudUploadAlt } from 'react-icons/fa';
// import { uploadFiles } from '../actions/fileAction';
// import AdminNavbar from '../components/AdminNavbar';

// const UploadBulkQuiz = () => {
//   const files = useSelector(state => state.files);
//   const dispatch = useDispatch();
//   const inputRef = useRef();

//   const handleDragOver = event => {
//     event.preventDefault();
//   };

//   const handleDrop = event => {
//     event.preventDefault();
//     dispatch(uploadFiles(event.dataTransfer.files));
//   };

//   const handleFileChange = event => {
//     dispatch(uploadFiles(event.target.files));
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div id='uploadContent'>
//         <h5 style={{ marginTop: '-40%', marginLeft: '25%' }}>Upload Question from device </h5>
//         <div
//           id='dropzone'
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         >
//           <FaCloudUploadAlt style={{ fontSize: '50px', marginTop: '-3%' }} />
//           <h5>Drag and Drop Files to Upload</h5>
//           <h5>Or</h5>
//           <input type='file' multiple onChange={handleFileChange} hidden ref={inputRef} />
//           <button onClick={() => inputRef.current.click()}>Browse Files</button>
//         </div>
//         <div style={{ marginLeft: '25%', marginTop: '2%' }}>
//           <h5>Supported File formats : .xlsx</h5>
//           <br />
//           {files.length > 0 && (
//             <div>
//               <h6>Selected File </h6>
//               {Array.from(files).map((file, idx) => <p key={idx}>{file.name}</p>)}
//             </div>
//           )}
//         </div>
//         <div class="position-absolute start-50 translate-middle">
//           <button
//             className="btn btn-secondary mt-3 "
//             type="submit"
//           >
//             Upload
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UploadBulkQuiz;


















































// import React, { useRef, useState } from 'react';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { connect } from 'react-redux'; 
// import { Link } from 'react-router-dom';
// import '../App.css';
// import AdminNavbar from './AdminNavbar';
// import { uploadFiles } from '../actions/uploadActions';

// const UploadBulkQuiz = ({ files, uploadFiles }) => { 
//     const inputRef = useRef();

//     const handleDragOver = (event) => {
//         event.preventDefault();
//     };

//     const handleDrop = (event) => {
//         event.preventDefault();
//         uploadFiles(event.dataTransfer.files); // Dispatch the action to upload files
//     };

//     const handleFileInputChange = (event) => {
//         uploadFiles(event.target.files); // Dispatch the action to upload files
//     };

//     return (
//         <>
//             <AdminNavbar />
//             <div id='uploadContent'>
//                 <h5 style={{ marginTop: "-40%", marginLeft: "25%" }}>Upload Question from device </h5>
//                 <div id='dropzone'
//                     onDragOver={handleDragOver}
//                     onDrop={handleDrop}
//                 >
//                     <FaCloudUploadAlt style={{ fontSize: "50px", marginTop: "-3%" }} />
//                     <h5>Drag and Drop Files to Upload</h5>
//                     <h5>Or</h5>
//                     <input type='file' multiple onChange={handleFileInputChange} hidden ref={inputRef} />
//                     <button onClick={() => { inputRef.current.click() }}>Browse Files</button>
//                 </div>
//                 <div style={{ marginLeft: "25%", marginTop: "2%" }}>
//                     <h5>Supported File formats : .xlsx</h5>
//                     <br />
//                     {files.length > 0 && // Check if files array is not empty
//                         <div>
//                             <h6>Selected File</h6>
//                             {files.map((file, idx) => <p key={idx}>{file.name}</p>)}
//                         </div>
//                     }
//                 </div>
//                 <div className="position-absolute start-50 translate-middle">
//                     <button
//                         className="btn btn-secondary mt-3"
//                         type="submit"
//                     >
//                         Upload
//                     </button>
//                 </div>
//             </div>
//         </>
//     )
// };

// const mapStateToProps = (state) => {
//     return {
//         files: state.files // Map the files state from Redux store to component props
//     };
// };

// export default connect(mapStateToProps, { uploadFiles })(UploadBulkQuiz); // Connect component to Redux store and map action creator































// import React, { useRef } from 'react';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { connect } from 'react-redux';
// import { uploadFiles } from '../actions/uploadActions';
// import { Link } from 'react-router-dom';
// import '../App.css';
// import AdminNavbar from '../components/AdminNavbar';

// const UploadBulkQuiz = ({ files, uploadFiles }) => {
//   const inputref = useRef();

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     uploadFiles(event.dataTransfer.files);
//   };

//   const handleFileChange = (event) => {
//     uploadFiles(event.target.files);
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div id='uploadContent'>
//         <h5 style={{ marginTop: "-40%", marginLeft: "25%" }}>Upload Question from device </h5>
//         <div id='dropzone'
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         >
//           <FaCloudUploadAlt style={{ fontSize: "50px", marginTop: "-3%" }} />
//           <h5>Drag and Drop Files to Upload</h5>
//           <h5>Or</h5>
//           <input type='file' multiple onChange={handleFileChange} hidden ref={inputref} />
//           <button onClick={(e) => { e.preventDefault(); inputref.current.click() }}>Browse Files</button>
//         </div>
//         <div style={{ marginLeft: "25%", marginTop: "2%" }}>
//           <h5>Supported File formats : .xlsx</h5>
//           <br />
//           {files ?
//             <>
//               <div >
//                 <h6>Selected File </h6>
//                 {Array.from(files).map((file, idx) => <p key={idx}>{file.name}</p>)}
//               </div>
//               </> :
//             <>
//             </>
//           }
//         </div>
//         <br />
//         <div class="position-absolute start-50 translate-middle">
//           <button
//             className="btn btn-secondary mt-3 "
//             type="submit"
//           >
//             Upload
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     files: state.uploadReducer.files || []
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     uploadFiles: (files) => dispatch(uploadFiles(files))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UploadBulkQuiz);
