import { createBrowserRouter } from "react-router-dom";
import { RequireAuth } from "./components/requireAuth";
import AppLayout from "./layouts/appLayout/AppLayout";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/notFound/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    errorElement: <NotFoundPage />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);
