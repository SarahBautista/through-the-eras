import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Index from "./routes/Index";
import Eras from "./routes/Eras";
import SelectedEraPage from "./routes/SelectedEraPage";
import Comments from "./routes/Comments";
import Admin from "./routes/Admin";
import { fetchEras, fetchSelectedEra, fetchEraComments, fetchAllComments } from "./api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/eras",
        element: <Eras />,
        loader() {
          return fetchEras();
        },
      },
      {
        path: "/eras/:eraId",
        element: <SelectedEraPage />,
        loader({ params }) {
          return fetchSelectedEra(params.eraId);
        },
      },
      {
        path: "/comments/:eraId",
        element: <Comments />,
        loader({ params }) {
          return fetchEraComments(params.eraId);
        },
      },
      {
        path: "/admin",
        element: <Admin />,
        loader() {
          return fetchAllComments();
        }
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

reportWebVitals();
