import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFound from "./components/NotFound";

// Component to clear localStorage and redirect to /register
import { useEffect } from "react";

const RegisterAndLogOut: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate("/register", { replace: true });
  }, [navigate]);
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-logout",
    element: <RegisterAndLogOut />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
