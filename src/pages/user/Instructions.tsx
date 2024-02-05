import { Checkbox } from "@mantine/core";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiProvider } from "../../network/apiProvider";
import { AuthContext } from "../../context/AuthContext";

const InstructionPage = () => {
  const [checked, setChecked] = useState(false);
  const authUser = useContext(AuthContext);
  const questionCount = localStorage.getItem("questionCount");
  const position = localStorage.getItem("position");

  const navigate = useNavigate();

  async function fetchAllTest() {
    const result = await apiProvider.fetchAllTest({ page: 1, search: "" });
    if (result != null) {
      authUser?.testData(result?.data);
      navigate("/user/test");
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <main className="flex min-w-60 flex-col items-center space-y-8 rounded-lg bg-white  p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Welcome to the Quiz!</h2>
        <p className="font-bold text-gray-700">
          Before you start, please read the instructions carefully:
        </p>

        <ol className=" flex flex-col space-y-5 pl-6 text-gray-700">
          <li>
            1.You have been assigned for an mcq test.The question will be from
            <span className="text-green-600"> {position}</span> position.
          </li>
          <li>
            2.The test will consist of{" "}
            <span className="text-green-600"> {questionCount}</span> Questions.
          </li>
          <li>
            3.Each question will carry{" "}
            <span className="text-green-600"> 1</span> mark for each.
          </li>
          <li>
            4.Incase if you <span className="text-red-500">Refresh</span> the
            browser window, your test will be submitted and no marks will be
            provided
          </li>
          <li>5.There will be no negative marks for wrong answers.</li>
          <li>
            6.You will have an time period of{" "}
            <span className="text-red-600">30</span> seconds for a question.
          </li>
          <li>
            7.If you don't answer for a question in the alloted time ,no marks
            will be given for that question.
          </li>
          <li>
            8.You won't be allowed to switch to the previous question once the
            alloted time for a question is over.
          </li>
          <li>
            9.If you answered the question before the alloted time you can
            navigate to the next question by pressing the next question button
            that is provided just below the question tab.
          </li>
          <li>
            10.The test will be auto submitted even you don't submit it under
            the given time.
          </li>
        </ol>
        <Checkbox
          size="md"
          variant="filled"
          label={
            <div className="font-bold text-blue-500">
              I accept the instructions
            </div>
          }
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        {checked && (
          <button
            onClick={fetchAllTest}
            className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 "
          >
            Start Quiz
          </button>
        )}
      </main>
    </div>
  );
};

export default InstructionPage;
