import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import apiClient from "../../../network/apiClient";

function AddSubject() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      subjectName: "",
    },
    // validate: zodResolver(createCourseSchema),
  });
  const handleSubmit = async (values: typeof form.values) => {
    try {
      const subjectData = {
        subject: values.subjectName,
      };
      const response = await apiClient.post("/test", subjectData);
      if (response != null) {
        console.log("success");
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
            <div className="flex flex-row justify-between w-full">
              <TextInput
                label="Subject Name"
                placeholder="Subject Name"
                className="w-full mb-1 mr-2"
                {...form.getInputProps("subjectName")}
              />
            </div>
            <div>
              <Button type="submit" mt="sm">
                Submit
              </Button>
            </div>
          </>
        </form>
      </Modal>
      <Button onClick={open} variant="outline" color="green">
        Add Subject
      </Button>
    </>
  );
}
export default AddSubject;
