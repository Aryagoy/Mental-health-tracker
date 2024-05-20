import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";
import { SignInPage } from "./pages/SignIn.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { LogNew } from "./pages/log/LogNew.tsx";
import { TrendCharts } from "./pages/TrendCharts.tsx";

// Configure Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "logs/new",
    element: <LogNew />,
  },
  {
    path: "trends",
    element: <TrendCharts />,
  }
]);



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

reportWebVitals();
