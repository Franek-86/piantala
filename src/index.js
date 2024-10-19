import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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

const Layout = () => {
  return (
    <div>
      <Outlet /> {/* Renderizza il contenuto della pagina qui */}
      <BottomBar />
    </div>
  );
};

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
        <Layout /> {/* Utilizza Layout per le rotte protette */}
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "", // Questa può essere la tua pagina di default
        element: <App />, // Mostra l'App qui
      },
      {
        path: "addPlant",
        element: <AddPlant />,
      },
      {
        path: ":plantId",
        element: <Plant />,
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
    ],
  },
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/map",
//     element: (
//       <ProtectedRoute>
//         <App />
//       </ProtectedRoute>
//     ),
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/map/addPlant",
//     element: (
//       <ProtectedRoute>
//         <AddPlant />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "map/:plantId",
//     element: (
//       <ProtectedRoute>
//         <Plant />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "map/myPlants",
//     element: (
//       <ProtectedRoute>
//         <MyPlants />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "map/legend",
//     element: (
//       <ProtectedRoute>
//         <Legend />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "map/info",
//     element: (
//       <ProtectedRoute>
//         <Info />
//       </ProtectedRoute>
//     ),
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
