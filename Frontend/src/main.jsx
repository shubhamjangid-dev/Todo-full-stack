import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GroupBoard from "./PageComponents/GroupBoard.jsx";
import ProjectBoard from "./PageComponents/ProjectBoard.jsx";
import AddTodo from "./PageComponents/Todo/AddTodo.jsx";
import Logo from "./Pages/Logo.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/team/:groupId",
            element: <GroupBoard />,
          },
          {
            path: "/project/:projectId",
            element: <ProjectBoard />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/logo",
        element: <Logo />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
