import React from 'react';

const QuestionTemplate = ({ question }) => {
  if (!question || !question.options || !question.correctOptions) {
    return null; 
  }

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">Question {question.questionNumber}:</h5>
        <input value={question.question} className='form-control' readOnly/>
        <div className="form-group">
          <label htmlFor={`options_${question.id}`}>Options:</label>
          {question.options.map((option, index) => (
            <input
              key={index}
              type="text"
              className="form-control mt-2"
              id={`option_${index}`}
              placeholder={`Option ${index + 1}`}
              value={option.option} 
              readOnly
            />
          ))}
        </div>
        <div className="form-group">
          <label htmlFor={`correctAnswers_${question.id}`}>Correct Answers:</label>
          {question.correctOptions.map((answer, index) => (
            <input
              key={index}
              type="text"
              className="form-control mt-2"
              id={`correctAnswer_${index}`}
              placeholder={`Correct Answer ${index + 1}`}
              value={answer.option} 
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionTemplate;