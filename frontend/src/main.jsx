import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./routes/Home";
import Meetings from "./routes/Meetings";
import MeetingDetail from "./routes/MeetingDetail";
import Transcript from "./routes/Transcript";
import Summaries from "./routes/Summaries";
import SummaryDetail from "./routes/SummaryDetail";
import ErrorPage from "./errors/error-page";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "meetings",
        element: <Meetings />,
        children: [
          {
            path: ":meetingId",
            element: <MeetingDetail />,
            children: [
              {
                path: "summaries",
                element: <Summaries />,
                children: [{ path: ":summaryId", element: <SummaryDetail /> }],
              },
              { path: "transcript", element: <Transcript /> },
            ],
          },
        ],
      },
      {
        path: "login",
        element: <h1>Login</h1>,
      },
      {
        path: "signup",
        element: <h1>Signup</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
