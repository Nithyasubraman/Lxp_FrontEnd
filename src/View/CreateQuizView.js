import CreateQuiz from "../components/QuizComponents/CreateQuiz";
import { Provider } from 'react-redux';
import store from "../Store/Store";
function CreateQuizView() {
  return (  
  <>
       <Provider store={store}>
       <CreateQuiz/>
        </Provider>
        </>
  );
}

export default CreateQuizView;