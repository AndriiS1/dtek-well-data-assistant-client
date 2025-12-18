import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ClerkThemeProvider } from "./components/customClerkProvider";
import "./index.css";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkThemeProvider>
      <RouterProvider router={router} />
    </ClerkThemeProvider>
  </React.StrictMode>
);
