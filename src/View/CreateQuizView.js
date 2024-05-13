import CreateQuiz from "../components/QuizComponents/CreateQuiz";
import { Provider } from 'react-redux';
import store from "../Store/Store";
import '../Styles/CreateQuiz.css'
function CreateQuizView() {
  return (
    <>
      <Provider store={store}>
        <CreateQuiz />
      </Provider>
    </>
  );
}

export default CreateQuizView;