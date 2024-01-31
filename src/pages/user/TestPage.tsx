import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Radio } from "@mantine/core";
import { Button } from "../../components/Button";
import { apiProvider } from "../../network/apiProvider";

function TestPage() {
  const authUser = useContext(AuthContext);
  const navigate = useNavigate();
  const data = authUser?.getTestData();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const subjectId = data?.subjectId;

  const [userResponses, setUserResponses] = useState([]);
  const currentQuestion = data?.questionsWithOptions[currentQuestionIndex];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (optionId: any) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      setUserResponses((prevResponses) => [
        ...prevResponses,
        { questionId: currentQuestion.id, optionId: selectedOption },
      ]);
      setSelectedOption(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSubmitTest = async () => {
    const response = {
      subjectId: subjectId,
      answers: userResponses,
    };

    let result = apiProvider.submitTest(response);
    if (result != null) {
      navigate("/user/finalPage");
    }

    setCurrentQuestionIndex(0);
    setUserResponses([]);
  };

  const handleButtonClick = () => {
    if (currentQuestionIndex === data.questionsWithOptions.length - 1) {
      handleSubmitTest();
    } else {
      handleNextQuestion();
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="z-10 flex justify-center w-full mb-32">
        <div
          aria-hidden="true"
          className="flex h-[380px] w-6/12 flex-col items-center rounded-xl bg-white"
        >
          {currentQuestion && (
            <>
              <h1 className="flex justify-start w-full pl-6 mt-5 text-xl font-medium">{`${currentQuestionIndex + 1}. ${currentQuestion.question}`}</h1>

              <ul className="relative right-80">
                {currentQuestion?.options?.map((option: any) => (
                  <li key={option.id}>
                    <div className="flex w-full p-4 space-x-5 border-gray-950">
                      <Radio
                        name="options"
                        className="mt-2"
                        variant="outline"
                        value={option.value}
                        checked={option.isCorrect}
                        onChange={() => handleOptionSelect(option.id)}
                      />
                      <label>{option.option}</label>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end w-full mr-6">
                <Button onClick={handleButtonClick} className="w-40">
                  {currentQuestionIndex === data.questionsWithOptions.length - 1
                    ? "Submit Test"
                    : "Next Question"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default TestPage;
