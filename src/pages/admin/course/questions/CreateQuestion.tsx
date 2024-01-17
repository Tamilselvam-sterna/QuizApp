/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Drawer, Radio, TextInput } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { apiProvider } from "../../../../network/apiProvider";

function CreateQuestion({ value }) {
  const [opened, { open, close }] = useDisclosure(false);

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
      subjectId: value.id,
      question: form.values.question,
      options: formattedOptions,
    };

    // Now you can use formData for your API submission or further processing
    try {
      const result = await apiProvider.createQuestion(formData);
      if (result != null) {
        console.log("added");
      }
    } catch (e) {
      console.log(e);
    }
  };
  <form
    onSubmit={form.onSubmit(handleSubmit)}
    className="flex flex-col mt-10 align-middle space-y-9"
  >
    <TextInput
      description="Question"
      placeholder="Enter Question"
      title="Enter Question"
      variant="filled"
      {...form.getInputProps("question")}
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
          className="w-full"
          variant="filled"
          placeholder={`Enter Option ${index + 1}`}
          name={`option${index + 1}`}
          value={option.value}
          onChange={(e) => handleOptionChange(index, e)}
        />
      </div>
    ))}

    <Button type="submit" className="w-full bg-teal-700">
      Add Question
    </Button>
  </form>;
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Add Questions"
        position="right"
        size={"md"}
      >
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col mt-10 align-middle space-y-9"
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
            Add Question
          </Button>
        </form>
      </Drawer>
      <Button onClick={open}>Add Questions</Button>
    </>
  );
}

export default CreateQuestion;
