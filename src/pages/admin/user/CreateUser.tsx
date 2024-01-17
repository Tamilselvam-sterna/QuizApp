/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import "@mantine/dates/styles.css";
import { DateInput } from "@mantine/dates";
import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/Button.css";
import { useEffect, useState } from "react";
import { apiProvider } from "../../../network/apiProvider";
import { Role } from "../../../utils/enum";
import { userStore } from "../../../app/userStore";

function CreateUser() {
  const [opened, { open, close }] = useDisclosure(false);
  const [position, setPosition] = useState();
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      date: "",
      degree: "",
      college: "",
      specialization: "",
      roleId: "",
      positionId: "",
      experience: "",
      experienceLevel: "",
    },
    // validate: zodResolver(createUserSchema),
  });
  const fetchPosition = async () => {
    const response = await apiProvider.fetchAllPosition({
      page: 1,
      search: "",
    });
    if (response != null) {
      setPosition(response.data);
    }
  };
  useEffect(() => {
    fetchPosition();
  }, []);
  const handleSubmit = async (values: typeof form.values) => {
    let userData;
    try {
      if (
        values.roleId === String(Role.SuperAdmin) ||
        values.roleId === String(Role.Admin)
      ) {
        userData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobile: values.mobileNumber,
          roleId: +values.roleId,
        };
      } else {
        userData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobile: values.mobileNumber,
          degree: values.degree,
          college: values.college,
          specialization: values.specialization,
          roleId: +values.roleId,
          dob: values.date,
          positionId: +values.positionId,
          isFresher: values.experience == "2" ? false : true,
          experience: values.experience,
          experienceLevel: +values.experienceLevel,
        };
      }

      const response = await apiProvider.addUserData(userData);
      if (response != null) {
        form.reset();
        close();
        userStore.fetchAlluser();
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
        title={<div className="text-xl font-bold">Create new User</div>}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <>
            <div className="flex flex-row justify-between w-full">
              <TextInput
                label="First Name"
                placeholder="Enter First Name"
                className="w-full mb-1 mr-2"
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Last Name"
                placeholder="Enter Last Name"
                className="w-full mb-1"
                {...form.getInputProps("lastName")}
              />
            </div>
            <TextInput
              mt="sm"
              label="Email"
              placeholder="Enter Email"
              className="w-full mb-1"
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Mobile number"
              placeholder=" Enter Mobile"
              className="w-full mb-1"
              {...form.getInputProps("mobileNumber")}
            />
            <Select
              label="Role"
              placeholder="Select Role"
              data={[
                { value: "1", label: "Super Admin" },
                { value: "2", label: "Admin" },
                { value: "3", label: "User" },
              ]}
              className="w-full mb-1"
              {...form.getInputProps("roleId")}
            />
            {form.values.roleId == String(Role.User) ? (
              <>
                <DateInput
                  valueFormat="YYYY MMM DD"
                  label="DOB"
                  placeholder="Select Date of birth"
                  {...form.getInputProps("date")}
                />
                <TextInput
                  label="College"
                  placeholder="Enter college Name"
                  {...form.getInputProps("college")}
                />
                <TextInput
                  label="Degree"
                  placeholder="Enter Degree"
                  {...form.getInputProps("degree")}
                />
                <Select
                  label="Position"
                  placeholder="select position"
                  data={position.data.map((item) => ({
                    value: String(item.id),
                    label: item.position,
                  }))}
                  {...form.getInputProps("positionId")}
                />

                <TextInput
                  label="Specialization"
                  placeholder="Enter Specialization"
                  {...form.getInputProps("specialization")}
                />
                <Select
                  label="Work Experience"
                  data={[
                    { value: "1", label: "Fresher" },
                    { value: "2", label: "experience" },
                  ]}
                  className="w-full mb-1"
                  {...form.getInputProps("experience")}
                />
                {form.values.experience == "2" ? (
                  <>
                    <TextInput
                      label="Experience Level"
                      placeholder="Enter Years of experience"
                      className="w-full mr-4"
                      {...form.getInputProps("experienceLevel")}
                    />
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            <Button type="submit" mt="sm">
              Submit
            </Button>
          </>
        </form>
      </Modal>

      <Button onClick={open} variant="filled" color="green">
        Add User
      </Button>
    </>
  );
}

export default CreateUser;
