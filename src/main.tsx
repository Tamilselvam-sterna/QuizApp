import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login.tsx";
import AdminLayout from "./components/AdminLayout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ReassignTest from "./pages/admin/test/ReassignTest.tsx";
import Results from "./pages/admin/results/Results.tsx";
import Courses from "./pages/admin/course/Courses.tsx";
import Users from "./pages/admin/user/Users.tsx";
import Dashboard from "./pages/admin/dashboard/Dashboard.tsx";
// import Users from './pages/admin/user/Users.tsx';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Login />} />
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="courses" element={<Courses />} />
        <Route path="results" element={<Results />} />
        <Route path="reassign" element={<ReassignTest />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
