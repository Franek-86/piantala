import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Plant from "./pages/Plant";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AddPlant from "./pages/AddPlant";
import ProtectedRoute from "./components/ProtectedRoute";
import MyPlants from "./pages/MyPlants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/map",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/map/addPlant",
    element: (
      <ProtectedRoute>
        <AddPlant />
      </ProtectedRoute>
    ),
  },
  {
    path: "map/:plantId",
    element: (
      <ProtectedRoute>
        <Plant />
      </ProtectedRoute>
    ),
  },
  {
    path: "map/myPlants",
    element: (
      <ProtectedRoute>
        <MyPlants />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
