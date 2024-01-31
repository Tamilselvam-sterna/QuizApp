import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiProvider } from "../../network/apiProvider";
import { useNavigate } from "react-router-dom";

function TestPage() {
  const authUser = useContext(AuthContext);
  const navigate = useNavigate();
  const data = authUser?.getTestData();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const subjectId = data?.subjectId;

  const [userResponses, setUserResponses] = useState([]);
  const currentQuestion = data?.questionsWithOptions[currentQuestionIndex];

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleOptionSelect = (optionId: any) => {
    setUserResponses((prevResponses) => [
      ...prevResponses,
      { questionId: currentQuestion.id, optionId },
    ]);
  };

  const handleSubmitTest = async () => {
    const response = {
      subjectId: subjectId,
      answers: userResponses,
    };
    const result = await apiProvider.submitTest(response);
    if (result != null) {
      console.log("completed");
      navigate("/user/finalPage");
    }

    // Reset the component state or redirect the user, etc.
    setCurrentQuestionIndex(0);
    setUserResponses([]);
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="z-10 mb-32 flex w-full justify-center">
        <div
          aria-hidden="true"
          className="flex h-[300px] w-6/12 flex-col items-center rounded-r-xl bg-white   "
        >
          <h3>Test page</h3>
          {currentQuestion && (
            <>
              <h1>{currentQuestion.question}</h1>
              <ul>
                {currentQuestion?.options?.map((option) => (
                  <li key={option.id}>
                    <label>
                      <input
                        type="radio"
                        name="options"
                        value={option.id}
                        onChange={() => handleOptionSelect(option.id)}
                      />
                      {option.option}
                    </label>
                  </li>
                ))}
              </ul>
              <button onClick={handleNextQuestion}>
                {currentQuestionIndex === data.questionsWithOptions.length - 1
                  ? "Submit Test"
                  : "Next Question"}
              </button>
            </>
          )}
          {!currentQuestion && (
            <div>
              <p>No more questions</p>
              {userResponses.length > 0 && (
                <button onClick={handleSubmitTest}>Submit Test</button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default TestPage;
