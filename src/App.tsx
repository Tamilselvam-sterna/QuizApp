import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { MantineProvider } from "@mantine/core";
import { Outlet } from "react-router-dom";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <MantineProvider>
      <Notifications zIndex={1000} />
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </MantineProvider>
  );
}
