/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Drawer, Radio, TextInput, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { apiProvider } from "../../../../network/apiProvider";
import { IconEditCircle } from "@tabler/icons-react";
import { viewQuestionsStore } from "../../../../app/viewQuestionStore";
import { useParams } from "react-router-dom";

function UpdateQuestion({ item }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { fetchData } = viewQuestionsStore();
  const { id } = useParams();

  const form = useForm({
    initialValues: {
      question: "",
    },

    validate: {
      question: (value) => (value.length > 5 ? null : "enter question"),
    },
  });
  const [options, setOptions] = useState([
    { value: "", isCorrect: false },
    { value: "", isCorrect: false },
    { value: "", isCorrect: false },
    { value: "", isCorrect: false },
  ]);

  const handleOptionChange = (index: number, event: any) => {
    const updatedOptions = [...options];
    updatedOptions[index].value = event.target.value;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.forEach((option, i) => (option.isCorrect = i === index));
    setOptions(updatedOptions);
  };

  const handleSubmit = async (event: any) => {
    const formattedOptions = options.map((option) => ({
      option: option.value,
      isCorrect: option.isCorrect,
    }));

    const formData = {
      questionId: item.id,
      options: formattedOptions,
      question: form.values.question,
    };

    try {
      const result = await apiProvider.updateQuestion(formData);
      if (result != null) {
        fetchData(id);
        close();
        form.reset();
        setOptions([
          { value: "", isCorrect: false },
          { value: "", isCorrect: false },
          { value: "", isCorrect: false },
          { value: "", isCorrect: false },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateQuestionData = () => {
    form.setFieldValue("question", item.question);

    const existingOptions = item.options.map((option, index) => ({
      value: option.option,
      isCorrect: option.isCorrect,
    }));

    setOptions(existingOptions);
  };

  useEffect(() => {
    if (opened) {
      updateQuestionData();
    }
  }, [opened]);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Edit Question"
        position="right"
        size={"md"}
        offset={16}
        radius="md"
      >
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="mt-10 flex flex-col space-y-9 align-middle"
        >
          <TextInput
            description="Question"
            placeholder="Enter Question"
            title="Enter Question"
            variant="filled"
            {...form.getInputProps("question")}
            withAsterisk
          />
          {options.map((option, index) => (
            <div key={index} className="flex space-x-4">
              <Radio
                className="mt-2"
                variant="outline"
                value={option.value}
                checked={option.isCorrect}
                onChange={() => handleCorrectAnswerChange(index)}
              />
              <TextInput
                required
                className="w-full"
                variant="filled"
                placeholder={`Enter Option ${index + 1}`}
                name={`option${index + 1}`}
                value={option.value}
                onChange={(e) => handleOptionChange(index, e)}
              />
            </div>
          ))}

          <Button type="submit" className="w-full bg-teal-700" color="teal">
            Update Question
          </Button>
        </form>
      </Drawer>
      <Tooltip label="EditQuestion">
        <Button onClick={open} color="teal" variant="outline">
          <IconEditCircle />
        </Button>
      </Tooltip>
    </>
  );
}

export default UpdateQuestion;
