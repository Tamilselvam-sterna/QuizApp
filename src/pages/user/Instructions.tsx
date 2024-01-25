import { Checkbox } from "@mantine/core";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiProvider } from "../../network/apiProvider";
import { AuthContext } from "../../context/AuthContext";

const InstructionPage = () => {
  const [checked, setChecked] = useState(false);
  const authUser = useContext(AuthContext);

  const navigate = useNavigate();

  async function fetchAllTest() {
    const result = await apiProvider.fetchAllTest({ page: 1, search: "" });
    if (result != null) {
      authUser?.testData(result?.data);
      navigate("/user/test");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="flex max-w-md flex-col items-center space-y-8 rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Welcome to the Quiz!</h2>
        <p className="text-gray-700">
          Before you start, please read the instructions carefully:
        </p>

        <ul className="list-disc pl-6 text-gray-700">
          <li>This quiz consists of multiple-choice questions.</li>
          <li>Choose the correct answer for each question.</li>
          <li>
            You can navigate between questions using the navigation buttons.
          </li>
          <li>Make sure to submit your answers before the timer runs out.</li>
        </ul>
        <Checkbox
          variant="outline"
          label=" I accept the instructions"
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
