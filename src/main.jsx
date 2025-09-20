import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./utils/css utils/utils.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoriesContextProvider from "./context/CategoriesContext.jsx";
import TasksContextProvider from "./context/TasksContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home/Home.jsx";
import SearchContextProvider from "./context/SearchContext.jsx";
import Layout from "./components/Layout/Layout.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

// react query setup
const queryClient = new QueryClient();

// routing setuo
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/:taskId",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <TasksContextProvider>
      <CategoriesContextProvider>
        <SearchContextProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            className="capitalize"
          />
        </SearchContextProvider>
      </CategoriesContextProvider>
    </TasksContextProvider>
  </QueryClientProvider>
);
