import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Plant from "./pages/Plant";

import "bootstrap/dist/css/bootstrap.min.css";
import AddPlant from "./pages/AddPlant";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/map",
    element: <App />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "map/:mapId",
    //     element: <Plant />,
    //   },
    // ],
  },
  {
    path: "/map/addPlant",
    element: <AddPlant />,
  },
  {
    path: "map/:plantId",
    element: <Plant />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
