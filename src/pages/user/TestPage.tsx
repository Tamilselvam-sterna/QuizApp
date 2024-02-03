import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Radio } from "@mantine/core";
import { Button } from "../../components/Button";
import { apiProvider } from "../../network/apiProvider";

interface QuestionResponse {
  questionId: string; // Adjust type as needed
  optionId: string; // Adjust type as needed
}

function TestPage() {
  // Assuming setQuestionResponse  is declared with useState
  const [QuestionResponse, setQuestionResponse] = useState<QuestionResponse[]>(
    [],
  );
  const authUser = useContext(AuthContext);
  const navigate = useNavigate();
  const data = authUser?.getTestData();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const subjectId = data?.subjectId;
  const currentQuestion = data?.questionsWithOptions[currentQuestionIndex];
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30); // Initial time for each question

  useEffect(() => {
    // Reset the timer and go to the next question when the time is up
    if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft]);

  useEffect(() => {
    // Reset timer when question changes
    setTimeLeft(30); // Reset time for each question
  }, [currentQuestion]);

  useEffect(() => {
    // Start the countdown timer when a question is rendered
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up timer on unmount or when question changes
    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleOptionSelect = (optionId: any) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = () => {
    // Check if an option is selected and there's still time left
    if (selectedOption !== null && timeLeft !== 0) {
      // Update user responses
      setQuestionResponse((prevResponses) => [
        ...prevResponses,
        { questionId: currentQuestion.id, optionId: selectedOption },
      ]);
      // Reset selected option and move to the next question
      setSelectedOption(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else if (timeLeft === 0) {
      // Time's up, but we don't want to include the user's response
      // Proceed to the next question without updating responses
      setSelectedOption(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSubmitTest = async () => {
    const response = {
      subjectId: subjectId,
      answers: QuestionResponse,
    };

    let result = apiProvider.submitTest(response);
    if (result != null) {
      navigate("/user/finalPage");
    }

    setCurrentQuestionIndex(0);
    setQuestionResponse([]);
  };

  const handleButtonClick = () => {
    if (currentQuestionIndex === data.questionsWithOptions.length - 1) {
      handleSubmitTest();
    } else {
      handleNextQuestion();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="z-10 mb-32 flex w-full justify-center">
        <div
          aria-hidden="true"
          className="flex h-[500px] w-6/12 flex-col items-center rounded-xl bg-white"
        >
          <div className="mt-3 text-center">Time Left: {timeLeft} seconds</div>
          {currentQuestion && (
            <>
              <h1 className="mt-5 flex w-full justify-start pl-9 text-xl font-medium">{`${currentQuestionIndex + 1}. ${currentQuestion.question}`}</h1>

              <div className="relative right-80">
                {currentQuestion?.options?.map((option) => (
                  <div
                    key={option.id}
                    className="mt-3 flex w-full space-x-8 border-gray-950 p-4"
                  >
                    <Radio
                      name="options"
                      className="border-2-black mt-1"
                      variant="outline"
                      value={option.value}
                      checked={option.isCorrect}
                      onChange={() => handleOptionSelect(option.id)}
                    />
                    <label>{option.option}</label>
                  </div>
                ))}
              </div>
              <div className="mr-6 flex w-full justify-end">
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
