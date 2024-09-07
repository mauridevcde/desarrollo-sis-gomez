import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar.jsx";
import ErrorPage from "./components/error/errorDeRuta.jsx";
import { Clientes } from "./components/clientes/clientes.jsx";
import { Productos } from "./components/productos/productos.jsx";
import { Login } from "./auth/login.jsx";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  { 
    path: "dashboard", 
    element: <Navbar />,
    children: [
      {
        path: "clientes",
        element: <Clientes />,
      },
      {
        path: "productos",
        element: <Productos />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* inicio de la app */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
