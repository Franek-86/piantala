import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PlantsProvider } from "./context/PlantsContext";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Plant from "./pages/Plant";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AddPlant from "./pages/AddPlant";
import ProtectedRoute from "./components/ProtectedRoute";
import MyPlants from "./pages/MyPlants";
import Legend from "./pages/Legend";
import Info from "./pages/Info";
import BottomBar from "./components/BottomBar";
import { CheckoutForm } from "./pages/CheckoutForm";
import { Return } from "./pages/Return";
import OwnedPlants from "./pages/OwnedPlants";
import Contacts from "./pages/Contacts";
import EmailVerification from "./pages/EmailVerification";

// Configurazione delle rotte
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
    children: [
      {
        path: "addPlant",
        element: <AddPlant />,
      },
      {
        path: ":plantId",
        element: <Plant />,
      },
    ],
  },
  {
    path: "myPlants",
    element: <MyPlants />,
  },
  {
    path: "legend",
    element: <Legend />,
  },
  {
    path: "info",
    element: <Info />,
  },
  {
    path: "checkout",
    element: <CheckoutForm />,
  },
  {
    path: "return",
    element: <Return />,
  },
  {
    path: "bookedPlants",
    element: <OwnedPlants />,
  },
  {
    path: "contacts",
    element: <Contacts />,
  },
  {
    path: "verification-success",
    element: <EmailVerification />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PlantsProvider>
        <RouterProvider router={router} />
      </PlantsProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
