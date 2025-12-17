import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/appLayout/AppLayout";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/notFound/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "wells", element: <div>Wells</div> },
    ],
  },
]);
