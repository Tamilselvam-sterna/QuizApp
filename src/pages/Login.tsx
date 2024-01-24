import { TextInput, PasswordInput } from "@mantine/core";
import { Button } from "../components/Button";
import { MdOutlineLockReset } from "react-icons/md";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LoginInput, loginScema } from "../models/auth";
import { apiProvider } from "../network/apiProvider";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { MdLogin } from "react-icons/md";
import { Variants, motion } from "framer-motion";

const loginVariant: Variants = {
  initial: {
    y: -300,
  },
  animate: {
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
    },
  },
};

function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const form = useForm<LoginInput>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginScema),
    validateInputOnChange: true,
  });

  async function onSubmit(val: typeof form.values) {
    const response = await apiProvider.login({
      email: val.email,
      password: val.password,
    });

    if (response?.status) {
      const data = response?.data;
      authContext?.login(data);
      console.log(response);

      navigate("/dashboard");
    }
  }

  return (
    <main className="background-pattern flex min-h-dvh min-w-full items-center justify-center">
      <motion.div
        variants={loginVariant}
        initial="initial"
        animate="animate"
        className="w-full space-y-2 rounded-md max-sm:px-4 md:w-1/2 xl:w-3/12"
      >
        <motion.div className="flex items-center justify-center gap-2 rounded-md bg-gray-500 px-2 py-6 text-2xl text-gray-100 shadow-lg">
          <MdOutlineLockReset className="rotate-12 text-4xl" />
          <h2 className="font-bold">Sterna-Quiz</h2>
        </motion.div>
        <motion.div
          variants={loginVariant}
          className="flex-1 space-y-2 rounded-lg bg-gray-50 px-8 pb-10 pt-10 shadow-md"
        >
          <h1 className="mb-3 text-xl font-medium text-gray-700">
            Please log in to continue...
          </h1>
          <div className="w-full">
            <form
              onSubmit={form.onSubmit(onSubmit)}
              className="space-y-3 text-gray-600"
            >
              <TextInput
                label="Email"
                withAsterisk
                radius="md"
                size="md"
                placeholder="jhondoe@gmail.com"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                radius="md"
                size="md"
                placeholder="********"
                {...form.getInputProps("password")}
              />
              <Button className="mt-4 w-full" type="submit">
                <div className="flex items-center justify-center gap-1">
                  <h4 className="text-base font-semibold">Login</h4>{" "}
                  <MdLogin className="h-5 w-5 text-gray-50" />
                </div>
              </Button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default Login;
