import { createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
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
        <Toaster richColors closeButton />
      </RequireAuth>
    ),
    errorElement: <NotFoundPage />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);
