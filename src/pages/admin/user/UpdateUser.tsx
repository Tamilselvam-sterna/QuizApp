import { useDisclosure } from "@mantine/hooks";
import { Drawer, Select } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
// import { AddUserFormInput } from "./usermodal";
import { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import moment from "moment";
import { apiProvider } from "../../../network/apiProvider";
import { IconUserEdit } from "@tabler/icons-react";
import { userStore } from "../../../app/userStore";

// import UserSchema from "./usermodal";

function UpdateUser({ item }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [positionData, setPositionData] = useState();
  const form = useForm<any>({
    initialValues: {
      role: "",
      email: "",
      firstname: "",
      lastname: "",
      mobilenumber: "",
      position: "",
      specilization: "",
      college: "",
      date: "",
      experience: "",
      degree: "",
      experiencelevel: "",
    },

    // validate: zodResolver(UserSchema),
  });

  async function UpdateUser(values: typeof form.values) {
    let data;
    try {
      if (item.role.role === "User") {
        data = {
          userId: item.id,
          firstName: values.firstname,
          lastName: values.lastname,
          email: values.email,
          mobile: values.mobilenumber,
          roleId: item?.role?.role,
          dob: values.date,
          college: values.college,
          degree: values.degree,
          specialization: values.specilization,
          positionId: +values.position,
          isFresher: values.experienceLevel == "1" ? true : false,
          isExperience: values.experienceLevel == "2" ? true : false,
          experience: values.experienceLvel == "2" ? values.experience : null,
        };
      } else {
        data = {
          userId: item.id,
          firstName: values.firstname,
          lastName: values.lastname,
          email: values.email,
          mobile: values.mobilenumber,
          roleId: item?.role?.id,
        };
      }

      const result = await apiProvider.UpdateUsers(data);
      if (result != null) {
        form.reset();
        close();
        userStore.fetchAlluser();
      }
    } catch (e) {
      console.log(e);
    }
  }
  function editUserData() {
    form.setFieldValue("role", item.role.role);
    form.setFieldValue("firstname", item.firstName);
    form.setFieldValue("lastname", item.lastName);
    form.setFieldValue("mobilenumber", item.mobile);
    form.setFieldValue("email", item.email);
    form.setFieldValue("college", item.userInfo[0]?.college);
    form.setFieldValue("degree", item.userInfo[0]?.degree);
    form.setFieldValue("specilization", item.userInfo[0]?.specialization);
    form.setFieldValue(
      "experienceLevel",
      item?.userInfo[0]?.isFresher === true ? "1" : "2"
    );

    form.setFieldValue("experience", item?.userInfo[0]?.experience);
    form.setFieldValue("position", item.userInfo[0]?.position?.id.toString());
  }

  useEffect(() => {
    editUserData();
  }, []);

  const fetchPosition = async () => {
    const response = await apiProvider.fetchAllPosition({
      page: 1,
      search: "",
    });
    if (response != null) {
      setPositionData(response.data);
    }
  };
  useEffect(() => {
    fetchPosition();
  }, []);

  useEffect(() => {
    fetchPosition();
  }, []);
  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        title="Edit User"
        position="right"
      >
        <form onSubmit={form.onSubmit(UpdateUser)}>
          <TextInput
            disabled
            label="Type of User"
            {...form.getInputProps("role")}
          />
          <div className="flex flex-row justify-between">
            <TextInput
              label="First Name"
              placeholder="Enter Your FirstName"
              className="w-64"
              {...form.getInputProps("firstname")}
            />
            <TextInput
              label="Last Name"
              className="w-64"
              placeholder="Enter Your LastName"
              {...form.getInputProps("lastname")}
            />
          </div>

          <TextInput
            mt="sm"
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps("email")}
          />
          <TextInput
            mt="sm"
            label="Mobile Number"
            placeholder="Enter your Mobile Number"
            {...form.getInputProps("mobilenumber")}
          />
          {item.role.role == "User" ? (
            <>
              <Select
                label="Position Applied For"
                placeholder="Select Position"
                data={positionData?.data?.map((value) => ({
                  label: value?.position,
                  value: value?.id.toString(),
                }))}
                {...form.getInputProps("position")}
              />

              <TextInput
                label="College"
                placeholder="Enter College"
                {...form.getInputProps("college")}
              />
              <TextInput
                label="Degree"
                placeholder="Enter Your Degree"
                {...form.getInputProps("degree")}
              />
              <TextInput
                label="Specilization"
                placeholder="Enter Your specilization"
                {...form.getInputProps("specilization")}
              />

              <Select
                label="Experience Level"
                placeholder="Select your experience"
                data={[
                  { value: "1", label: "Fresher" },
                  { value: "2", label: "Experience" },
                ]}
                {...form.getInputProps("experienceLevel")}
              />
              {form.values.experienceLevel === "2" ? (
                <TextInput
                  label="Years of Experience"
                  placeholder="Enter Your Years of experience"
                  {...form.getInputProps("experience")}
                />
              ) : (
                <></>
              )}
              <DateInput
                valueFormat="YYYY MMM DD"
                label="Date of Birth"
                placeholder="enter your date of birth"
                {...form.getInputProps("date")}
              />
            </>
          ) : (
            <></>
          )}

          <Button type="submit" mt="sm" fullWidth>
            Submit
          </Button>
        </form>
      </Drawer>

      <Button color="teal" leftSection={<IconUserEdit />} onClick={open}>
        Edit User
      </Button>
    </>
  );
}

export default UpdateUser;
