import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import apiClient from "../../../network/apiClient";
import { zodResolver } from "mantine-form-zod-resolver";
import { createCourseSchema } from "../../../models/create-course";
import { testStore } from "../../../app/courseStore";
import { IconPlus } from "@tabler/icons-react";

function AddSubject() {
  const [opened, { open, close }] = useDisclosure(false);
  const { fetchData } = testStore();
  const form = useForm({
    initialValues: {
      subjectName: "",
    },
    validate: zodResolver(createCourseSchema),
  });
  const handleSubmit = async (values: typeof form.values) => {
    try {
      const subjectData = {
        subject: values.subjectName,
      };
      const response = await apiClient.post("/test", subjectData);
      if (response != null) {
        close();
        form.reset();
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Add subject"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <>
            <div className="flex w-full flex-row justify-between">
              <TextInput
                label="Subject Name"
                placeholder="Subject Name"
                className="mb-1 mr-2 w-full"
                {...form.getInputProps("subjectName")}
              />
            </div>
            <div>
              <Button type="submit" mt="sm" color="teal" fullWidth>
                Submit
              </Button>
            </div>
          </>
        </form>
      </Modal>
      <Button
        onClick={open}
        variant="outline"
        color="teal"
        leftSection={<IconPlus />}
      >
        Add Subject
      </Button>
    </>
  );
}
export default AddSubject;
