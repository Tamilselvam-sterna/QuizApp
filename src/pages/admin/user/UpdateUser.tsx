import { useDisclosure } from "@mantine/hooks";
import { Drawer, Select, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { useEffect } from "react";
import { DateInput } from "@mantine/dates";
import moment from "moment";
import { apiProvider } from "../../../network/apiProvider";
import { IconUserEdit } from "@tabler/icons-react";
import { userStore } from "../../../app/userStore";
import { positionStore } from "../../../app/positionStore";

function UpdateUser({ item }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, fetchData: fetchPositionData } = positionStore();
  const { fetchData: fetchUserData } = userStore();

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
      dob: "",
      experience: "",
      degree: "",
      isexperience: "",
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
          dob: moment(values.date).format("YYYY-MM-DD"),
          college: values.college,
          degree: values.degree,
          specialization: values.specilization,
          positionId: +values.position,
          isFresher: values.isexperience == "1" ? true : false,
          isExperience: values.isexperience == "2" ? true : false,
          experience:
            values.isexperience == "1" ? undefined : values.experience,
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
        fetchUserData();

        close();
      }
    } catch (e) {
      console.log(e);
    }
  }
  function editUserData() {
    console.log(item);
    form.setFieldValue("role", item.role.role);
    form.setFieldValue("firstname", item.firstName);
    form.setFieldValue("lastname", item.lastName);
    form.setFieldValue("mobilenumber", item.mobile);
    form.setFieldValue("email", item.email);
    form.setFieldValue("college", item.userInfo[0]?.college);
    form.setFieldValue("degree", item.userInfo[0]?.degree);
    form.setFieldValue("specilization", item.userInfo[0]?.specialization);
    form.setFieldValue(
      "isexperience",
      item?.userInfo[0]?.isFresher === true ? "1" : "2",
    );
    form.setFieldValue("dob", new Date(item.userInfo[0]?.dob));

    form.setFieldValue("experience", item?.userInfo[0]?.experience);
    form.setFieldValue("position", item.userInfo[0]?.position?.id.toString());
  }

  useEffect(() => {
    if (opened) {
      editUserData();
      fetchPositionData();
    }
  }, [opened, fetchUserData]);

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
            placeholder="Enter Your Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            mt="sm"
            label="Mobile Number"
            placeholder="Enter Your Mobile Number"
            {...form.getInputProps("mobilenumber")}
          />
          {item.role.role == "User" ? (
            <>
              <Select
                label="Position"
                placeholder="Select Position"
                data={data?.data?.map((value) => ({
                  label: value?.position,
                  value: value?.id.toString(),
                }))}
                {...form.getInputProps("position")}
              />

              <TextInput
                label="College"
                placeholder="Enter College Name"
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
                  { value: "2", label: "Experienced" },
                ]}
                {...form.getInputProps("isexperience")}
              />
              {form.values.isexperience === "2" ? (
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
                {...form.getInputProps("dob")}
              />
            </>
          ) : (
            <></>
          )}

          <Button type="submit" color="teal" mt="sm" fullWidth>
            Submit
          </Button>
        </form>
      </Drawer>
      <Tooltip label="EditUser">
        <Button color="gray" onClick={open} variant="outline">
          <IconUserEdit />
        </Button>
      </Tooltip>
    </>
  );
}

export default UpdateUser;
