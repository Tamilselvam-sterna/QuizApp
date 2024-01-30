/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  TextInput,
  Select,
  Drawer,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "@mantine/dates/styles.css";
import { DateInput } from "@mantine/dates";
import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/Button.css";
import { useEffect, useState } from "react";
import { apiProvider } from "../../../network/apiProvider";
import { Role } from "../../../utils/enum";
import { userStore } from "../../../app/userStore";
import { positionStore } from "../../../app/positionStore";
import { roleStore } from "../../../app/roleStore";
import { IconPlus, IconUserPlus } from "@tabler/icons-react";
import moment from "moment";
import {
  CreateAdminUserInput,
  CreateUserInput,
  createuserSchema,
} from "../../../models/create-user";
import { zodResolver } from "mantine-form-zod-resolver";

function CreateUser() {
  const {
    data,
    fetchData: fetchPositionData,
    setPage: setpositionPage,
    reset,
  } = positionStore();
  const { data: datas, fetchData: fetchRoleData } = roleStore();
  const { fetchData: fetchUserData } = userStore();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<CreateUserInput>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      dob: new Date(),
      degree: "",
      college: "",
      specialization: "",
      roleId: Role.User || Role.Admin,
      positionId: "",
      experience: "",
      isexperience: "",
    },
    validate: zodResolver(createuserSchema),
    validateInputOnChange: true,
  });

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
          mobile: values.mobile,
          roleId: +values.roleId,
        };
      } else {
        userData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobile: values.mobile,
          degree: values.degree,
          college: values.college,
          specialization: values.specialization,
          roleId: +values.roleId,
          dob: moment(values.dob).format("YYYY-MM-DD"),
          positionId: Number(values.positionId),
          isFresher: values.isexperience == "2" ? false : true,
          isExperience: values.isexperience == "2" ? true : false,
          experience:
            values.isexperience == "2" ? values.experience : undefined,
        };
      }

      const response = await apiProvider.addUserData(userData);
      if (response != null) {
        form.reset();
        close();
        fetchUserData();
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (opened) {
      setpositionPage(0);
      fetchPositionData();
      fetchRoleData();
    }
  }, [opened, fetchUserData]);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Add User"
        position="right"
        size={"md"}
        offset={16}
        radius="md"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <>
            <Select
              label="Role"
              placeholder="Select Role"
              data={datas?.data.map((item) => ({
                value: item.id.toString(),
                label: item.role,
              }))}
              className="mb-1 w-full"
              {...form.getInputProps("roleId")}
            />

            <div className="flex w-full flex-row justify-between">
              <TextInput
                label="First Name"
                placeholder="Enter First Name"
                className="mb-1 mr-2 w-full"
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Last Name"
                placeholder="Enter Last Name"
                className="mb-1 w-full"
                {...form.getInputProps("lastName")}
              />
            </div>
            <TextInput
              mt="sm"
              label="Email"
              placeholder="Enter Email"
              className="mb-1 w-full"
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              className="mb-1 w-full"
              {...form.getInputProps("mobile")}
            />

            {form.values.roleId == "3" ? (
              <>
                <DateInput
                  valueFormat="YYYY MMM DD"
                  label="Date of Birth"
                  placeholder="Select Date of Birth"
                  {...form.getInputProps("dob")}
                />
                <TextInput
                  label="College"
                  placeholder="Enter College Name"
                  {...form.getInputProps("college")}
                />
                <TextInput
                  label="Degree"
                  placeholder="Enter Degree"
                  {...form.getInputProps("degree")}
                />
                <TextInput
                  label="Specialization"
                  placeholder="Enter Specialization"
                  {...form.getInputProps("specialization")}
                />
                <Select
                  label="Position"
                  placeholder="Select Position"
                  data={data.data.map((item) => ({
                    value: String(item.id),
                    label: item.position,
                  }))}
                  {...form.getInputProps("positionId")}
                />

                <Select
                  label="Work Experience"
                  placeholder="Select Work Experience"
                  data={[
                    { value: "1", label: "Fresher" },
                    { value: "2", label: "Experienced" },
                  ]}
                  className="mb-1 w-full"
                  {...form.getInputProps("isexperience")}
                />
                {form.values.isexperience == "2" ? (
                  <>
                    <TextInput
                      value={"1"}
                      label="Years Of Experience"
                      placeholder="Enter Years of Experience"
                      className="mr-4 w-full"
                      {...form.getInputProps("experience")}
                    />
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            <Button type="submit" color="teal" mt="sm" fullWidth>
              Add User
            </Button>
          </>
        </form>
      </Drawer>

      <Tooltip label="Add User">
        <Button onClick={open} color="teal" variant="outline">
          <IconUserPlus color="teal" />
        </Button>
      </Tooltip>
    </>
  );
}

export default CreateUser;
