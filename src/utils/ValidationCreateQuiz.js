export const isFormValid = (nameofquiz, duration, passMark) => {
    return nameofquiz !== '' && duration !== '' && passMark !== '';
};

export const handleQuizTitleChange = (value, setError, setQuizTitle) => {
    if (/^\d+$/.test(value)) {
        setError('*Please enter only text ');
    } else {
        setError('');
        setQuizTitle(value);
    }
};
















// export const isFormValid = (quiz) => {
//     return quiz.quizTitle !== '' && quiz.duration !== '' && quiz.grade !== '';
// };


// export const handleQuizTitleChange = (value, setQuiz) => {
//     if (/^\d+$/.test(value)) {
//         setQuiz(prevState => ({
//             ...prevState,
//             quizTitle: '',
//             error: '*Please enter only text'
//         }));
//     } else {
//         setQuiz(prevState => ({
//             ...prevState,
//             quizTitle: value,
//             error: ''
//         }));
//     }
// };


